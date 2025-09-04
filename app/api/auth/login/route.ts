import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { email, password, role } = await request.json()

    console.log('Login attempt:', { email, role })

    // Find user by email (case insensitive)
    const user = await prisma.user.findUnique({
      where: { 
        email: email.toLowerCase().trim()
      }
    })

    console.log('User found:', user ? 'Yes' : 'No')
    if (user) {
      console.log('User role:', user.role)
    }

    if (!user) {
      return NextResponse.json(
        { error: 'User not found. Please check your email.' },
        { status: 401 }
      )
    }

    // Check if role matches (convert both to uppercase for comparison)
    const userRole = user.role.toUpperCase()
    const requestedRole = role.toUpperCase()
    
    if (userRole !== requestedRole) {
      return NextResponse.json(
        { error: `This account is registered as ${user.role}, not ${role}` },
        { status: 401 }
      )
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid password. Please try again.' },
        { status: 401 }
      )
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        role: user.role 
      },
      process.env.JWT_SECRET || 'fallback-secret-key',
      { expiresIn: '7d' }
    )

    // Create response
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      }
    })

    // Set HTTP-only cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    })

    console.log('✅ Login successful for:', email)
    return response

  } catch (error) {
    console.error('❌ Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
