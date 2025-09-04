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
    const type = searchParams.get('type')
    const priority = searchParams.get('priority')
    const isActive = searchParams.get('isActive')
    
    const whereClause: any = {}
    
    // Filter notices based on user role
    if (user.role === 'STUDENT') {
      whereClause.OR = [
        { targetRole: null }, // General notices for all
        { targetRole: 'STUDENT' } // Student-specific notices
      ]
      whereClause.isActive = true // Students only see active notices
    } else {
      // Admins can see all notices
      if (isActive !== null) whereClause.isActive = isActive === 'true'
    }
    
    if (type) whereClause.type = type.toUpperCase()
    if (priority) whereClause.priority = priority.toUpperCase()

    const notices = await prisma.notice.findMany({
      where: whereClause,
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        _count: {
          select: {
            recipients: true
          }
        }
      },
      orderBy: [
        { priority: 'desc' },
        { createdAt: 'desc' }
      ]
    })

    return createSuccessResponse({ notices })
  } catch (error) {
    console.error('Get notices error:', error)
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
      title,
      content,
      type,
      priority,
      targetRole
    } = await request.json()

    if (!title || !content) {
      return createErrorResponse('Title and content are required')
    }

    const notice = await prisma.notice.create({
      data: {
        title,
        content,
        type: type ? type.toUpperCase() : 'GENERAL',
        priority: priority ? priority.toUpperCase() : 'MEDIUM',
        targetRole: targetRole ? targetRole.toUpperCase() : null,
        createdById: user.id
      },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    return createSuccessResponse({ notice }, 201)
  } catch (error) {
    console.error('Create notice error:', error)
    return createErrorResponse('Internal server error', 500)
  }
}
