import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { getAuthUser, createErrorResponse, createSuccessResponse } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user) {
      return createErrorResponse('Unauthorized', 401)
    }

    if (user.role === 'ADMIN') {
      // Admin dashboard stats
      const [
        totalRooms,
        occupiedRooms,
        totalStudents,
        pendingBookings,
        overduePayments,
        totalRevenue,
        monthlyRevenue,
        recentBookings,
        recentPayments
      ] = await Promise.all([
        prisma.room.count(),
        prisma.room.count({ where: { status: 'OCCUPIED' } }),
        prisma.user.count({ where: { role: 'STUDENT' } }),
        prisma.booking.count({ where: { status: 'PENDING' } }),
        prisma.payment.count({ 
          where: { 
            status: 'OVERDUE',
            dueDate: { lt: new Date() }
          } 
        }),
        prisma.payment.aggregate({
          where: { status: 'PAID' },
          _sum: { amount: true }
        }),
        prisma.payment.aggregate({
          where: { 
            status: 'PAID',
            paidDate: {
              gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
            }
          },
          _sum: { amount: true }
        }),
        prisma.booking.findMany({
          take: 5,
          orderBy: { createdAt: 'desc' },
          include: {
            user: {
              select: { name: true, studentId: true }
            },
            room: {
              select: { roomNumber: true, block: true }
            }
          }
        }),
        prisma.payment.findMany({
          take: 5,
          orderBy: { createdAt: 'desc' },
          include: {
            user: {
              select: { name: true, studentId: true }
            }
          }
        })
      ])

      const dashboardStats = {
        totalRooms,
        occupiedRooms,
        totalStudents,
        pendingBookings,
        overduePayments,
        totalRevenue: totalRevenue._sum.amount || 0,
        monthlyRevenue: monthlyRevenue._sum.amount || 0,
        recentBookings,
        recentPayments
      }

      return createSuccessResponse({ stats: dashboardStats })
    } else {
      // Student dashboard stats
      const [
        currentBooking,
        pendingPayments,
        recentNotices,
        roomDetails
      ] = await Promise.all([
        prisma.booking.findFirst({
          where: { 
            userId: user.id,
            status: { in: ['CONFIRMED', 'ACTIVE'] }
          },
          include: {
            room: true,
            payments: {
              where: { status: 'PENDING' },
              orderBy: { dueDate: 'asc' }
            }
          }
        }),
        prisma.payment.findMany({
          where: { 
            userId: user.id,
            status: 'PENDING'
          },
          orderBy: { dueDate: 'asc' }
        }),
        prisma.notice.findMany({
          take: 5,
          where: {
            OR: [
              { targetRole: null },
              { targetRole: 'STUDENT' }
            ],
            isActive: true
          },
          orderBy: [
            { priority: 'desc' },
            { createdAt: 'desc' }
          ],
          include: {
            createdBy: {
              select: { name: true }
            }
          }
        }),
        user.roomNumber ? prisma.room.findFirst({
          where: { roomNumber: user.roomNumber }
        }) : null
      ])

      const studentStats = {
        currentBooking,
        pendingPayments,
        recentNotices,
        roomDetails
      }

      return createSuccessResponse({ stats: studentStats })
    }
  } catch (error) {
    console.error('Dashboard stats error:', error)
    return createErrorResponse('Internal server error', 500)
  }
}
