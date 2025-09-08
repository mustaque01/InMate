import { NextRequest } from 'next/server'
import { getAuthUser, createErrorResponse, createSuccessResponse } from '@/lib/auth'

// In-memory store for notifications (in production, use Redis or database)
const notifications: Map<string, any[]> = new Map()

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user) {
      return createErrorResponse('Unauthorized', 401)
    }

    const { searchParams } = new URL(request.url)
    const unreadOnly = searchParams.get('unreadOnly') === 'true'

    // Get user's notifications
    const userNotifications = notifications.get(user.id) || []
    
    const filteredNotifications = unreadOnly 
      ? userNotifications.filter(n => !n.read)
      : userNotifications

    return createSuccessResponse({
      notifications: filteredNotifications,
      unreadCount: userNotifications.filter(n => !n.read).length
    })
  } catch (error) {
    console.error('Get notifications error:', error)
    return createErrorResponse('Internal server error', 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user) {
      return createErrorResponse('Unauthorized', 401)
    }

    const { title, message, type, targetUserId, targetRole } = await request.json()

    if (!title || !message || !type) {
      return createErrorResponse('Title, message, and type are required')
    }

    const notification = {
      id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title,
      message,
      type, // 'info', 'warning', 'error', 'success', 'payment', 'booking'
      read: false,
      createdAt: new Date().toISOString(),
      createdBy: user.id
    }

    // Determine target users
    let targetUsers: string[] = []
    
    if (targetUserId) {
      targetUsers = [targetUserId]
    } else if (targetRole) {
      // Get all users with specific role (simplified - in production, get from database)
      targetUsers = ['all_' + targetRole.toLowerCase()]
    } else {
      // Send to current user
      targetUsers = [user.id]
    }

    // Add notification to each target user
    targetUsers.forEach(userId => {
      if (!notifications.has(userId)) {
        notifications.set(userId, [])
      }
      
      const userNotifications = notifications.get(userId)!
      userNotifications.unshift(notification)
      
      // Keep only last 100 notifications per user
      if (userNotifications.length > 100) {
        userNotifications.splice(100)
      }
    })

    return createSuccessResponse({
      notification,
      targetUsers: targetUsers.length
    })
  } catch (error) {
    console.error('Create notification error:', error)
    return createErrorResponse('Internal server error', 500)
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user) {
      return createErrorResponse('Unauthorized', 401)
    }

    const { action, notificationId } = await request.json()

    if (!action) {
      return createErrorResponse('Action is required')
    }

    const userNotifications = notifications.get(user.id) || []

    switch (action) {
      case 'mark_read':
        if (notificationId) {
          const notification = userNotifications.find(n => n.id === notificationId)
          if (notification) {
            notification.read = true
          }
        }
        break

      case 'mark_all_read':
        userNotifications.forEach(n => n.read = true)
        break

      case 'delete':
        if (notificationId) {
          const index = userNotifications.findIndex(n => n.id === notificationId)
          if (index !== -1) {
            userNotifications.splice(index, 1)
          }
        }
        break

      case 'clear_all':
        notifications.set(user.id, [])
        break

      default:
        return createErrorResponse('Invalid action')
    }

    return createSuccessResponse({
      message: 'Notification updated successfully',
      unreadCount: userNotifications.filter(n => !n.read).length
    })
  } catch (error) {
    console.error('Update notification error:', error)
    return createErrorResponse('Internal server error', 500)
  }
}

// Helper function to send system notifications
export async function sendSystemNotification(
  type: string, 
  title: string, 
  message: string, 
  targetUserId?: string,
  targetRole?: string
) {
  const notification = {
    id: `sys_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    title,
    message,
    type,
    read: false,
    createdAt: new Date().toISOString(),
    createdBy: 'system'
  }

  let targetUsers: string[] = []
  
  if (targetUserId) {
    targetUsers = [targetUserId]
  } else if (targetRole) {
    targetUsers = ['all_' + targetRole.toLowerCase()]
  }

  targetUsers.forEach(userId => {
    if (!notifications.has(userId)) {
      notifications.set(userId, [])
    }
    
    const userNotifications = notifications.get(userId)!
    userNotifications.unshift(notification)
    
    if (userNotifications.length > 100) {
      userNotifications.splice(100)
    }
  })

  return notification
}
