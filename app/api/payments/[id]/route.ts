import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { getAuthUser, createErrorResponse, createSuccessResponse } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getAuthUser(request)
    if (!user) {
      return createErrorResponse('Unauthorized', 401)
    }

    const whereClause: any = { id: params.id }
    
    // Students can only see their own payments
    if (user.role === 'STUDENT') {
      whereClause.userId = user.id
    }

    const payment = await prisma.payment.findUnique({
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
                block: true,
                type: true
              }
            }
          }
        }
      }
    })

    if (!payment) {
      return createErrorResponse('Payment not found', 404)
    }

    return createSuccessResponse({ payment })
  } catch (error) {
    console.error('Get payment error:', error)
    return createErrorResponse('Internal server error', 500)
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getAuthUser(request)
    if (!user || user.role !== 'ADMIN') {
      return createErrorResponse('Unauthorized', 401)
    }

    const { status, method, reference, paidDate } = await request.json()

    if (!status) {
      return createErrorResponse('Status is required')
    }

    const updateData: any = {
      status: status.toUpperCase(),
      updatedAt: new Date()
    }

    if (status.toUpperCase() === 'PAID') {
      updateData.paidDate = paidDate ? new Date(paidDate) : new Date()
      if (method) updateData.method = method
      if (reference) updateData.reference = reference
    }

    const payment = await prisma.payment.update({
      where: { id: params.id },
      data: updateData,
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

    return createSuccessResponse({ payment })
  } catch (error) {
    console.error('Update payment error:', error)
    return createErrorResponse('Internal server error', 500)
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getAuthUser(request)
    if (!user || user.role !== 'ADMIN') {
      return createErrorResponse('Unauthorized', 401)
    }

    const payment = await prisma.payment.findUnique({
      where: { id: params.id }
    })

    if (!payment) {
      return createErrorResponse('Payment not found', 404)
    }

    if (payment.status === 'PAID') {
      return createErrorResponse('Cannot delete paid payments', 409)
    }

    await prisma.payment.delete({
      where: { id: params.id }
    })

    return createSuccessResponse({ message: 'Payment deleted successfully' })
  } catch (error) {
    console.error('Delete payment error:', error)
    return createErrorResponse('Internal server error', 500)
  }
}
