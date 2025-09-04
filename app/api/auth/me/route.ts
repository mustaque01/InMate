import { NextRequest } from 'next/server'
import { getAuthUser, createErrorResponse, createSuccessResponse } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    
    if (!user) {
      return createErrorResponse('Unauthorized', 401)
    }

    return createSuccessResponse({ user })
  } catch (error) {
    console.error('Auth verification error:', error)
    return createErrorResponse('Internal server error', 500)
  }
}
