import { useState, useEffect, useCallback } from 'react'
import { apiClient } from '@/lib/api-client'
import { User, Room, Booking, Payment, Notice, DashboardStats, StudentDashboardStats } from '@/lib/types'

interface UseApiState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

interface UseApiReturn<T> extends UseApiState<T> {
  refetch: () => Promise<void>
  mutate: (newData: T) => void
}

function useApi<T>(
  fetcher: () => Promise<T>,
  deps: any[] = []
): UseApiReturn<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: true,
    error: null,
  })

  const fetchData = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }))
    
    try {
      const data = await fetcher()
      setState({ data, loading: false, error: null })
    } catch (error) {
      setState({ 
        data: null, 
        loading: false, 
        error: error instanceof Error ? error : new Error('Unknown error') 
      })
    }
  }, [fetcher])

  useEffect(() => {
    fetchData()
  }, deps)

  const mutate = useCallback((newData: T) => {
    setState(prev => ({ ...prev, data: newData }))
  }, [])

  return {
    ...state,
    refetch: fetchData,
    mutate,
  }
}

// Dashboard hooks
export function useDashboardStats() {
  return useApi(async () => {
    const response = await fetch('/api/dashboard', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('hostel-token')}`,
      },
    })
    if (!response.ok) throw new Error('Failed to fetch dashboard stats')
    const data = await response.json()
    return data.stats
  })
}

// Rooms hooks
export function useRooms(filters?: {
  status?: string
  type?: string
  block?: string
}) {
  return useApi(() => apiClient.getRooms(filters).then(res => res.rooms), [filters])
}

export function useRoom(id: string) {
  return useApi(() => apiClient.getRoom(id).then(res => res.room), [id])
}

// Bookings hooks
export function useBookings(filters?: {
  status?: string
  userId?: string
}) {
  return useApi(() => apiClient.getBookings(filters).then(res => res.bookings), [filters])
}

export function useBooking(id: string) {
  return useApi(() => apiClient.getBooking(id).then(res => res.booking), [id])
}

// Payments hooks
export function usePayments(filters?: {
  status?: string
  type?: string
  userId?: string
}) {
  return useApi(() => apiClient.getPayments(filters).then(res => res.payments), [filters])
}

export function usePayment(id: string) {
  return useApi(() => apiClient.getPayment(id).then(res => res.payment), [id])
}

// Notices hooks
export function useNotices(filters?: {
  type?: string
  priority?: string
  isActive?: boolean
}) {
  return useApi(() => apiClient.getNotices(filters).then(res => res.notices), [filters])
}

export function useNotice(id: string) {
  return useApi(() => apiClient.getNotice(id).then(res => res.notice), [id])
}

// Users hooks
export function useUsers(filters?: {
  role?: string
  search?: string
}) {
  return useApi(() => apiClient.getUsers(filters).then(res => res.users), [filters])
}

// Mutation hooks for creating/updating data
export function useCreateRoom() {
  const [state, setState] = useState({
    loading: false,
    error: null as Error | null,
  })

  const createRoom = useCallback(async (roomData: {
    roomNumber: string
    type: string
    capacity: number
    floor: number
    block: string
    monthlyRent: number
    amenities?: string[]
    description?: string
  }) => {
    setState({ loading: true, error: null })
    
    try {
      const response = await apiClient.createRoom(roomData)
      setState({ loading: false, error: null })
      return response.room
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Unknown error')
      setState({ loading: false, error: err })
      throw err
    }
  }, [])

  return {
    createRoom,
    loading: state.loading,
    error: state.error,
  }
}

export function useUpdateRoom() {
  const [state, setState] = useState({
    loading: false,
    error: null as Error | null,
  })

  const updateRoom = useCallback(async (id: string, updates: Partial<Room>) => {
    setState({ loading: true, error: null })
    
    try {
      const response = await apiClient.updateRoom(id, updates)
      setState({ loading: false, error: null })
      return response.room
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Unknown error')
      setState({ loading: false, error: err })
      throw err
    }
  }, [])

  return {
    updateRoom,
    loading: state.loading,
    error: state.error,
  }
}

export function useCreateBooking() {
  const [state, setState] = useState({
    loading: false,
    error: null as Error | null,
  })

  const createBooking = useCallback(async (bookingData: {
    userId?: string
    roomId: string
    startDate: string
    endDate?: string
    monthlyRent: number
    securityDeposit?: number
    notes?: string
  }) => {
    setState({ loading: true, error: null })
    
    try {
      const response = await apiClient.createBooking(bookingData)
      setState({ loading: false, error: null })
      return response.booking
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Unknown error')
      setState({ loading: false, error: err })
      throw err
    }
  }, [])

  return {
    createBooking,
    loading: state.loading,
    error: state.error,
  }
}

export function useUpdateBooking() {
  const [state, setState] = useState({
    loading: false,
    error: null as Error | null,
  })

  const updateBooking = useCallback(async (id: string, updates: {
    status?: string
    notes?: string
  }) => {
    setState({ loading: true, error: null })
    
    try {
      const response = await apiClient.updateBooking(id, updates)
      setState({ loading: false, error: null })
      return response.booking
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Unknown error')
      setState({ loading: false, error: err })
      throw err
    }
  }, [])

  return {
    updateBooking,
    loading: state.loading,
    error: state.error,
  }
}

export function useCreatePayment() {
  const [state, setState] = useState({
    loading: false,
    error: null as Error | null,
  })

  const createPayment = useCallback(async (paymentData: {
    userId: string
    bookingId?: string
    amount: number
    type: string
    dueDate: string
    description?: string
  }) => {
    setState({ loading: true, error: null })
    
    try {
      const response = await apiClient.createPayment(paymentData)
      setState({ loading: false, error: null })
      return response.payment
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Unknown error')
      setState({ loading: false, error: err })
      throw err
    }
  }, [])

  return {
    createPayment,
    loading: state.loading,
    error: state.error,
  }
}

export function useCreateNotice() {
  const [state, setState] = useState({
    loading: false,
    error: null as Error | null,
  })

  const createNotice = useCallback(async (noticeData: {
    title: string
    content: string
    type?: string
    priority?: string
    targetRole?: string
  }) => {
    setState({ loading: true, error: null })
    
    try {
      const response = await apiClient.createNotice(noticeData)
      setState({ loading: false, error: null })
      return response.notice
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Unknown error')
      setState({ loading: false, error: err })
      throw err
    }
  }, [])

  return {
    createNotice,
    loading: state.loading,
    error: state.error,
  }
}
