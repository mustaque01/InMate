import { ApiResponse, LoginResponse, User, Room, Booking, Payment, Notice, DashboardStats } from './types'

class ApiClient {
  private baseUrl: string
  private token: string | null = null

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' ? window.location.origin : '')
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('hostel-token')
    }
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }
    
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`
    }
    
    return headers
  }

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}/api${endpoint}`
    
    const config: RequestInit = {
      headers: this.getHeaders(),
      ...options,
    }

    try {
      console.log(`Making API request to: ${url}`, config)
      const response = await fetch(url, config)
      
      console.log(`API Response status: ${response.status}`)
      
      let data
      try {
        data = await response.json()
        console.log(`API Response data:`, data)
      } catch (parseError) {
        console.error('Failed to parse response as JSON:', parseError)
        throw new Error(`Invalid response format. Status: ${response.status}`)
      }

      if (!response.ok) {
        const errorMessage = data.error || `HTTP error! status: ${response.status}`
        console.error(`API Error - Status: ${response.status}, Message: ${errorMessage}`)
        throw new Error(errorMessage)
      }

      return data
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error)
      throw error
    }
  }

  setToken(token: string | null) {
    this.token = token
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('hostel-token', token)
      } else {
        localStorage.removeItem('hostel-token')
      }
    }
  }

  // Authentication
  async login(email: string, password: string, role: string): Promise<LoginResponse> {
    const response = await this.request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, role }),
    })
    
    if (response.token) {
      this.setToken(response.token)
    }
    
    return response
  }

  async signup(userData: {
    email: string
    password: string
    name: string
    role: string
    phone?: string
    firstName?: string
    lastName?: string
  }): Promise<{ user: User }> {
    return this.request<{ user: User }>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  }

  async getCurrentUser(): Promise<{ user: User }> {
    return this.request<{ user: User }>('/auth/me')
  }

  async logout(): Promise<void> {
    this.setToken(null)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('hostel-user')
    }
  }

  // Rooms
  async getRooms(params?: {
    status?: string
    type?: string
    block?: string
  }): Promise<{ rooms: Room[] }> {
    const searchParams = new URLSearchParams()
    if (params?.status) searchParams.append('status', params.status)
    if (params?.type) searchParams.append('type', params.type)
    if (params?.block) searchParams.append('block', params.block)
    
    const query = searchParams.toString()
    return this.request<{ rooms: Room[] }>(`/rooms${query ? `?${query}` : ''}`)
  }

  async getRoom(id: string): Promise<{ room: Room }> {
    return this.request<{ room: Room }>(`/rooms/${id}`)
  }

  async createRoom(roomData: {
    roomNumber: string
    type: string
    capacity: number
    floor: number
    block: string
    monthlyRent: number
    amenities?: string[]
    description?: string
  }): Promise<{ room: Room }> {
    return this.request<{ room: Room }>('/rooms', {
      method: 'POST',
      body: JSON.stringify(roomData),
    })
  }

  async updateRoom(id: string, updates: Partial<Room>): Promise<{ room: Room }> {
    return this.request<{ room: Room }>(`/rooms/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    })
  }

  async deleteRoom(id: string): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/rooms/${id}`, {
      method: 'DELETE',
    })
  }

  // Bookings
  async getBookings(params?: {
    status?: string
    userId?: string
  }): Promise<{ bookings: Booking[] }> {
    const searchParams = new URLSearchParams()
    if (params?.status) searchParams.append('status', params.status)
    if (params?.userId) searchParams.append('userId', params.userId)
    
    const query = searchParams.toString()
    return this.request<{ bookings: Booking[] }>(`/bookings${query ? `?${query}` : ''}`)
  }

  async getBooking(id: string): Promise<{ booking: Booking }> {
    return this.request<{ booking: Booking }>(`/bookings/${id}`)
  }

  async createBooking(bookingData: {
    userId?: string
    roomId: string
    startDate: string
    endDate?: string
    monthlyRent: number
    securityDeposit?: number
    notes?: string
  }): Promise<{ booking: Booking }> {
    return this.request<{ booking: Booking }>('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    })
  }

  async updateBooking(id: string, updates: {
    status?: string
    notes?: string
  }): Promise<{ booking: Booking }> {
    return this.request<{ booking: Booking }>(`/bookings/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    })
  }

  async deleteBooking(id: string): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/bookings/${id}`, {
      method: 'DELETE',
    })
  }

  // Payments
  async getPayments(params?: {
    status?: string
    type?: string
    userId?: string
  }): Promise<{ payments: Payment[] }> {
    const searchParams = new URLSearchParams()
    if (params?.status) searchParams.append('status', params.status)
    if (params?.type) searchParams.append('type', params.type)
    if (params?.userId) searchParams.append('userId', params.userId)
    
    const query = searchParams.toString()
    return this.request<{ payments: Payment[] }>(`/payments${query ? `?${query}` : ''}`)
  }

  async getPayment(id: string): Promise<{ payment: Payment }> {
    return this.request<{ payment: Payment }>(`/payments/${id}`)
  }

  async createPayment(paymentData: {
    userId: string
    bookingId?: string
    amount: number
    type: string
    dueDate: string
    description?: string
  }): Promise<{ payment: Payment }> {
    return this.request<{ payment: Payment }>('/payments', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    })
  }

  async updatePayment(id: string, updates: {
    status?: string
    method?: string
    reference?: string
    paidDate?: string
  }): Promise<{ payment: Payment }> {
    return this.request<{ payment: Payment }>(`/payments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    })
  }

  async deletePayment(id: string): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/payments/${id}`, {
      method: 'DELETE',
    })
  }

  // Notices
  async getNotices(params?: {
    type?: string
    priority?: string
    isActive?: boolean
  }): Promise<{ notices: Notice[] }> {
    const searchParams = new URLSearchParams()
    if (params?.type) searchParams.append('type', params.type)
    if (params?.priority) searchParams.append('priority', params.priority)
    if (params?.isActive !== undefined) searchParams.append('isActive', params.isActive.toString())
    
    const query = searchParams.toString()
    return this.request<{ notices: Notice[] }>(`/notices${query ? `?${query}` : ''}`)
  }

  async getNotice(id: string): Promise<{ notice: Notice }> {
    return this.request<{ notice: Notice }>(`/notices/${id}`)
  }

  async createNotice(noticeData: {
    title: string
    content: string
    type?: string
    priority?: string
    targetRole?: string
  }): Promise<{ notice: Notice }> {
    return this.request<{ notice: Notice }>('/notices', {
      method: 'POST',
      body: JSON.stringify(noticeData),
    })
  }

  async updateNotice(id: string, updates: Partial<Notice>): Promise<{ notice: Notice }> {
    return this.request<{ notice: Notice }>(`/notices/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    })
  }

  async deleteNotice(id: string): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/notices/${id}`, {
      method: 'DELETE',
    })
  }

  // Users
  async getUsers(params?: {
    role?: string
    search?: string
  }): Promise<{ users: User[] }> {
    const searchParams = new URLSearchParams()
    if (params?.role) searchParams.append('role', params.role)
    if (params?.search) searchParams.append('search', params.search)
    
    const query = searchParams.toString()
    return this.request<{ users: User[] }>(`/users${query ? `?${query}` : ''}`)
  }

  async createUser(userData: {
    email: string
    name: string
    role: string
    phone?: string
    studentId?: string
    course?: string
    year?: number
    guardianName?: string
    guardianPhone?: string
    address?: string
    emergencyContact?: string
  }): Promise<{ user: User; message: string }> {
    return this.request<{ user: User; message: string }>('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  }
}

// Singleton instance
export const apiClient = new ApiClient()
export default apiClient
