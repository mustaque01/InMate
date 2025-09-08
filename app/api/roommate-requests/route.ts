import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/roommate-requests - Get roommate requests
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const status = searchParams.get('status')
    const roomType = searchParams.get('roomType')

    const roommateRequests = await prisma.roommateRequest.findMany({
      where: {
        ...(userId && { userId }),
        ...(status && { status: status as any }),
        ...(roomType && { roomType: roomType as any }),
        ...(status !== 'EXPIRED' && {
          OR: [
            { expiresAt: null },
            { expiresAt: { gt: new Date() } }
          ]
        })
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            studentId: true,
            course: true,
            year: true,
            phone: true
          }
        },
        responses: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                studentId: true,
                course: true,
                year: true,
                phone: true
              }
            }
          },
          orderBy: { createdAt: 'desc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(roommateRequests)
  } catch (error) {
    console.error('Error fetching roommate requests:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/roommate-requests - Create roommate request
export async function POST(request: NextRequest) {
  try {
    const { userId, title, description, preferences, roomType, budget, contactInfo, expiresAt } = await request.json()

    if (!userId || !title || !description || !roomType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const roommateRequest = await prisma.roommateRequest.create({
      data: {
        userId,
        title,
        description,
        preferences: preferences ? JSON.stringify(preferences) : null,
        roomType,
        budget,
        contactInfo,
        status: 'ACTIVE',
        expiresAt: expiresAt ? new Date(expiresAt) : null
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            studentId: true,
            course: true,
            year: true,
            phone: true
          }
        }
      }
    })

    return NextResponse.json(roommateRequest, { status: 201 })
  } catch (error) {
    console.error('Error creating roommate request:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
