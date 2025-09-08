import { NextRequest } from 'next/server'
import { createSuccessResponse } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const baseUrl = request.nextUrl.origin

  const apiDocs = {
    info: {
      title: "InMate Hostel Management API",
      version: "1.0.0",
      description: "Complete REST API for hostel management system",
      contact: {
        name: "MD MUSTAK",
        email: "mustakarman560@gmail.com"
      }
    },
    baseUrl,
    endpoints: {
      authentication: {
        "/api/auth/login": {
          method: "POST",
          description: "User login",
          body: {
            email: "string",
            password: "string", 
            role: "admin | student"
          },
          response: "JWT token and user data"
        },
        "/api/auth/me": {
          method: "GET",
          description: "Get current user profile",
          headers: { "Authorization": "Bearer <token>" },
          response: "User profile data"
        }
      },
      users: {
        "/api/users": {
          GET: {
            description: "Get all users (Admin only)",
            query: {
              role: "ADMIN | STUDENT",
              search: "string",
              page: "number",
              limit: "number"
            }
          },
          POST: {
            description: "Create new user (Admin only)",
            body: {
              email: "string",
              name: "string",
              role: "ADMIN | STUDENT",
              phone: "string?",
              studentId: "string?",
              course: "string?",
              year: "number?"
            }
          }
        },
        "/api/users/[id]": {
          GET: "Get user by ID",
          PUT: "Update user",
          DELETE: "Delete user"
        }
      },
      rooms: {
        "/api/rooms": {
          GET: {
            description: "Get all rooms",
            query: {
              status: "AVAILABLE | OCCUPIED | MAINTENANCE | RESERVED",
              type: "SINGLE | DOUBLE | TRIPLE | DORMITORY",
              block: "string"
            }
          },
          POST: {
            description: "Create new room (Admin only)",
            body: {
              roomNumber: "string",
              type: "SINGLE | DOUBLE | TRIPLE | DORMITORY",
              capacity: "number",
              floor: "number",
              block: "string",
              monthlyRent: "number",
              amenities: "string[]?",
              description: "string?"
            }
          }
        },
        "/api/rooms/[id]": {
          GET: "Get room by ID",
          PUT: "Update room (Admin only)",
          DELETE: "Delete room (Admin only)"
        }
      },
      bookings: {
        "/api/bookings": {
          GET: {
            description: "Get bookings",
            query: {
              status: "PENDING | CONFIRMED | ACTIVE | COMPLETED | CANCELLED",
              userId: "string"
            }
          },
          POST: {
            description: "Create new booking",
            body: {
              roomId: "string",
              startDate: "ISO date",
              endDate: "ISO date?",
              monthlyRent: "number",
              securityDeposit: "number?",
              notes: "string?"
            }
          }
        },
        "/api/bookings/[id]": {
          GET: "Get booking by ID",
          PUT: "Update booking",
          DELETE: "Cancel booking"
        }
      },
      payments: {
        "/api/payments": {
          GET: {
            description: "Get payments",
            query: {
              status: "PENDING | PAID | OVERDUE | CANCELLED",
              userId: "string",
              bookingId: "string",
              type: "RENT | SECURITY_DEPOSIT | MAINTENANCE_FEE | LATE_FEE | OTHER"
            }
          },
          POST: {
            description: "Create payment record",
            body: {
              userId: "string",
              bookingId: "string?",
              amount: "number",
              type: "RENT | SECURITY_DEPOSIT | MAINTENANCE_FEE | LATE_FEE | OTHER",
              dueDate: "ISO date",
              description: "string?"
            }
          }
        },
        "/api/payments/[id]": {
          GET: "Get payment by ID",
          PUT: "Update payment status",
          DELETE: "Delete payment record"
        }
      },
      notices: {
        "/api/notices": {
          GET: {
            description: "Get notices",
            query: {
              type: "GENERAL | MAINTENANCE | PAYMENT_REMINDER | RULE_UPDATE | EVENT | EMERGENCY",
              priority: "LOW | MEDIUM | HIGH | URGENT",
              active: "boolean"
            }
          },
          POST: {
            description: "Create notice (Admin only)",
            body: {
              title: "string",
              content: "string",
              type: "GENERAL | MAINTENANCE | PAYMENT_REMINDER | RULE_UPDATE | EVENT | EMERGENCY",
              priority: "LOW | MEDIUM | HIGH | URGENT",
              targetRole: "ADMIN | STUDENT?"
            }
          }
        }
      },
      analytics: {
        "/api/analytics": {
          GET: {
            description: "Get dashboard analytics (Admin only)",
            query: {
              timeframe: "number (days)"
            },
            response: {
              overview: "Statistics summary",
              charts: "Chart data",
              alerts: "System alerts",
              recentActivities: "Recent activities"
            }
          }
        }
      },
      reports: {
        "/api/reports": {
          GET: {
            description: "Generate reports (Admin only)",
            query: {
              type: "revenue | occupancy | payments | students | bookings | overdue",
              format: "json | csv",
              startDate: "ISO date",
              endDate: "ISO date"
            }
          }
        }
      },
      bulk: {
        "/api/bulk": {
          POST: {
            description: "Bulk operations (Admin only)",
            body: {
              action: "delete_users | update_room_status | approve_bookings | cancel_bookings | mark_payments_paid | generate_rent_payments | send_payment_reminders",
              ids: "string[]",
              data: "object (action-specific data)"
            }
          }
        }
      },
      upload: {
        "/api/upload": {
          POST: {
            description: "File upload",
            body: "FormData with file, type, entityId",
            response: "File URL and metadata"
          },
          DELETE: {
            description: "Delete file",
            query: { fileUrl: "string" }
          }
        }
      },
      notifications: {
        "/api/notifications": {
          GET: {
            description: "Get user notifications",
            query: { unreadOnly: "boolean" }
          },
          POST: {
            description: "Send notification",
            body: {
              title: "string",
              message: "string",
              type: "string",
              targetUserId: "string?",
              targetRole: "string?"
            }
          },
          PUT: {
            description: "Update notification",
            body: {
              action: "mark_read | mark_all_read | delete | clear_all",
              notificationId: "string?"
            }
          }
        }
      }
    },
    authentication: {
      type: "Bearer Token (JWT)",
      header: "Authorization: Bearer <your-jwt-token>",
      login: "POST /api/auth/login to get token"
    },
    responses: {
      success: {
        success: true,
        data: "Response data"
      },
      error: {
        success: false,
        error: "Error message",
        statusCode: "HTTP status code"
      }
    },
    statusCodes: {
      200: "Success",
      201: "Created",
      400: "Bad Request",
      401: "Unauthorized",
      403: "Forbidden", 
      404: "Not Found",
      409: "Conflict",
      422: "Validation Error",
      500: "Internal Server Error"
    }
  }

  return createSuccessResponse(apiDocs)
}
