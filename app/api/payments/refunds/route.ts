import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/payments/refunds - Get refunds
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const status = searchParams.get('status')

    const refunds = await prisma.refund.findMany({
      where: {
        ...(userId && { userId }),
        ...(status && { status: status as any })
      },
      include: {
        payment: {
          include: {
            user: true
          }
        },
        user: true
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(refunds)
  } catch (error) {
    console.error('Error fetching refunds:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/payments/refunds - Create refund request
export async function POST(request: NextRequest) {
  try {
    const { paymentId, userId, amount, reason, refundMethod } = await request.json()

    if (!paymentId || !userId || !amount || !reason) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Verify payment exists and user owns it
    const payment = await prisma.payment.findFirst({
      where: {
        id: paymentId,
        userId: userId
      }
    })

    if (!payment) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 })
    }

    const refund = await prisma.refund.create({
      data: {
        paymentId,
        userId,
        amount,
        reason,
        refundMethod,
        status: 'PENDING'
      },
      include: {
        payment: {
          include: {
            user: true
          }
        },
        user: true
      }
    })

    return NextResponse.json(refund, { status: 201 })
  } catch (error) {
    console.error('Error creating refund:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
