import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { getAuthUser, createErrorResponse, createSuccessResponse } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user || user.role !== 'ADMIN') {
      return createErrorResponse('Unauthorized', 401)
    }

    const { searchParams } = new URL(request.url)
    const role = searchParams.get('role')
    const search = searchParams.get('search')
    
    const whereClause: any = {}
    
    if (role) whereClause.role = role.toUpperCase()
    
    if (search) {
      whereClause.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { studentId: { contains: search, mode: 'insensitive' } }
      ]
    }

    const users = await prisma.user.findMany({
      where: whereClause,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        phone: true,
        studentId: true,
        roomNumber: true,
        course: true,
        year: true,
        guardianName: true,
        guardianPhone: true,
        address: true,
        emergencyContact: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            bookings: { where: { status: 'ACTIVE' } },
            payments: { where: { status: 'PENDING' } }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return createSuccessResponse({ users })
  } catch (error) {
    console.error('Get users error:', error)
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
      email,
      name,
      role,
      phone,
      studentId,
      course,
      year,
      guardianName,
      guardianPhone,
      address,
      emergencyContact
    } = await request.json()

    if (!email || !name || !role) {
      return createErrorResponse('Email, name, and role are required')
    }

    // Check if user already exists
    const existing = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email.toLowerCase() },
          ...(studentId ? [{ studentId }] : [])
        ]
      }
    })

    if (existing) {
      return createErrorResponse('User with this email or student ID already exists', 409)
    }

    // Create user with default password (they should change it)
    const defaultPassword = 'password123' // In real app, generate random password and send via email
    
    const newUser = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: await require('bcryptjs').hash(defaultPassword, 12),
        name,
        role: role.toUpperCase(),
        phone,
        studentId,
        course,
        year,
        guardianName,
        guardianPhone,
        address,
        emergencyContact
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        phone: true,
        studentId: true,
        course: true,
        year: true,
        guardianName: true,
        guardianPhone: true,
        address: true,
        emergencyContact: true
      }
    })

    return createSuccessResponse({ 
      user: newUser, 
      message: 'User created successfully. Default password is: password123' 
    }, 201)
  } catch (error) {
    console.error('Create user error:', error)
    return createErrorResponse('Internal server error', 500)
  }
}
