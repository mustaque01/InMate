import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { getAuthUser, createErrorResponse, createSuccessResponse } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user || user.role !== 'ADMIN') {
      return createErrorResponse('Unauthorized', 401)
    }

    const { action, ids, data } = await request.json()

    if (!action || !ids || !Array.isArray(ids)) {
      return createErrorResponse('Invalid request format')
    }

    let result: any = {}

    switch (action) {
      case 'delete_users':
        // Don't allow deleting users with active bookings
        const usersWithBookings = await prisma.user.findMany({
          where: {
            id: { in: ids },
            bookings: {
              some: { status: { in: ['ACTIVE', 'CONFIRMED'] } }
            }
          },
          select: { id: true, name: true }
        })

        if (usersWithBookings.length > 0) {
          return createErrorResponse(
            `Cannot delete users with active bookings: ${usersWithBookings.map(u => u.name).join(', ')}`
          )
        }

        result = await prisma.user.deleteMany({
          where: { id: { in: ids } }
        })
        break

      case 'update_room_status':
        if (!data.status) {
          return createErrorResponse('Status is required')
        }
        
        result = await prisma.room.updateMany({
          where: { id: { in: ids } },
          data: { status: data.status.toUpperCase() }
        })
        break

      case 'approve_bookings':
        result = await prisma.booking.updateMany({
          where: { 
            id: { in: ids },
            status: 'PENDING'
          },
          data: { status: 'CONFIRMED' }
        })
        break

      case 'cancel_bookings':
        // Update room occupancy when cancelling
        const bookingsToCancel = await prisma.booking.findMany({
          where: { id: { in: ids } },
          include: { room: true }
        })

        await prisma.$transaction(async (tx) => {
          await tx.booking.updateMany({
            where: { id: { in: ids } },
            data: { status: 'CANCELLED' }
          })

          // Update room occupancy
          for (const booking of bookingsToCancel) {
            await tx.room.update({
              where: { id: booking.roomId },
              data: {
                currentOccupancy: { decrement: 1 },
                status: booking.room.currentOccupancy - 1 === 0 ? 'AVAILABLE' : booking.room.status
              }
            })
          }
        })

        result = { count: bookingsToCancel.length }
        break

      case 'mark_payments_paid':
        if (!data.paidDate) {
          return createErrorResponse('Paid date is required')
        }

        result = await prisma.payment.updateMany({
          where: { 
            id: { in: ids },
            status: 'PENDING'
          },
          data: { 
            status: 'PAID',
            paidDate: new Date(data.paidDate)
          }
        })
        break

      case 'generate_rent_payments':
        // Generate monthly rent payments for active bookings
        const activeBookings = await prisma.booking.findMany({
          where: { 
            id: { in: ids },
            status: 'ACTIVE'
          },
          include: { user: true }
        })

        const month = data.month || new Date().getMonth() + 1
        const year = data.year || new Date().getFullYear()
        const dueDate = new Date(year, month - 1, data.dueDay || 5)

        const paymentsToCreate = activeBookings.map(booking => ({
          userId: booking.userId,
          bookingId: booking.id,
          amount: booking.monthlyRent,
          type: 'RENT' as const,
          status: 'PENDING' as const,
          dueDate,
          description: `Rent for ${new Date(year, month - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`
        }))

        result = await prisma.payment.createMany({
          data: paymentsToCreate
        })
        break

      case 'send_payment_reminders':
        // In a real app, this would send emails/SMS
        const overduePayments = await prisma.payment.findMany({
          where: {
            id: { in: ids },
            status: 'PENDING',
            dueDate: { lt: new Date() }
          },
          include: {
            user: { select: { id: true, name: true, email: true, phone: true } },
            booking: {
              include: {
                room: { select: { roomNumber: true, block: true } }
              }
            }
          }
        })

        // Log reminder actions (in real app, integrate with email/SMS service)
        console.log(`Sending payment reminders to ${overduePayments.length} users:`)
        overduePayments.forEach(payment => {
          console.log(`- ${payment.user.name} (${payment.user.email}): ₹${payment.amount} due`)
        })

        result = { remindersSent: overduePayments.length }
        break

      default:
        return createErrorResponse('Invalid action')
    }

    return createSuccessResponse({ 
      action, 
      processed: result.count || ids.length,
      result 
    })
  } catch (error) {
    console.error('Bulk operation error:', error)
    return createErrorResponse('Internal server error', 500)
  }
}
