// Shared types between frontend and backend

export type Role = 'ADMIN' | 'STUDENT'
export type RoomType = 'SINGLE' | 'DOUBLE' | 'TRIPLE' | 'DORMITORY'
export type RoomStatus = 'AVAILABLE' | 'OCCUPIED' | 'MAINTENANCE' | 'RESERVED'
export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED'
export type PaymentType = 'RENT' | 'SECURITY_DEPOSIT' | 'MAINTENANCE_FEE' | 'LATE_FEE' | 'OTHER'
export type PaymentStatus = 'PENDING' | 'PAID' | 'OVERDUE' | 'CANCELLED'
export type NoticeType = 'GENERAL' | 'MAINTENANCE' | 'PAYMENT_REMINDER' | 'RULE_UPDATE' | 'EVENT' | 'EMERGENCY'
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'

export interface User {
  id: string
  email: string
  name: string
  role: Role
  phone?: string
  studentId?: string
  roomNumber?: string
  course?: string
  year?: number
  guardianName?: string
  guardianPhone?: string
  address?: string
  emergencyContact?: string
  createdAt: string
  updatedAt: string
}

export interface Room {
  id: string
  roomNumber: string
  type: RoomType
  capacity: number
  currentOccupancy: number
  floor: number
  block: string
  monthlyRent: number
  amenities?: string
  status: RoomStatus
  description?: string
  createdAt: string
  updatedAt: string
}

export interface Booking {
  id: string
  userId: string
  roomId: string
  startDate: string
  endDate?: string
  status: BookingStatus
  monthlyRent: number
  securityDeposit?: number
  notes?: string
  createdAt: string
  updatedAt: string
  user?: User
  room?: Room
  payments?: Payment[]
}

export interface Payment {
  id: string
  userId: string
  bookingId?: string
  amount: number
  type: PaymentType
  status: PaymentStatus
  dueDate: string
  paidDate?: string
  method?: string
  reference?: string
  description?: string
  createdAt: string
  updatedAt: string
  user?: User
  booking?: Booking
}

export interface Notice {
  id: string
  title: string
  content: string
  type: NoticeType
  priority: Priority
  isActive: boolean
  createdById: string
  targetRole?: Role
  createdAt: string
  updatedAt: string
  createdBy?: User
}

// API Response Types
export interface ApiResponse<T = any> {
  data?: T
  error?: string
  message?: string
}

export interface LoginResponse {
  user: User
  token: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Form Types
export interface LoginForm {
  email: string
  password: string
  role: Role
}

export interface SignupForm {
  email: string
  password: string
  name: string
  role: Role
  phone?: string
  firstName?: string
  lastName?: string
}

export interface RoomForm {
  roomNumber: string
  type: RoomType
  capacity: number
  floor: number
  block: string
  monthlyRent: number
  amenities?: string[]
  description?: string
}

export interface BookingForm {
  userId?: string
  roomId: string
  startDate: string
  endDate?: string
  monthlyRent: number
  securityDeposit?: number
  notes?: string
}

export interface PaymentForm {
  userId: string
  bookingId?: string
  amount: number
  type: PaymentType
  dueDate: string
  description?: string
}

export interface NoticeForm {
  title: string
  content: string
  type: NoticeType
  priority: Priority
  targetRole?: Role
}

export interface UserForm {
  email: string
  name: string
  role: Role
  phone?: string
  studentId?: string
  course?: string
  year?: number
  guardianName?: string
  guardianPhone?: string
  address?: string
  emergencyContact?: string
}

// Dashboard Stats Types
export interface DashboardStats {
  totalRooms: number
  occupiedRooms: number
  totalStudents: number
  pendingBookings: number
  overduePayments: number
  totalRevenue: number
  monthlyRevenue: number
  recentBookings: Booking[]
  recentPayments: Payment[]
}

export interface StudentDashboardStats {
  currentBooking?: Booking
  pendingPayments: Payment[]
  recentNotices: Notice[]
  roomDetails?: Room
}
