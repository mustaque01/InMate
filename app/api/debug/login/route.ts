import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyPassword, createErrorResponse, createSuccessResponse } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password, role } = await request.json()
    
    console.log('DEBUG: Login request received')
    console.log('DEBUG: Request data:', { email, role, passwordLength: password?.length })

    if (!email || !password || !role) {
      console.log('DEBUG: Missing required fields')
      return createErrorResponse('Email, password, and role are required')
    }

    const normalizedRole = role.toUpperCase()
    console.log('DEBUG: Searching for user with:', { 
      email: email.toLowerCase(), 
      role: normalizedRole 
    })

    // Find user by email and role
    const user = await prisma.user.findFirst({
      where: {
        email: email.toLowerCase(),
        role: normalizedRole
      }
    })

    console.log('DEBUG: User found:', user ? {
      id: user.id,
      email: user.email,
      role: user.role,
      hasPassword: !!user.password
    } : 'No user found')

    if (!user) {
      return createErrorResponse('Invalid credentials', 401)
    }

    // Verify password
    console.log('DEBUG: Verifying password...')
    const isValidPassword = await verifyPassword(password, user.password)
    console.log('DEBUG: Password valid:', isValidPassword)
    
    if (!isValidPassword) {
      return createErrorResponse('Invalid credentials', 401)
    }

    console.log('DEBUG: Login successful!')

    return createSuccessResponse({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    })

  } catch (error) {
    console.error('DEBUG: Login error:', error)
    return createErrorResponse(`Internal server error: ${error}`, 500)
  }
}
