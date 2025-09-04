"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function SimpleLoginPage() {
  const [email, setEmail] = useState('admin@hostel.com')
  const [password, setPassword] = useState('admin123')
  const [role, setRole] = useState('admin')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const router = useRouter()

  const handleLogin = async () => {
    setLoading(true)
    setResult(null)
    
    try {
      console.log('Attempting login with:', { email, role })
      
      // Test API connectivity first
      const testResponse = await fetch('/api/test')
      console.log('API test response:', testResponse.status)
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role })
      })
      
      console.log('Login response status:', response.status)
      console.log('Login response headers:', Object.fromEntries(response.headers.entries()))
      
      const data = await response.json()
      console.log('Login response data:', data)
      
      if (response.ok) {
        // Store token and user data
        localStorage.setItem('hostel-token', data.token)
        localStorage.setItem('hostel-user', JSON.stringify(data.user))
        
        setResult({ success: true, data })
        
        // Redirect after a short delay
        setTimeout(() => {
          if (role === 'admin') {
            router.push('/admin/dashboard')
          } else {
            router.push('/student/dashboard')
          }
        }, 1000)
      } else {
        setResult({ success: false, error: data.error || 'Login failed' })
      }
      
    } catch (error: any) {
      console.error('Login error:', error)
      setResult({ success: false, error: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Simple Login Test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Role</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="admin">Admin</option>
              <option value="student">Student</option>
            </select>
          </div>

          <Button 
            onClick={handleLogin} 
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>

          {result && (
            <div className="mt-4">
              {result.success ? (
                <Alert>
                  <AlertDescription>
                    ✅ Login successful! Redirecting...
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert variant="destructive">
                  <AlertDescription>
                    ❌ Error: {result.error}
                  </AlertDescription>
                </Alert>
              )}
              
              <details className="mt-4">
                <summary className="cursor-pointer text-sm font-medium">Raw Response</summary>
                <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </details>
            </div>
          )}

          <div className="text-xs text-gray-500 space-y-1">
            <p><strong>Test Admin:</strong> admin@hostel.com / admin123</p>
            <p><strong>Test Student:</strong> john.doe@student.com / student123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
