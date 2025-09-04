import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyPassword, signJWT, createErrorResponse, createSuccessResponse } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password, role } = await request.json()

    if (!email || !password || !role) {
      return createErrorResponse('Email, password, and role are required')
    }

    // Find user by email and role (handle case insensitive)
    const normalizedRole = role.toUpperCase()
    console.log('Login attempt:', { email: email.toLowerCase(), role: normalizedRole })
    
    const user = await prisma.user.findFirst({
      where: {
        email: email.toLowerCase(),
        role: normalizedRole
      }
    })
    
    console.log('User found:', user ? 'Yes' : 'No')

    if (!user) {
      return createErrorResponse('Invalid credentials', 401)
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password)
    if (!isValidPassword) {
      return createErrorResponse('Invalid credentials', 401)
    }

    // Generate JWT token
    const token = signJWT({
      userId: user.id,
      email: user.email,
      role: user.role
    })

    // Return user data without password
    const userData = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      phone: user.phone,
      studentId: user.studentId,
      roomNumber: user.roomNumber
    }

    return createSuccessResponse({
      user: userData,
      token
    })

  } catch (error) {
    console.error('Login error:', error)
    return createErrorResponse('Internal server error', 500)
  }
}
