import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/leave-applications - Get leave applications
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const status = searchParams.get('status')

    const leaveApplications = await prisma.leaveApplication.findMany({
      where: {
        ...(userId && { userId }),
        ...(status && { status: status as any })
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
        approver: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(leaveApplications)
  } catch (error) {
    console.error('Error fetching leave applications:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/leave-applications - Create leave application
export async function POST(request: NextRequest) {
  try {
    const { userId, startDate, endDate, reason, description } = await request.json()

    if (!userId || !startDate || !endDate || !reason) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Validate dates
    const start = new Date(startDate)
    const end = new Date(endDate)
    const today = new Date()
    
    if (start < today) {
      return NextResponse.json({ error: 'Start date cannot be in the past' }, { status: 400 })
    }
    
    if (end < start) {
      return NextResponse.json({ error: 'End date cannot be before start date' }, { status: 400 })
    }

    const leaveApplication = await prisma.leaveApplication.create({
      data: {
        userId,
        startDate: start,
        endDate: end,
        reason,
        description,
        status: 'PENDING'
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

    return NextResponse.json(leaveApplication, { status: 201 })
  } catch (error) {
    console.error('Error creating leave application:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
