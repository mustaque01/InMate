import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/feedback - Get feedback
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const category = searchParams.get('category')
    const status = searchParams.get('status')

    const feedback = await prisma.feedback.findMany({
      where: {
        ...(userId && { userId }),
        ...(category && { category: category as any }),
        ...(status && { status: status as any })
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            studentId: true,
            email: true,
            roomNumber: true
          }
        },
        responder: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(feedback)
  } catch (error) {
    console.error('Error fetching feedback:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/feedback - Create feedback
export async function POST(request: NextRequest) {
  try {
    const { userId, category, rating, title, content, isAnonymous } = await request.json()

    if (!userId || !category || !rating || !title || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 })
    }

    const feedback = await prisma.feedback.create({
      data: {
        userId,
        category,
        rating,
        title,
        content,
        isAnonymous: isAnonymous || false,
        status: 'PENDING'
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            studentId: true,
            email: true,
            roomNumber: true
          }
        }
      }
    })

    return NextResponse.json(feedback, { status: 201 })
  } catch (error) {
    console.error('Error creating feedback:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
