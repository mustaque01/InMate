"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { apiClient } from "@/lib/api-client"
import { User } from "@/lib/types"

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, role: "admin" | "student") => Promise<void>
  logout: () => void
  isLoading: boolean
  error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check for stored auth data on mount
    const checkAuth = () => {
      const storedUser = localStorage.getItem("hostel-user")
      const token = localStorage.getItem("hostel-token")
      
      if (storedUser && token) {
        try {
          const userData = JSON.parse(storedUser)
          setUser(userData)
          apiClient.setToken(token)
        } catch (error) {
          // Invalid stored data, clear it
          localStorage.removeItem("hostel-user")
          localStorage.removeItem("hostel-token")
          apiClient.setToken(null)
        }
      }
      setIsLoading(false)
    }
    
    checkAuth()
  }, [])

  const login = async (email: string, password: string, role: "admin" | "student") => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await apiClient.login(email, password, role)
      
      setUser(response.user)
      localStorage.setItem("hostel-user", JSON.stringify(response.user))
      
    } catch (error: any) {
      const errorMessage = error.message || 'Login failed. Please try again.'
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      await apiClient.logout()
    } catch (error) {
      // Even if logout fails on server, clear local state
      console.error('Logout error:', error)
    } finally {
      setUser(null)
      localStorage.removeItem("hostel-user")
      localStorage.removeItem("hostel-token")
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
