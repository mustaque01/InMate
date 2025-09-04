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
    const userId = searchParams.get('userId')
    
    const whereClause: any = {}
    
    // Students can only see their own bookings
    if (user.role === 'STUDENT') {
      whereClause.userId = user.id
    } else {
      // Admins can filter by userId if specified
      if (userId) whereClause.userId = userId
    }
    
    if (status) whereClause.status = status.toUpperCase()

    const bookings = await prisma.booking.findMany({
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
            floor: true
          }
        },
        payments: {
          select: {
            id: true,
            amount: true,
            type: true,
            status: true,
            dueDate: true,
            paidDate: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return createSuccessResponse({ bookings })
  } catch (error) {
    console.error('Get bookings error:', error)
    return createErrorResponse('Internal server error', 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user) {
      return createErrorResponse('Unauthorized', 401)
    }

    const {
      userId,
      roomId,
      startDate,
      endDate,
      monthlyRent,
      securityDeposit,
      notes
    } = await request.json()

    if (!roomId || !startDate || !monthlyRent) {
      return createErrorResponse('Missing required fields')
    }

    // Students can only create bookings for themselves
    const targetUserId = user.role === 'ADMIN' ? (userId || user.id) : user.id

    // Check if room exists and is available
    const room = await prisma.room.findUnique({
      where: { id: roomId },
      include: {
        bookings: {
          where: { status: { in: ['ACTIVE', 'CONFIRMED'] } }
        }
      }
    })

    if (!room) {
      return createErrorResponse('Room not found', 404)
    }

    if (room.status !== 'AVAILABLE') {
      return createErrorResponse('Room is not available', 409)
    }

    // Check if room has capacity
    if (room.bookings.length >= room.capacity) {
      return createErrorResponse('Room is at full capacity', 409)
    }

    // Check if user already has an active booking
    const existingBooking = await prisma.booking.findFirst({
      where: {
        userId: targetUserId,
        status: { in: ['ACTIVE', 'CONFIRMED', 'PENDING'] }
      }
    })

    if (existingBooking) {
      return createErrorResponse('User already has an active booking', 409)
    }

    const booking = await prisma.booking.create({
      data: {
        userId: targetUserId,
        roomId,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        monthlyRent,
        securityDeposit,
        notes,
        status: user.role === 'ADMIN' ? 'CONFIRMED' : 'PENDING'
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

    // Update room occupancy
    await prisma.room.update({
      where: { id: roomId },
      data: {
        currentOccupancy: { increment: 1 },
        status: room.currentOccupancy + 1 >= room.capacity ? 'OCCUPIED' : 'AVAILABLE'
      }
    })

    return createSuccessResponse({ booking }, 201)
  } catch (error) {
    console.error('Create booking error:', error)
    return createErrorResponse('Internal server error', 500)
  }
}
