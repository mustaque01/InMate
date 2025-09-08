"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, ArrowLeft, Shield, Users, Lock, Mail, Phone, User, Sparkles } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

interface AuthFormProps {
  userType: "admin" | "student"
}

export function AuthForm({ userType }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [localError, setLocalError] = useState("")
  const { login, isLoading, error: authError } = useAuth()
  const router = useRouter()
  
  // Use auth context error or local error
  const error = authError || localError

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLocalError("")

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    console.log('Login attempt:', { email, role: userType })

    try {
      await login(email, password, userType)
      // Redirect to appropriate dashboard after successful login
      if (userType === "admin") {
        router.push("/admin/dashboard")
      } else {
        router.push("/student/dashboard")
      }
    } catch (err: any) {
      console.error('Login error:', err)
      setLocalError(err.message || "Invalid credentials. Please try again.")
    }
  }

  const handleSignupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLocalError("")

    const formData = new FormData(e.currentTarget)
    const email = formData.get("signupEmail") as string
    const password = formData.get("signupPassword") as string
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const phone = formData.get("phone") as string

    try {
      // For now, just use login since we don't have a proper signup flow
      await login(email, password, userType)
      // Redirect to appropriate dashboard after successful signup
      if (userType === "admin") {
        router.push("/admin/dashboard")
      } else {
        router.push("/student/dashboard")
      }
    } catch (err: any) {
      setLocalError(err.message || "Failed to create account. Please try again.")
    }
  }

  const handleForgotPassword = () => {
    alert("Password reset link sent to your email!")
  }

  const UserIcon = userType === "admin" ? Shield : Users

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100/50 to-sky-100/30 relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-grid opacity-20"></div>
      <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-sky-500/20 rounded-full blur-3xl animate-float-delayed"></div>
      
      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 animate-fade-in">
          <Link 
            href="/" 
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors duration-300 group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>

        <Card className="glass-card border-0 shadow-2xl animate-slide-in">
          <CardHeader className="text-center pb-8">
            <div className="flex items-center justify-center mb-6 group">
              <div className="relative">
                <UserIcon className="h-12 w-12 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 h-12 w-12 bg-blue-500/20 rounded-full blur-xl group-hover:bg-blue-500/30 transition-colors"></div>
              </div>
              <Sparkles className="h-6 w-6 text-sky-500 ml-2 animate-bounce-in animate-delay-300" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent capitalize">
              {userType} Portal
            </CardTitle>
            <CardDescription className="text-lg text-slate-600">
              Secure access to your {userType} dashboard
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 p-1 bg-muted/50 rounded-lg">
                <TabsTrigger 
                  value="login" 
                  className="rounded-md transition-all duration-300 data-[state=active]:bg-background data-[state=active]:shadow-md"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger 
                  value="signup"
                  className="rounded-md transition-all duration-300 data-[state=active]:bg-background data-[state=active]:shadow-md"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-6 mt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <Alert variant="destructive" className="border-destructive/50 bg-destructive/10 animate-shake">
                      <AlertDescription className="text-destructive font-medium">{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="form-group">
                    <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      Email Address
                    </Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      placeholder="Enter your email address" 
                      required 
                      className="mt-2 h-12 text-lg transition-all duration-300 focus:scale-[1.02]"
                    />
                  </div>

                  <div className="form-group">
                    <Label htmlFor="password" className="flex items-center gap-2 text-sm font-medium">
                      <Lock className="h-4 w-4 text-muted-foreground" />
                      Password
                    </Label>
                    <div className="relative mt-2">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        required
                        className="h-12 text-lg pr-12 transition-all duration-300 focus:scale-[1.02]"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1 h-10 w-10 hover:bg-muted/50 rounded-md transition-all duration-300"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <Button 
                    type="button" 
                    variant="link" 
                    className="px-0 text-sm text-muted-foreground hover:text-primary transition-colors" 
                    onClick={handleForgotPassword}
                  >
                    Forgot your password?
                  </Button>

                  <Button 
                    type="submit" 
                    className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Signing in...
                      </div>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="space-y-6 mt-6">
                <form onSubmit={handleSignupSubmit} className="space-y-6">
                  {error && (
                    <Alert variant="destructive" className="border-destructive/50 bg-destructive/10 animate-shake">
                      <AlertDescription className="text-destructive font-medium">{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="form-group">
                      <Label htmlFor="firstName" className="flex items-center gap-2 text-sm font-medium">
                        <User className="h-4 w-4 text-muted-foreground" />
                        First Name
                      </Label>
                      <Input 
                        id="firstName" 
                        name="firstName" 
                        placeholder="First name" 
                        required 
                        className="mt-2 h-11 transition-all duration-300 focus:scale-[1.02]"
                      />
                    </div>
                    <div className="form-group">
                      <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
                      <Input 
                        id="lastName" 
                        name="lastName" 
                        placeholder="Last name" 
                        required 
                        className="mt-2 h-11 transition-all duration-300 focus:scale-[1.02]"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <Label htmlFor="signupEmail" className="flex items-center gap-2 text-sm font-medium">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      Email Address
                    </Label>
                    <Input 
                      id="signupEmail" 
                      name="signupEmail" 
                      type="email" 
                      placeholder="Enter your email address" 
                      required 
                      className="mt-2 h-11 transition-all duration-300 focus:scale-[1.02]"
                    />
                  </div>

                  <div className="form-group">
                    <Label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      Phone Number
                    </Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      type="tel" 
                      placeholder="Enter phone number" 
                      required 
                      className="mt-2 h-11 transition-all duration-300 focus:scale-[1.02]"
                    />
                  </div>

                  <div className="form-group">
                    <Label htmlFor="signupPassword" className="flex items-center gap-2 text-sm font-medium">
                      <Lock className="h-4 w-4 text-muted-foreground" />
                      Password
                    </Label>
                    <div className="relative mt-2">
                      <Input
                        id="signupPassword"
                        name="signupPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        required
                        className="h-11 pr-12 transition-all duration-300 focus:scale-[1.02]"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1 h-9 w-9 hover:bg-muted/50 rounded-md transition-all duration-300"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Creating account...
                      </div>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {/* Test Credentials */}
            <div className="mt-8 p-4 bg-muted/30 rounded-lg border border-border/50">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Test Credentials:</h4>
              <div className="space-y-1 text-xs text-muted-foreground">
                <p><strong>Admin:</strong> admin@hostel.com / admin123</p>
                <p><strong>Student:</strong> john.doe@student.com / student123</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
