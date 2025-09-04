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
    const block = searchParams.get('block')
    
    const whereClause: any = {}
    if (status) whereClause.status = status.toUpperCase()
    if (type) whereClause.type = type.toUpperCase()
    if (block) whereClause.block = block

    const rooms = await prisma.room.findMany({
      where: whereClause,
      include: {
        bookings: {
          where: { status: 'ACTIVE' },
          include: {
            user: {
              select: { id: true, name: true, email: true, studentId: true }
            }
          }
        },
        _count: {
          select: { bookings: { where: { status: 'ACTIVE' } } }
        }
      },
      orderBy: [{ block: 'asc' }, { roomNumber: 'asc' }]
    })

    return createSuccessResponse({ rooms })
  } catch (error) {
    console.error('Get rooms error:', error)
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
      roomNumber,
      type,
      capacity,
      floor,
      block,
      monthlyRent,
      amenities,
      description
    } = await request.json()

    if (!roomNumber || !type || !capacity || !floor || !block || !monthlyRent) {
      return createErrorResponse('Missing required fields')
    }

    // Check if room number already exists
    const existing = await prisma.room.findUnique({
      where: { roomNumber }
    })

    if (existing) {
      return createErrorResponse('Room number already exists', 409)
    }

    const room = await prisma.room.create({
      data: {
        roomNumber,
        type: type.toUpperCase(),
        capacity,
        floor,
        block,
        monthlyRent,
        amenities: amenities ? JSON.stringify(amenities) : null,
        description
      }
    })

    return createSuccessResponse({ room }, 201)
  } catch (error) {
    console.error('Create room error:', error)
    return createErrorResponse('Internal server error', 500)
  }
}
