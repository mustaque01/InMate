import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { hashPassword, createErrorResponse, createSuccessResponse } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, role, phone } = await request.json()

    if (!email || !password || !name || !role) {
      return createErrorResponse('Email, password, name, and role are required')
    }

    const existing = await prisma.user.findFirst({ where: { email: email.toLowerCase() } })
    if (existing) {
      return createErrorResponse('User already exists', 409)
    }

    const hashed = await hashPassword(password)

    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashed,
        name,
        role: role.toUpperCase(),
        phone,
      },
      select: { id: true, email: true, name: true, role: true, phone: true }
    })

    return createSuccessResponse({ user }, 201)
  } catch (error) {
    console.error('Signup error:', error)
    return createErrorResponse('Internal server error', 500)
  }
}

