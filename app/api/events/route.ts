import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/events - Get events
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const upcoming = searchParams.get('upcoming') === 'true'
    const userId = searchParams.get('userId')

    let dateFilter = {}
    if (upcoming) {
      dateFilter = {
        startDate: {
          gte: new Date()
        }
      }
    }

    const events = await prisma.event.findMany({
      where: {
        ...(category && { category: category as any }),
        ...dateFilter,
        isPublic: true
      },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true
          }
        },
        attendees: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                studentId: true
              }
            }
          }
        },
        _count: {
          select: {
            attendees: true
          }
        }
      },
      orderBy: { startDate: 'asc' }
    })

    return NextResponse.json(events)
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/events - Create event
export async function POST(request: NextRequest) {
  try {
    const { 
      title, 
      description, 
      startDate, 
      endDate, 
      location, 
      category, 
      isPublic, 
      maxAttendees, 
      createdById 
    } = await request.json()

    if (!title || !description || !startDate || !createdById) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const event = await prisma.event.create({
      data: {
        title,
        description,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        location,
        category: category || 'GENERAL',
        isPublic: isPublic !== false, // default true
        maxAttendees,
        createdById
      },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    return NextResponse.json(event, { status: 201 })
  } catch (error) {
    console.error('Error creating event:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
