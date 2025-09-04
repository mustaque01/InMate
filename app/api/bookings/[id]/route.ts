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
    
    // Students can only see their own bookings
    if (user.role === 'STUDENT') {
      whereClause.userId = user.id
    }

    const booking = await prisma.booking.findUnique({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            studentId: true,
            phone: true
          }
        },
        room: {
          select: {
            id: true,
            roomNumber: true,
            type: true,
            block: true,
            floor: true,
            monthlyRent: true
          }
        },
        payments: true
      }
    })

    if (!booking) {
      return createErrorResponse('Booking not found', 404)
    }

    return createSuccessResponse({ booking })
  } catch (error) {
    console.error('Get booking error:', error)
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

    const { status, notes } = await request.json()

    if (!status) {
      return createErrorResponse('Status is required')
    }

    const currentBooking = await prisma.booking.findUnique({
      where: { id: params.id },
      include: { room: true }
    })

    if (!currentBooking) {
      return createErrorResponse('Booking not found', 404)
    }

    const booking = await prisma.booking.update({
      where: { id: params.id },
      data: {
        status: status.toUpperCase(),
        notes: notes || currentBooking.notes,
        updatedAt: new Date()
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
        room: {
          select: {
            id: true,
            roomNumber: true,
            type: true,
            block: true
          }
        }
      }
    })

    // Update room occupancy based on status change
    if (status.toUpperCase() === 'CANCELLED' || status.toUpperCase() === 'COMPLETED') {
      await prisma.room.update({
        where: { id: currentBooking.roomId },
        data: {
          currentOccupancy: { decrement: 1 },
          status: 'AVAILABLE'
        }
      })
    } else if (status.toUpperCase() === 'ACTIVE' && currentBooking.status === 'PENDING') {
      // Update user's room number
      await prisma.user.update({
        where: { id: currentBooking.userId },
        data: { roomNumber: currentBooking.room.roomNumber }
      })
    }

    return createSuccessResponse({ booking })
  } catch (error) {
    console.error('Update booking error:', error)
    return createErrorResponse('Internal server error', 500)
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getAuthUser(request)
    if (!user) {
      return createErrorResponse('Unauthorized', 401)
    }

    const booking = await prisma.booking.findUnique({
      where: { id: params.id },
      include: { room: true }
    })

    if (!booking) {
      return createErrorResponse('Booking not found', 404)
    }

    // Students can only cancel their own pending bookings
    if (user.role === 'STUDENT' && (booking.userId !== user.id || booking.status !== 'PENDING')) {
      return createErrorResponse('Cannot cancel this booking', 403)
    }

    await prisma.booking.delete({
      where: { id: params.id }
    })

    // Update room occupancy if booking was active
    if (booking.status === 'ACTIVE' || booking.status === 'CONFIRMED') {
      await prisma.room.update({
        where: { id: booking.roomId },
        data: {
          currentOccupancy: { decrement: 1 },
          status: 'AVAILABLE'
        }
      })
    }

    return createSuccessResponse({ message: 'Booking deleted successfully' })
  } catch (error) {
    console.error('Delete booking error:', error)
    return createErrorResponse('Internal server error', 500)
  }
}
