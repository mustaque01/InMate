import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// GET /api/payments/reminders - Get payment reminders
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const paymentId = searchParams.get('paymentId')
    const userId = searchParams.get('userId')

    const reminders = await prisma.paymentReminder.findMany({
      where: {
        ...(paymentId && { paymentId }),
        ...(userId && { payment: { userId } })
      },
      include: {
        payment: {
          include: {
            user: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(reminders)
  } catch (error) {
    console.error('Error fetching payment reminders:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/payments/reminders - Create payment reminder
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { paymentId, type, method, message } = await request.json()

    if (!paymentId || !type || !method || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const reminder = await prisma.paymentReminder.create({
      data: {
        paymentId,
        type,
        sentDate: new Date(),
        status: 'SENT',
        method,
        message
      },
      include: {
        payment: {
          include: {
            user: true
          }
        }
      }
    })

    return NextResponse.json(reminder, { status: 201 })
  } catch (error) {
    console.error('Error creating payment reminder:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
