import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/payments/installments - Get installment plans
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const status = searchParams.get('status')

    const installmentPlans = await prisma.installmentPlan.findMany({
      where: {
        ...(userId && { userId }),
        ...(status && { status: status as any })
      },
      include: {
        payment: {
          include: {
            user: true
          }
        },
        user: true,
        installmentPayments: {
          orderBy: { installmentNumber: 'asc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(installmentPlans)
  } catch (error) {
    console.error('Error fetching installment plans:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/payments/installments - Create installment plan
export async function POST(request: NextRequest) {
  try {
    const { paymentId, userId, totalAmount, installments } = await request.json()

    if (!paymentId || !userId || !totalAmount || !installments) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const monthlyAmount = Math.ceil(totalAmount / installments)
    const startDate = new Date()

    const installmentPlan = await prisma.installmentPlan.create({
      data: {
        paymentId,
        userId,
        totalAmount,
        installments,
        monthlyAmount,
        startDate,
        status: 'ACTIVE'
      }
    })

    // Create individual installment payments
    const installmentPayments = []
    for (let i = 1; i <= installments; i++) {
      const dueDate = new Date(startDate)
      dueDate.setMonth(dueDate.getMonth() + i - 1)
      
      installmentPayments.push({
        planId: installmentPlan.id,
        amount: i === installments ? totalAmount - (monthlyAmount * (installments - 1)) : monthlyAmount,
        dueDate,
        installmentNumber: i,
        status: 'PENDING'
      })
    }

    await prisma.installmentPayment.createMany({
      data: installmentPayments
    })

    const planWithPayments = await prisma.installmentPlan.findUnique({
      where: { id: installmentPlan.id },
      include: {
        payment: {
          include: {
            user: true
          }
        },
        user: true,
        installmentPayments: {
          orderBy: { installmentNumber: 'asc' }
        }
      }
    })

    return NextResponse.json(planWithPayments, { status: 201 })
  } catch (error) {
    console.error('Error creating installment plan:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
