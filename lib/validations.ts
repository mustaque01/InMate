import { z } from 'zod'

// Authentication Schemas
export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['admin', 'student'], {
    required_error: 'Please select a role',
  }),
})

export const signupSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^\+?[\d\s\-\(\)]+$/, 'Please enter a valid phone number'),
  password: z.string().min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/\d/, 'Password must contain at least one number'),
  signupEmail: z.string().email('Please enter a valid email address'),
  signupPassword: z.string().min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/\d/, 'Password must contain at least one number'),
})

// Room Management Schemas
export const roomSchema = z.object({
  roomNumber: z.string().min(1, 'Room number is required')
    .regex(/^[A-Z]-\d+$/, 'Room number must be in format: A-101'),
  type: z.enum(['SINGLE', 'DOUBLE', 'TRIPLE', 'DORMITORY'], {
    required_error: 'Please select a room type',
  }),
  capacity: z.number().min(1, 'Capacity must be at least 1').max(10, 'Capacity cannot exceed 10'),
  floor: z.number().min(0, 'Floor must be 0 or higher').max(20, 'Floor cannot exceed 20'),
  block: z.string().min(1, 'Block is required').max(5, 'Block name too long'),
  monthlyRent: z.number().min(1000, 'Monthly rent must be at least ₹1000')
    .max(50000, 'Monthly rent cannot exceed ₹50000'),
  amenities: z.array(z.string()).optional(),
  description: z.string().max(500, 'Description cannot exceed 500 characters').optional(),
})

export const roomUpdateSchema = roomSchema.partial()

// Booking Schemas
export const bookingSchema = z.object({
  userId: z.string().optional(),
  roomId: z.string().min(1, 'Please select a room'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  monthlyRent: z.number().min(1000, 'Monthly rent must be at least ₹1000'),
  securityDeposit: z.number().min(0, 'Security deposit must be 0 or higher').optional(),
  notes: z.string().max(1000, 'Notes cannot exceed 1000 characters').optional(),
})

export const bookingUpdateSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'ACTIVE', 'COMPLETED', 'CANCELLED'], {
    required_error: 'Please select a status',
  }),
  notes: z.string().max(1000, 'Notes cannot exceed 1000 characters').optional(),
})

// Payment Schemas
export const paymentSchema = z.object({
  userId: z.string().min(1, 'User is required'),
  bookingId: z.string().optional(),
  amount: z.number().min(1, 'Amount must be greater than 0'),
  type: z.enum(['RENT', 'SECURITY_DEPOSIT', 'MAINTENANCE_FEE', 'LATE_FEE', 'OTHER'], {
    required_error: 'Please select a payment type',
  }),
  dueDate: z.string().min(1, 'Due date is required'),
  description: z.string().max(500, 'Description cannot exceed 500 characters').optional(),
})

export const paymentUpdateSchema = z.object({
  status: z.enum(['PENDING', 'PAID', 'OVERDUE', 'CANCELLED'], {
    required_error: 'Please select a status',
  }),
  method: z.string().max(50, 'Payment method too long').optional(),
  reference: z.string().max(100, 'Reference too long').optional(),
  paidDate: z.string().optional(),
})

// Notice Schemas
export const noticeSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters')
    .max(200, 'Title cannot exceed 200 characters'),
  content: z.string().min(10, 'Content must be at least 10 characters')
    .max(2000, 'Content cannot exceed 2000 characters'),
  type: z.enum(['GENERAL', 'MAINTENANCE', 'PAYMENT_REMINDER', 'RULE_UPDATE', 'EVENT', 'EMERGENCY'], {
    required_error: 'Please select a notice type',
  }),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT'], {
    required_error: 'Please select a priority level',
  }),
  targetRole: z.enum(['ADMIN', 'STUDENT']).optional(),
})

export const noticeUpdateSchema = noticeSchema.partial().extend({
  isActive: z.boolean().optional(),
})

// User Management Schemas
export const userSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters'),
  role: z.enum(['ADMIN', 'STUDENT'], {
    required_error: 'Please select a role',
  }),
  phone: z.string().regex(/^\+?[\d\s\-\(\)]+$/, 'Please enter a valid phone number').optional(),
  studentId: z.string().max(20, 'Student ID too long').optional(),
  course: z.string().max(100, 'Course name too long').optional(),
  year: z.number().min(1, 'Year must be at least 1').max(10, 'Year cannot exceed 10').optional(),
  guardianName: z.string().max(100, 'Guardian name too long').optional(),
  guardianPhone: z.string().regex(/^\+?[\d\s\-\(\)]+$/, 'Please enter a valid phone number').optional(),
  address: z.string().max(500, 'Address too long').optional(),
  emergencyContact: z.string().max(20, 'Emergency contact too long').optional(),
})

// Profile Update Schema
export const profileUpdateSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters'),
  phone: z.string().regex(/^\+?[\d\s\-\(\)]+$/, 'Please enter a valid phone number').optional(),
  course: z.string().max(100, 'Course name too long').optional(),
  year: z.number().min(1, 'Year must be at least 1').max(10, 'Year cannot exceed 10').optional(),
  guardianName: z.string().max(100, 'Guardian name too long').optional(),
  guardianPhone: z.string().regex(/^\+?[\d\s\-\(\)]+$/, 'Please enter a valid phone number').optional(),
  address: z.string().max(500, 'Address too long').optional(),
  emergencyContact: z.string().max(20, 'Emergency contact too long').optional(),
})

// Password Change Schema
export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/\d/, 'Password must contain at least one number'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

// Search and Filter Schemas
export const roomFilterSchema = z.object({
  status: z.enum(['AVAILABLE', 'OCCUPIED', 'MAINTENANCE', 'RESERVED']).optional(),
  type: z.enum(['SINGLE', 'DOUBLE', 'TRIPLE', 'DORMITORY']).optional(),
  block: z.string().max(5).optional(),
  minRent: z.number().min(0).optional(),
  maxRent: z.number().min(0).optional(),
})

export const userSearchSchema = z.object({
  search: z.string().max(100).optional(),
  role: z.enum(['ADMIN', 'STUDENT']).optional(),
  course: z.string().max(100).optional(),
})

export const paymentFilterSchema = z.object({
  status: z.enum(['PENDING', 'PAID', 'OVERDUE', 'CANCELLED']).optional(),
  type: z.enum(['RENT', 'SECURITY_DEPOSIT', 'MAINTENANCE_FEE', 'LATE_FEE', 'OTHER']).optional(),
  userId: z.string().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
})

export const bookingFilterSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'ACTIVE', 'COMPLETED', 'CANCELLED']).optional(),
  userId: z.string().optional(),
  roomId: z.string().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
})

// Type exports for use in components
export type LoginFormData = z.infer<typeof loginSchema>
export type SignupFormData = z.infer<typeof signupSchema>
export type RoomFormData = z.infer<typeof roomSchema>
export type BookingFormData = z.infer<typeof bookingSchema>
export type PaymentFormData = z.infer<typeof paymentSchema>
export type NoticeFormData = z.infer<typeof noticeSchema>
export type UserFormData = z.infer<typeof userSchema>
export type ProfileUpdateData = z.infer<typeof profileUpdateSchema>
export type ChangePasswordData = z.infer<typeof changePasswordSchema>
