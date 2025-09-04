import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory rate limiting (for production, use Redis or a database)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>()

const RATE_LIMIT = {
  MAX_REQUESTS: 100, // Maximum requests per window
  WINDOW_MS: 15 * 60 * 1000, // 15 minutes
}

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const userRecord = rateLimitMap.get(ip)

  if (!userRecord) {
    rateLimitMap.set(ip, { count: 1, timestamp: now })
    return false
  }

  // Reset count if window has passed
  if (now - userRecord.timestamp > RATE_LIMIT.WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, timestamp: now })
    return false
  }

  // Check if limit exceeded
  if (userRecord.count >= RATE_LIMIT.MAX_REQUESTS) {
    return true
  }

  // Increment count
  userRecord.count++
  return false
}

export function middleware(request: NextRequest) {
  // Get client IP
  const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? 'unknown'
  
  // Temporarily disable rate limiting for debugging
  console.log('Middleware: Processing request:', request.nextUrl.pathname)
  
  // Apply rate limiting to API routes (disabled for now)
  // if (request.nextUrl.pathname.startsWith('/api/')) {
  //   if (isRateLimited(ip)) {
  //     return new NextResponse(
  //       JSON.stringify({ error: 'Too many requests. Please try again later.' }),
  //       {
  //         status: 429,
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Retry-After': '900', // 15 minutes
  //         },
  //       }
  //     )
  //   }
  // }

  // Clone the response to add security headers
  const response = NextResponse.next()

  // Security headers
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains'
  )
  
  // Content Security Policy
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self';"
  )

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
