import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/db'

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': 'http://localhost:5173',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true',
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders(),
  })
}

export async function GET(request: NextRequest) {
  try {
    // Get token from Authorization header or cookies
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '') || request.cookies.get('token')?.value

    if (!token) {
      return NextResponse.json(
        { error: 'No token provided' },
        { 
          status: 401,
          headers: corsHeaders()
        }
      )
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key') as any

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { 
          status: 401,
          headers: corsHeaders()
        }
      )
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    }, {
      headers: corsHeaders()
    })

  } catch (error) {
    console.error('Auth verification error:', error)
    return NextResponse.json(
      { error: 'Invalid token' },
      { 
        status: 401,
        headers: corsHeaders()
      }
    )
  }
}
