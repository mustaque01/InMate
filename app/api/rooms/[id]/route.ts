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

    const room = await prisma.room.findUnique({
      where: { id: params.id },
      include: {
        bookings: {
          include: {
            user: {
              select: { id: true, name: true, email: true, studentId: true }
            }
          }
        }
      }
    })

    if (!room) {
      return createErrorResponse('Room not found', 404)
    }

    return createSuccessResponse({ room })
  } catch (error) {
    console.error('Get room error:', error)
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

    const data = await request.json()

    const room = await prisma.room.update({
      where: { id: params.id },
      data: {
        ...data,
        amenities: data.amenities ? JSON.stringify(data.amenities) : undefined
      }
    })

    return createSuccessResponse({ room })
  } catch (error) {
    console.error('Update room error:', error)
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

    // Check if room has active bookings
    const activeBookings = await prisma.booking.findFirst({
      where: {
        roomId: params.id,
        status: { in: ['ACTIVE', 'CONFIRMED'] }
      }
    })

    if (activeBookings) {
      return createErrorResponse('Cannot delete room with active bookings', 409)
    }

    await prisma.room.delete({
      where: { id: params.id }
    })

    return createSuccessResponse({ message: 'Room deleted successfully' })
  } catch (error) {
    console.error('Delete room error:', error)
    return createErrorResponse('Internal server error', 500)
  }
}
