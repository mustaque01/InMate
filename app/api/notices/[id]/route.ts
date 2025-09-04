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
    
    // Students can only see active notices targeted at them
    if (user.role === 'STUDENT') {
      whereClause.isActive = true
      whereClause.OR = [
        { targetRole: null },
        { targetRole: 'STUDENT' }
      ]
    }

    const notice = await prisma.notice.findFirst({
      where: whereClause,
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

    if (!notice) {
      return createErrorResponse('Notice not found', 404)
    }

    return createSuccessResponse({ notice })
  } catch (error) {
    console.error('Get notice error:', error)
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

    const {
      title,
      content,
      type,
      priority,
      targetRole,
      isActive
    } = await request.json()

    const updateData: any = {
      updatedAt: new Date()
    }

    if (title) updateData.title = title
    if (content) updateData.content = content
    if (type) updateData.type = type.toUpperCase()
    if (priority) updateData.priority = priority.toUpperCase()
    if (targetRole !== undefined) updateData.targetRole = targetRole ? targetRole.toUpperCase() : null
    if (isActive !== undefined) updateData.isActive = isActive

    const notice = await prisma.notice.update({
      where: { id: params.id },
      data: updateData,
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

    return createSuccessResponse({ notice })
  } catch (error) {
    console.error('Update notice error:', error)
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

    const notice = await prisma.notice.findUnique({
      where: { id: params.id }
    })

    if (!notice) {
      return createErrorResponse('Notice not found', 404)
    }

    await prisma.notice.delete({
      where: { id: params.id }
    })

    return createSuccessResponse({ message: 'Notice deleted successfully' })
  } catch (error) {
    console.error('Delete notice error:', error)
    return createErrorResponse('Internal server error', 500)
  }
}
