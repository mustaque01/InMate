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
    const reportType = searchParams.get('type')
    const format = searchParams.get('format') || 'json' // json, csv
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    
    if (!reportType) {
      return createErrorResponse('Report type is required')
    }

    let reportData: any = {}
    const dateFilter = startDate && endDate ? {
      gte: new Date(startDate),
      lte: new Date(endDate)
    } : undefined

    switch (reportType) {
      case 'revenue':
        reportData = await generateRevenueReport(dateFilter)
        break
      
      case 'occupancy':
        reportData = await generateOccupancyReport(dateFilter)
        break
      
      case 'payments':
        reportData = await generatePaymentsReport(dateFilter)
        break
      
      case 'students':
        reportData = await generateStudentsReport()
        break
      
      case 'bookings':
        reportData = await generateBookingsReport(dateFilter)
        break
      
      case 'overdue':
        reportData = await generateOverdueReport()
        break
      
      default:
        return createErrorResponse('Invalid report type')
    }

    if (format === 'csv') {
      const csv = convertToCSV(reportData)
      return new Response(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="${reportType}_report_${new Date().toISOString().split('T')[0]}.csv"`
        }
      })
    }

    return createSuccessResponse({
      reportType,
      generatedAt: new Date().toISOString(),
      dateRange: { startDate, endDate },
      data: reportData
    })
  } catch (error) {
    console.error('Report generation error:', error)
    return createErrorResponse('Internal server error', 500)
  }
}

async function generateRevenueReport(dateFilter?: any) {
  const whereClause = {
    status: 'PAID',
    ...(dateFilter && { paidDate: dateFilter })
  }

  const [totalRevenue, paymentsByType, monthlyRevenue, paymentsByMethod] = await Promise.all([
    prisma.payment.aggregate({
      where: whereClause,
      _sum: { amount: true },
      _count: true,
      _avg: { amount: true }
    }),
    
    prisma.payment.groupBy({
      by: ['type'],
      where: whereClause,
      _sum: { amount: true },
      _count: true
    }),
    
    prisma.$queryRaw`
      SELECT 
        DATE_FORMAT(paidDate, '%Y-%m') as month,
        SUM(amount) as revenue,
        COUNT(*) as transactions
      FROM payments 
      WHERE status = 'PAID'
      ${dateFilter ? `AND paidDate >= '${dateFilter.gte.toISOString()}' AND paidDate <= '${dateFilter.lte.toISOString()}'` : ''}
      GROUP BY DATE_FORMAT(paidDate, '%Y-%m')
      ORDER BY month DESC
    `,
    
    prisma.payment.groupBy({
      by: ['method'],
      where: whereClause,
      _sum: { amount: true },
      _count: true
    })
  ])

  return {
    summary: totalRevenue,
    byType: paymentsByType,
    byMonth: monthlyRevenue,
    byMethod: paymentsByMethod
  }
}

async function generateOccupancyReport(dateFilter?: any) {
  const [roomStats, occupancyTrend, blockWiseOccupancy] = await Promise.all([
    prisma.room.aggregate({
      _sum: { capacity: true, currentOccupancy: true },
      _count: true,
      _avg: { currentOccupancy: true }
    }),
    
    prisma.room.groupBy({
      by: ['status'],
      _count: true
    }),
    
    prisma.room.groupBy({
      by: ['block'],
      _sum: { capacity: true, currentOccupancy: true },
      _count: true,
      _avg: { currentOccupancy: true }
    })
  ])

  const occupancyRate = roomStats._sum.capacity && roomStats._sum.currentOccupancy ? 
    (roomStats._sum.currentOccupancy / roomStats._sum.capacity) * 100 : 0

  return {
    overall: {
      ...roomStats,
      occupancyRate: Math.round(occupancyRate * 100) / 100
    },
    byStatus: occupancyTrend,
    byBlock: blockWiseOccupancy
  }
}

async function generatePaymentsReport(dateFilter?: any) {
  const whereClause = dateFilter ? { createdAt: dateFilter } : {}

  const [paymentStats, overduePayments, recentPayments] = await Promise.all([
    prisma.payment.groupBy({
      by: ['status'],
      where: whereClause,
      _count: true,
      _sum: { amount: true }
    }),
    
    prisma.payment.findMany({
      where: {
        status: 'PENDING',
        dueDate: { lt: new Date() }
      },
      include: {
        user: { select: { name: true, email: true, studentId: true } },
        booking: {
          include: {
            room: { select: { roomNumber: true, block: true } }
          }
        }
      }
    }),
    
    prisma.payment.findMany({
      where: {
        status: 'PAID',
        ...(dateFilter && { paidDate: dateFilter })
      },
      include: {
        user: { select: { name: true, email: true, studentId: true } }
      },
      orderBy: { paidDate: 'desc' },
      take: 20
    })
  ])

  return {
    statistics: paymentStats,
    overdue: overduePayments,
    recent: recentPayments
  }
}

async function generateStudentsReport() {
  const [studentStats, studentsByYear, studentsByBlock] = await Promise.all([
    prisma.user.aggregate({
      where: { role: 'STUDENT' },
      _count: true
    }),
    
    prisma.user.groupBy({
      by: ['year'],
      where: { role: 'STUDENT' },
      _count: true
    }),
    
    prisma.$queryRaw`
      SELECT 
        r.block,
        COUNT(u.id) as studentCount,
        GROUP_CONCAT(CONCAT(u.name, ' (', r.roomNumber, ')') SEPARATOR ', ') as students
      FROM users u
      JOIN bookings b ON u.id = b.userId
      JOIN rooms r ON b.roomId = r.id
      WHERE u.role = 'STUDENT' AND b.status = 'ACTIVE'
      GROUP BY r.block
      ORDER BY r.block
    `
  ])

  return {
    summary: studentStats,
    byYear: studentsByYear,
    byBlock: studentsByBlock
  }
}

async function generateBookingsReport(dateFilter?: any) {
  const whereClause = dateFilter ? { createdAt: dateFilter } : {}

  const [bookingStats, bookingTrend, recentBookings] = await Promise.all([
    prisma.booking.groupBy({
      by: ['status'],
      where: whereClause,
      _count: true
    }),
    
    prisma.$queryRaw`
      SELECT 
        DATE_FORMAT(createdAt, '%Y-%m') as month,
        COUNT(*) as bookings,
        status
      FROM bookings
      ${dateFilter ? `WHERE createdAt >= '${dateFilter.gte.toISOString()}' AND createdAt <= '${dateFilter.lte.toISOString()}'` : ''}
      GROUP BY DATE_FORMAT(createdAt, '%Y-%m'), status
      ORDER BY month DESC
    `,
    
    prisma.booking.findMany({
      where: whereClause,
      include: {
        user: { select: { name: true, email: true, studentId: true } },
        room: { select: { roomNumber: true, block: true, type: true } }
      },
      orderBy: { createdAt: 'desc' },
      take: 20
    })
  ])

  return {
    statistics: bookingStats,
    trend: bookingTrend,
    recent: recentBookings
  }
}

async function generateOverdueReport() {
  const overduePayments = await prisma.payment.findMany({
    where: {
      status: 'PENDING',
      dueDate: { lt: new Date() }
    },
    include: {
      user: { 
        select: { 
          name: true, 
          email: true, 
          studentId: true, 
          phone: true,
          guardianPhone: true 
        } 
      },
      booking: {
        include: {
          room: { select: { roomNumber: true, block: true } }
        }
      }
    },
    orderBy: { dueDate: 'asc' }
  })

  const summary = {
    totalOverdue: overduePayments.length,
    totalAmount: overduePayments.reduce((sum, payment) => sum + payment.amount, 0),
    oldestDue: overduePayments[0]?.dueDate,
    averageAmount: overduePayments.length > 0 ? 
      overduePayments.reduce((sum, payment) => sum + payment.amount, 0) / overduePayments.length : 0
  }

  return {
    summary,
    payments: overduePayments
  }
}

function convertToCSV(data: any): string {
  if (!data || typeof data !== 'object') {
    return 'No data available'
  }

  // Simple CSV conversion - in production, use a proper CSV library
  const flattenObject = (obj: any, prefix = ''): any => {
    const flattened: any = {}
    for (const key in obj) {
      if (obj[key] && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
        Object.assign(flattened, flattenObject(obj[key], `${prefix}${key}.`))
      } else {
        flattened[`${prefix}${key}`] = obj[key]
      }
    }
    return flattened
  }

  // Convert first level arrays to CSV
  for (const key in data) {
    if (Array.isArray(data[key]) && data[key].length > 0) {
      const headers = Object.keys(flattenObject(data[key][0]))
      const rows = data[key].map((item: any) => {
        const flattened = flattenObject(item)
        return headers.map(header => flattened[header] || '').join(',')
      })
      
      return [headers.join(','), ...rows].join('\n')
    }
  }

  return 'No tabular data available'
}
