import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { createSuccessResponse, createErrorResponse } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    // Test database connection
    const userCount = await prisma.user.count()
    const roomCount = await prisma.room.count()
    
    return createSuccessResponse({
      message: 'API is working!',
      database: 'Connected',
      users: userCount,
      rooms: roomCount,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Test API error:', error)
    return createErrorResponse(`Database error: ${error}`, 500)
  }
}
