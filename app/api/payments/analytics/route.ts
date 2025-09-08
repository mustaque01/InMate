import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/payments/analytics - Get payment analytics
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || 'month' // month, quarter, year
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    let dateFilter = {}
    if (startDate && endDate) {
      dateFilter = {
        paidDate: {
          gte: new Date(startDate),
          lte: new Date(endDate)
        }
      }
    } else {
      const now = new Date()
      let start = new Date()
      
      switch (period) {
        case 'month':
          start.setMonth(now.getMonth() - 1)
          break
        case 'quarter':
          start.setMonth(now.getMonth() - 3)
          break
        case 'year':
          start.setFullYear(now.getFullYear() - 1)
          break
        default:
          start.setMonth(now.getMonth() - 1)
      }
      
      dateFilter = {
        paidDate: {
          gte: start,
          lte: now
        }
      }
    }

    // Total revenue
    const totalRevenue = await prisma.payment.aggregate({
      where: {
        status: 'PAID',
        ...dateFilter
      },
      _sum: {
        amount: true,
        lateFee: true
      }
    })

    // Payment by type
    const paymentsByType = await prisma.payment.groupBy({
      by: ['type'],
      where: {
        status: 'PAID',
        ...dateFilter
      },
      _sum: {
        amount: true
      },
      _count: true
    })

    // Outstanding payments
    const outstandingPayments = await prisma.payment.aggregate({
      where: {
        status: 'PENDING',
        dueDate: {
          lt: new Date()
        }
      },
      _sum: {
        amount: true
      },
      _count: true
    })

    // Monthly trend
    const monthlyTrend = await prisma.payment.findMany({
      where: {
        status: 'PAID',
        ...dateFilter
      },
      select: {
        amount: true,
        lateFee: true,
        paidDate: true,
        type: true
      }
    })

    // Group by month
    const monthlyData = monthlyTrend.reduce((acc, payment) => {
      if (!payment.paidDate) return acc
      
      const month = payment.paidDate.toISOString().substring(0, 7) // YYYY-MM
      if (!acc[month]) {
        acc[month] = {
          month,
          total: 0,
          rent: 0,
          fees: 0,
          lateFees: 0,
          count: 0
        }
      }
      
      acc[month].total += payment.amount + (payment.lateFee || 0)
      acc[month].lateFees += payment.lateFee || 0
      acc[month].count += 1
      
      if (payment.type === 'RENT') {
        acc[month].rent += payment.amount
      } else {
        acc[month].fees += payment.amount
      }
      
      return acc
    }, {} as Record<string, any>)

    // Late payment statistics
    const latePayments = await prisma.payment.findMany({
      where: {
        lateFee: {
          gt: 0
        },
        ...dateFilter
      },
      select: {
        lateFee: true,
        user: {
          select: {
            name: true,
            studentId: true
          }
        }
      }
    })

    const analytics = {
      totalRevenue: {
        amount: totalRevenue._sum.amount || 0,
        lateFees: totalRevenue._sum.lateFee || 0,
        total: (totalRevenue._sum.amount || 0) + (totalRevenue._sum.lateFee || 0)
      },
      paymentsByType,
      outstandingPayments: {
        amount: outstandingPayments._sum.amount || 0,
        count: outstandingPayments._count
      },
      monthlyTrend: Object.values(monthlyData),
      latePayments: {
        totalLateFees: latePayments.reduce((sum, p) => sum + (p.lateFee || 0), 0),
        count: latePayments.length,
        details: latePayments
      }
    }

    return NextResponse.json(analytics)
  } catch (error) {
    console.error('Error fetching payment analytics:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
