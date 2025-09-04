# InMate - Hostel Management API Documentation

## Overview

Your InMate project has been upgraded to a full-stack application with a complete backend API and SQLite database. The system now includes:

- **Authentication & Authorization** with JWT tokens
- **Database** with Prisma ORM and SQLite
- **REST API** with Next.js App Router API routes
- **Role-based access control** (Admin & Student)

## Database Schema

### Users
- Stores both admin and student accounts
- Password hashing with bcryptjs
- Role-based access (ADMIN/STUDENT)
- Student-specific fields (studentId, course, year, guardian details)

### Rooms
- Room management with different types (SINGLE, DOUBLE, TRIPLE, DORMITORY)
- Capacity tracking and occupancy management
- Amenities stored as JSON strings
- Status management (AVAILABLE, OCCUPIED, MAINTENANCE, RESERVED)

### Bookings
- Room booking system with status tracking
- Links users to rooms with date ranges
- Automatic room occupancy updates
- Status flow: PENDING → CONFIRMED → ACTIVE → COMPLETED

### Payments
- Payment tracking with different types (RENT, SECURITY_DEPOSIT, etc.)
- Due date management and status tracking
- Integration with booking system

### Notices
- Admin-created announcements
- Role-based targeting (admin can target specific roles)
- Priority levels and categorization

## API Endpoints

### Authentication

#### POST `/api/auth/login`
Login with email, password, and role.

**Request:**
```json
{
  "email": "admin@hostel.com",
  "password": "admin123",
  "role": "admin"
}
```

**Response:**
```json
{
  "user": {
    "id": "user_id",
    "email": "admin@hostel.com",
    "name": "System Administrator",
    "role": "ADMIN"
  },
  "token": "jwt_token_here"
}
```

#### POST `/api/auth/signup`
Create a new user account.

**Request:**
```json
{
  "email": "new.user@example.com",
  "password": "password123",
  "name": "New User",
  "role": "student",
  "phone": "+1234567890"
}
```

#### GET `/api/auth/me`
Get current user profile (requires Authorization header).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

### Rooms

#### GET `/api/rooms`
List all rooms with optional filters.

**Query Parameters:**
- `status`: Filter by room status (AVAILABLE, OCCUPIED, etc.)
- `type`: Filter by room type (SINGLE, DOUBLE, etc.)
- `block`: Filter by building block

#### POST `/api/rooms` (Admin only)
Create a new room.

**Request:**
```json
{
  "roomNumber": "A-103",
  "type": "SINGLE",
  "capacity": 1,
  "floor": 1,
  "block": "A",
  "monthlyRent": 5000,
  "amenities": ["Wi-Fi", "Attached Bathroom"],
  "description": "Single room with attached bathroom"
}
```

#### GET `/api/rooms/[id]`
Get room details by ID.

#### PUT `/api/rooms/[id]` (Admin only)
Update room details.

#### DELETE `/api/rooms/[id]` (Admin only)
Delete a room (only if no active bookings).

### Bookings

#### GET `/api/bookings`
List bookings (students see only their own, admins see all).

**Query Parameters:**
- `status`: Filter by booking status
- `userId`: Admin can filter by specific user

#### POST `/api/bookings`
Create a new booking.

**Request:**
```json
{
  "roomId": "room_id",
  "startDate": "2024-01-15T00:00:00Z",
  "endDate": null,
  "monthlyRent": 5000,
  "securityDeposit": 10000,
  "notes": "Special requirements"
}
```

#### GET `/api/bookings/[id]`
Get booking details.

#### PUT `/api/bookings/[id]` (Admin only)
Update booking status.

**Request:**
```json
{
  "status": "CONFIRMED",
  "notes": "Approved by admin"
}
```

#### DELETE `/api/bookings/[id]`
Cancel/delete booking (students can only cancel PENDING bookings).

### Payments

#### GET `/api/payments`
List payments (students see only their own).

**Query Parameters:**
- `status`: Filter by payment status (PENDING, PAID, OVERDUE)
- `type`: Filter by payment type (RENT, SECURITY_DEPOSIT, etc.)
- `userId`: Admin can filter by user

#### POST `/api/payments` (Admin only)
Create a new payment record.

**Request:**
```json
{
  "userId": "user_id",
  "bookingId": "booking_id",
  "amount": 5000,
  "type": "RENT",
  "dueDate": "2024-02-05T00:00:00Z",
  "description": "Monthly rent for February 2024"
}
```

#### GET `/api/payments/[id]`
Get payment details.

#### PUT `/api/payments/[id]` (Admin only)
Update payment status.

**Request:**
```json
{
  "status": "PAID",
  "method": "upi",
  "reference": "TXN123456789",
  "paidDate": "2024-02-03T10:30:00Z"
}
```

### Notices

#### GET `/api/notices`
List notices (students see only active notices targeted at them).

**Query Parameters:**
- `type`: Filter by notice type
- `priority`: Filter by priority level
- `isActive`: Admin can filter by active status

#### POST `/api/notices` (Admin only)
Create a new notice.

**Request:**
```json
{
  "title": "Maintenance Notice",
  "content": "Water supply will be interrupted tomorrow.",
  "type": "MAINTENANCE",
  "priority": "HIGH",
  "targetRole": "STUDENT"
}
```

#### GET `/api/notices/[id]`
Get notice details.

#### PUT `/api/notices/[id]` (Admin only)
Update notice.

#### DELETE `/api/notices/[id]` (Admin only)
Delete notice.

### Users

#### GET `/api/users` (Admin only)
List all users.

**Query Parameters:**
- `role`: Filter by role (ADMIN/STUDENT)
- `search`: Search by name, email, or student ID

#### POST `/api/users` (Admin only)
Create a new user.

**Request:**
```json
{
  "email": "student@example.com",
  "name": "New Student",
  "role": "STUDENT",
  "phone": "+1234567890",
  "studentId": "STU002",
  "course": "Engineering",
  "year": 1,
  "guardianName": "Parent Name",
  "guardianPhone": "+0987654321"
}
```

## Getting Started

### 1. Database Setup
```bash
# Generate Prisma client
npm run db:generate

# Create database and tables
npm run db:push

# Seed initial data
npx prisma db seed
```

### 2. Environment Configuration
Update `.env` file with your configuration:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-change-this-too"
```

### 3. Start the Application
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### 4. Default Accounts
After running the seed script, you'll have:

**Admin Account:**
- Email: `admin@hostel.com`
- Password: `admin123`

**Sample Student Account:**
- Email: `john.doe@student.com`
- Password: `student123`

## Usage with Frontend

### Authentication Flow
1. Use the login API to get a JWT token
2. Store the token in localStorage or secure storage
3. Include the token in the Authorization header for all API requests:
   ```javascript
   headers: {
     'Authorization': `Bearer ${token}`,
     'Content-Type': 'application/json'
   }
   ```

### Update Auth Context
Your existing auth context in `contexts/auth-context.tsx` needs to be updated to use the real API endpoints instead of mock data.

Example update for the login function:
```typescript
const login = async (email: string, password: string, role: "admin" | "student") => {
  setIsLoading(true)
  
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role })
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error || 'Login failed')
    }
    
    setUser(data.user)
    localStorage.setItem('hostel-token', data.token)
    localStorage.setItem('hostel-user', JSON.stringify(data.user))
  } catch (error) {
    throw error
  } finally {
    setIsLoading(false)
  }
}
```

## Database Management

### View Database
```bash
# Open Prisma Studio to view/edit data
npm run db:studio
```

### Reset Database
```bash
# Reset database and run migrations
npm run db:push -- --force-reset

# Re-seed data
npx prisma db seed
```

## Security Features

- **Password hashing** with bcryptjs
- **JWT authentication** with 7-day expiration
- **Role-based authorization** on all endpoints
- **Input validation** with proper error handling
- **SQL injection prevention** through Prisma ORM

## Next Steps

1. **Update Frontend Components**: Modify your existing components to use the real API endpoints
2. **Error Handling**: Implement proper error handling in your frontend
3. **Loading States**: Add loading states for API calls
4. **Form Validation**: Add client-side validation with your existing form libraries
5. **Real-time Updates**: Consider adding WebSocket support for real-time notifications
6. **File Upload**: Add support for profile pictures and document uploads
7. **Email Integration**: Add email notifications for bookings and payments

Your hostel management system is now a complete full-stack application ready for production deployment!
