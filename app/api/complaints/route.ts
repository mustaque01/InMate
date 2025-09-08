import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/complaints - Get complaints
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const status = searchParams.get('status')
    const category = searchParams.get('category')
    const assignedTo = searchParams.get('assignedTo')

    const complaints = await prisma.complaint.findMany({
      where: {
        ...(userId && { userId }),
        ...(status && { status: status as any }),
        ...(category && { category: category as any }),
        ...(assignedTo && { assignedTo })
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            studentId: true,
            email: true,
            phone: true,
            roomNumber: true
          }
        },
        assignedAdmin: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(complaints)
  } catch (error) {
    console.error('Error fetching complaints:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/complaints - Create complaint
export async function POST(request: NextRequest) {
  try {
    const { userId, title, description, category, priority, attachments } = await request.json()

    if (!userId || !title || !description || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const complaint = await prisma.complaint.create({
      data: {
        userId,
        title,
        description,
        category,
        priority: priority || 'MEDIUM',
        status: 'OPEN',
        attachments: attachments ? JSON.stringify(attachments) : null
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            studentId: true,
            email: true,
            phone: true,
            roomNumber: true
          }
        }
      }
    })

    return NextResponse.json(complaint, { status: 201 })
  } catch (error) {
    console.error('Error creating complaint:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
