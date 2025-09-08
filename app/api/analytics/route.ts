import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { getAuthUser, createErrorResponse, createSuccessResponse } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user || user.role !== 'ADMIN') {
      return createErrorResponse('Unauthorized', 401)
    }

    const { searchParams } = new URL(request.url)
    const timeframe = searchParams.get('timeframe') || '30' // days
    const days = parseInt(timeframe)
    
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    // Parallel queries for better performance
    const [
      totalUsers,
      totalRooms,
      activeBookings,
      pendingPayments,
      revenueData,
      occupancyData,
      userGrowth,
      paymentTrends,
      roomUtilization,
      overduePayments
    ] = await Promise.all([
      // Total Users
      prisma.user.count({
        where: { role: 'STUDENT' }
      }),

      // Total Rooms
      prisma.room.count(),

      // Active Bookings
      prisma.booking.count({
        where: { status: 'ACTIVE' }
      }),

      // Pending Payments
      prisma.payment.count({
        where: { status: 'PENDING' }
      }),

      // Revenue Data (last 30 days)
      prisma.payment.aggregate({
        where: {
          status: 'PAID',
          paidDate: { gte: startDate }
        },
        _sum: { amount: true },
        _count: true
      }),

      // Occupancy Data
      prisma.room.aggregate({
        _avg: { currentOccupancy: true },
        _sum: { 
          capacity: true,
          currentOccupancy: true 
        }
      }),

      // User Growth (monthly)
      prisma.$queryRaw`
        SELECT 
          DATE_FORMAT(createdAt, '%Y-%m') as month,
          COUNT(*) as count,
          role
        FROM users 
        WHERE createdAt >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
        GROUP BY DATE_FORMAT(createdAt, '%Y-%m'), role
        ORDER BY month DESC
      `,

      // Payment Trends (weekly)
      prisma.$queryRaw`
        SELECT 
          DATE_FORMAT(paidDate, '%Y-%m-%d') as date,
          SUM(amount) as revenue,
          COUNT(*) as transactions
        FROM payments 
        WHERE status = 'PAID' 
        AND paidDate >= DATE_SUB(NOW(), INTERVAL ${days} DAY)
        GROUP BY DATE_FORMAT(paidDate, '%Y-%m-%d')
        ORDER BY date DESC
      `,

      // Room Utilization by Type
      prisma.room.groupBy({
        by: ['type', 'status'],
        _count: true,
        _avg: { currentOccupancy: true }
      }),

      // Overdue Payments
      prisma.payment.findMany({
        where: {
          status: 'PENDING',
          dueDate: { lt: new Date() }
        },
        include: {
          user: {
            select: { id: true, name: true, email: true, studentId: true }
          },
          booking: {
            select: { 
              id: true,
              room: { select: { roomNumber: true, block: true } }
            }
          }
        },
        orderBy: { dueDate: 'asc' },
        take: 10
      })
    ])

    // Calculate occupancy rate
    const occupancyRate = occupancyData._sum.capacity ? 
      (occupancyData._sum.currentOccupancy / occupancyData._sum.capacity) * 100 : 0

    // Calculate revenue growth
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    
    const currentMonthRevenue = await prisma.payment.aggregate({
      where: {
        status: 'PAID',
        paidDate: {
          gte: new Date(currentYear, currentMonth, 1),
          lt: new Date(currentYear, currentMonth + 1, 1)
        }
      },
      _sum: { amount: true }
    })

    const lastMonthRevenue = await prisma.payment.aggregate({
      where: {
        status: 'PAID',
        paidDate: {
          gte: new Date(currentYear, currentMonth - 1, 1),
          lt: new Date(currentYear, currentMonth, 1)
        }
      },
      _sum: { amount: true }
    })

    const revenueGrowth = lastMonthRevenue._sum.amount ? 
      ((currentMonthRevenue._sum.amount || 0) - (lastMonthRevenue._sum.amount || 0)) / 
      (lastMonthRevenue._sum.amount || 1) * 100 : 0

    // Room status breakdown
    const roomStatusBreakdown = await prisma.room.groupBy({
      by: ['status'],
      _count: true
    })

    // Recent activities
    const recentActivities = await prisma.$queryRaw`
      (SELECT 'booking' as type, id, createdAt, 
              JSON_OBJECT('user', JSON_OBJECT('name', u.name), 'room', JSON_OBJECT('roomNumber', r.roomNumber)) as data
       FROM bookings b 
       JOIN users u ON b.userId = u.id 
       JOIN rooms r ON b.roomId = r.id 
       WHERE b.createdAt >= DATE_SUB(NOW(), INTERVAL 7 DAY)
       ORDER BY b.createdAt DESC LIMIT 5)
      UNION ALL
      (SELECT 'payment' as type, id, paidDate as createdAt,
              JSON_OBJECT('user', JSON_OBJECT('name', u.name), 'amount', p.amount) as data
       FROM payments p 
       JOIN users u ON p.userId = u.id 
       WHERE p.status = 'PAID' AND p.paidDate >= DATE_SUB(NOW(), INTERVAL 7 DAY)
       ORDER BY p.paidDate DESC LIMIT 5)
      ORDER BY createdAt DESC LIMIT 10
    `

    const analytics = {
      overview: {
        totalUsers,
        totalRooms,
        activeBookings,
        pendingPayments,
        occupancyRate: Math.round(occupancyRate * 100) / 100,
        totalRevenue: revenueData._sum.amount || 0,
        revenueGrowth: Math.round(revenueGrowth * 100) / 100
      },
      charts: {
        userGrowth,
        paymentTrends,
        roomUtilization,
        roomStatusBreakdown
      },
      alerts: {
        overduePayments: overduePayments.length,
        overdueDetails: overduePayments
      },
      recentActivities
    }

    return createSuccessResponse({ analytics })
  } catch (error) {
    console.error('Analytics error:', error)
    return createErrorResponse('Internal server error', 500)
  }
}
