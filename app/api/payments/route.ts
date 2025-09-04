import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { getAuthUser, createErrorResponse, createSuccessResponse } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user) {
      return createErrorResponse('Unauthorized', 401)
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const type = searchParams.get('type')
    const userId = searchParams.get('userId')
    
    const whereClause: any = {}
    
    // Students can only see their own payments
    if (user.role === 'STUDENT') {
      whereClause.userId = user.id
    } else {
      // Admins can filter by userId if specified
      if (userId) whereClause.userId = userId
    }
    
    if (status) whereClause.status = status.toUpperCase()
    if (type) whereClause.type = type.toUpperCase()

    const payments = await prisma.payment.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            studentId: true,
            roomNumber: true
          }
        },
        booking: {
          select: {
            id: true,
            room: {
              select: {
                roomNumber: true,
                block: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return createSuccessResponse({ payments })
  } catch (error) {
    console.error('Get payments error:', error)
    return createErrorResponse('Internal server error', 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user || user.role !== 'ADMIN') {
      return createErrorResponse('Unauthorized', 401)
    }

    const {
      userId,
      bookingId,
      amount,
      type,
      dueDate,
      description
    } = await request.json()

    if (!userId || !amount || !type || !dueDate) {
      return createErrorResponse('Missing required fields')
    }

    const payment = await prisma.payment.create({
      data: {
        userId,
        bookingId: bookingId || null,
        amount: parseFloat(amount),
        type: type.toUpperCase(),
        dueDate: new Date(dueDate),
        description,
        status: 'PENDING'
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            studentId: true
          }
        },
        booking: {
          select: {
            id: true,
            room: {
              select: {
                roomNumber: true,
                block: true
              }
            }
          }
        }
      }
    })

    return createSuccessResponse({ payment }, 201)
  } catch (error) {
    console.error('Create payment error:', error)
    return createErrorResponse('Internal server error', 500)
  }
}
