"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Eye, EyeOff, Lock, Mail, Shield, Users, Sparkles, LogIn, UserPlus, AlertTriangle, User, Phone } from "lucide-react"
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/50 to-purple-50/30 relative overflow-hidden flex items-center justify-center p-4">
      {/* Premium animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-indigo-500/5 to-purple-500/5"></div>
      <div className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl animate-float-delayed"></div>
      <div className="absolute inset-0 bg-gradient-mesh opacity-5 animate-gradient"></div>
      
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

        <Card className="glass-card border-0 shadow-2xl animate-slide-in backdrop-blur-xl">
          <CardHeader className="text-center pb-10">
            <div className="flex items-center justify-center mb-8 group">
              <div className="relative">
                <div className="relative">
                  <UserIcon className="h-16 w-16 text-indigo-600 group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 h-16 w-16 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-full blur-xl group-hover:from-indigo-500/40 group-hover:to-purple-500/40 transition-all duration-500"></div>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full animate-pulse"></div>
              </div>
              <div className="relative ml-4">
                <Sparkles className="h-8 w-8 text-purple-500 animate-bounce-in animate-delay-300" />
                <div className="absolute inset-0 h-8 w-8 bg-purple-500/30 rounded-full blur-lg animate-pulse"></div>
              </div>
            </div>
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent capitalize mb-3">
              {userType} Portal
            </CardTitle>
            <CardDescription className="text-lg text-slate-600 leading-relaxed">
              Secure enterprise-grade access to your {userType} dashboard
            </CardDescription>
            <div className="mt-4 inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full text-sm font-medium text-indigo-800">
              <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mr-2 animate-pulse"></div>
              Protected by Enterprise Security
            </div>
          </CardHeader>
          
          <CardContent className="px-10 pb-10">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 p-2 bg-gradient-to-r from-indigo-100/50 to-purple-100/50 backdrop-blur-sm rounded-xl border-0 shadow-inner">
                <TabsTrigger 
                  value="login" 
                  className="rounded-lg transition-all duration-500 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 font-semibold text-base py-3"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </TabsTrigger>
                <TabsTrigger 
                  value="signup"
                  className="rounded-lg transition-all duration-500 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 font-semibold text-base py-3"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-8 mt-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {error && (
                    <Alert variant="destructive" className="border-red-200 bg-gradient-to-r from-red-50 to-pink-50 animate-shake shadow-lg">
                      <AlertTriangle className="h-5 w-5" />
                      <AlertDescription className="text-red-700 font-medium text-base">{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="form-group group">
                    <Label htmlFor="email" className="flex items-center gap-3 text-base font-semibold text-slate-700 mb-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                      <Mail className="h-5 w-5 text-indigo-500 group-hover:text-purple-500 transition-colors duration-300" />
                      Email Address
                      <div className="ml-auto w-1 h-1 bg-purple-500 rounded-full animate-pulse"></div>
                    </Label>
                    <div className="relative">
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        placeholder="Enter your enterprise email address" 
                        required 
                        className="premium-input text-lg py-6 pl-14 pr-6 border-0 bg-gradient-to-r from-white to-indigo-50/50 backdrop-blur-sm shadow-inner focus:from-indigo-50 focus:to-purple-50 transition-all duration-500 group-hover:from-indigo-50/70 group-hover:to-purple-50/70"
                      />
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center">
                        <Mail className="h-6 w-6 text-indigo-500 group-hover:text-purple-500 transition-colors duration-300" />
                        <div className="w-1 h-8 bg-gradient-to-b from-indigo-300 to-purple-300 ml-2 rounded-full opacity-60"></div>
                      </div>
                    </div>
                  </div>

                  <div className="form-group group">
                    <Label htmlFor="password" className="flex items-center gap-3 text-base font-semibold text-slate-700 mb-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"></div>
                      <Lock className="h-5 w-5 text-purple-500 group-hover:text-indigo-500 transition-colors duration-300" />
                      Password
                      <div className="ml-auto w-1 h-1 bg-indigo-500 rounded-full animate-pulse"></div>
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your secure password"
                        required
                        className="premium-input text-lg py-6 pl-14 pr-16 border-0 bg-gradient-to-r from-white to-purple-50/50 backdrop-blur-sm shadow-inner focus:from-purple-50 focus:to-indigo-50 transition-all duration-500 group-hover:from-purple-50/70 group-hover:to-indigo-50/70"
                      />
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center">
                        <Lock className="h-6 w-6 text-purple-500 group-hover:text-indigo-500 transition-colors duration-300" />
                        <div className="w-1 h-8 bg-gradient-to-b from-purple-300 to-indigo-300 ml-2 rounded-full opacity-60"></div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-12 w-12 hover:bg-gradient-to-r hover:from-indigo-100 hover:to-purple-100 rounded-lg transition-all duration-300 group"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5 text-slate-500 group-hover:text-indigo-600" /> : <Eye className="h-5 w-5 text-slate-500 group-hover:text-purple-600" />}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Button 
                      type="button" 
                      variant="link" 
                      className="px-0 text-base text-indigo-600 hover:text-purple-600 transition-colors duration-300 font-medium" 
                      onClick={handleForgotPassword}
                    >
                      Forgot your password?
                    </Button>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full premium-button text-xl py-8 font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-700 hover:via-purple-700 hover:to-indigo-800 shadow-2xl hover:shadow-purple-500/30 transform hover:scale-[1.02] transition-all duration-500 group relative overflow-hidden" 
                    disabled={isLoading}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative flex items-center justify-center gap-3">
                      {isLoading ? (
                        <>
                          <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Authenticating...</span>
                        </>
                      ) : (
                        <>
                          <LogIn className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                          <span>Sign In</span>
                          <div className="w-2 h-2 bg-white/80 rounded-full animate-pulse ml-2"></div>
                        </>
                      )}
                    </div>
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="space-y-8 mt-8">
                <form onSubmit={handleSignupSubmit} className="space-y-8">
                  {error && (
                    <Alert variant="destructive" className="border-red-200 bg-gradient-to-r from-red-50 to-pink-50 animate-shake shadow-lg">
                      <AlertTriangle className="h-5 w-5" />
                      <AlertDescription className="text-red-700 font-medium text-base">{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="grid grid-cols-2 gap-6">
                    <div className="form-group group">
                      <Label htmlFor="firstName" className="flex items-center gap-3 text-base font-semibold text-slate-700 mb-3">
                        <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                        <User className="h-5 w-5 text-indigo-500 group-hover:text-purple-500 transition-colors duration-300" />
                        First Name
                      </Label>
                      <div className="relative">
                        <Input 
                          id="firstName" 
                          name="firstName" 
                          placeholder="Enter first name" 
                          required 
                          className="premium-input text-lg py-6 pl-14 pr-6 border-0 bg-gradient-to-r from-white to-indigo-50/50 backdrop-blur-sm shadow-inner focus:from-indigo-50 focus:to-purple-50 transition-all duration-500"
                        />
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center">
                          <User className="h-6 w-6 text-indigo-500 group-hover:text-purple-500 transition-colors duration-300" />
                          <div className="w-1 h-8 bg-gradient-to-b from-indigo-300 to-purple-300 ml-2 rounded-full opacity-60"></div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group group">
                      <Label htmlFor="lastName" className="flex items-center gap-3 text-base font-semibold text-slate-700 mb-3">
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"></div>
                        Last Name
                      </Label>
                      <div className="relative">
                        <Input 
                          id="lastName" 
                          name="lastName" 
                          placeholder="Enter last name" 
                          required 
                          className="premium-input text-lg py-6 pl-6 pr-6 border-0 bg-gradient-to-r from-white to-purple-50/50 backdrop-blur-sm shadow-inner focus:from-purple-50 focus:to-indigo-50 transition-all duration-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group group">
                    <Label htmlFor="signupEmail" className="flex items-center gap-3 text-base font-semibold text-slate-700 mb-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                      <Mail className="h-5 w-5 text-indigo-500 group-hover:text-purple-500 transition-colors duration-300" />
                      Email Address
                    </Label>
                    <div className="relative">
                      <Input 
                        id="signupEmail" 
                        name="signupEmail" 
                        type="email" 
                        placeholder="Enter your enterprise email" 
                        required 
                        className="premium-input text-lg py-6 pl-14 pr-6 border-0 bg-gradient-to-r from-white to-indigo-50/50 backdrop-blur-sm shadow-inner focus:from-indigo-50 focus:to-purple-50 transition-all duration-500"
                      />
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center">
                        <Mail className="h-6 w-6 text-indigo-500 group-hover:text-purple-500 transition-colors duration-300" />
                        <div className="w-1 h-8 bg-gradient-to-b from-indigo-300 to-purple-300 ml-2 rounded-full opacity-60"></div>
                      </div>
                    </div>
                  </div>

                  <div className="form-group group">
                    <Label htmlFor="phone" className="flex items-center gap-3 text-base font-semibold text-slate-700 mb-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"></div>
                      <Phone className="h-5 w-5 text-purple-500 group-hover:text-indigo-500 transition-colors duration-300" />
                      Phone Number
                    </Label>
                    <div className="relative">
                      <Input 
                        id="phone" 
                        name="phone" 
                        type="tel" 
                        placeholder="Enter your contact number" 
                        required 
                        className="premium-input text-lg py-6 pl-14 pr-6 border-0 bg-gradient-to-r from-white to-purple-50/50 backdrop-blur-sm shadow-inner focus:from-purple-50 focus:to-indigo-50 transition-all duration-500"
                      />
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center">
                        <Phone className="h-6 w-6 text-purple-500 group-hover:text-indigo-500 transition-colors duration-300" />
                        <div className="w-1 h-8 bg-gradient-to-b from-purple-300 to-indigo-300 ml-2 rounded-full opacity-60"></div>
                      </div>
                    </div>
                  </div>

                  <div className="form-group group">
                    <Label htmlFor="signupPassword" className="flex items-center gap-3 text-base font-semibold text-slate-700 mb-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                      <Lock className="h-5 w-5 text-indigo-500 group-hover:text-purple-500 transition-colors duration-300" />
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="signupPassword"
                        name="signupPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a secure password"
                        required
                        className="premium-input text-lg py-6 pl-14 pr-16 border-0 bg-gradient-to-r from-white to-indigo-50/50 backdrop-blur-sm shadow-inner focus:from-indigo-50 focus:to-purple-50 transition-all duration-500"
                      />
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center">
                        <Lock className="h-6 w-6 text-indigo-500 group-hover:text-purple-500 transition-colors duration-300" />
                        <div className="w-1 h-8 bg-gradient-to-b from-indigo-300 to-purple-300 ml-2 rounded-full opacity-60"></div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-12 w-12 hover:bg-gradient-to-r hover:from-indigo-100 hover:to-purple-100 rounded-lg transition-all duration-300 group"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5 text-slate-500 group-hover:text-indigo-600" /> : <Eye className="h-5 w-5 text-slate-500 group-hover:text-purple-600" />}
                      </Button>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full premium-button text-xl py-8 font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:via-indigo-700 hover:to-purple-800 shadow-2xl hover:shadow-indigo-500/30 transform hover:scale-[1.02] transition-all duration-500 group relative overflow-hidden" 
                    disabled={isLoading}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative flex items-center justify-center gap-3">
                      {isLoading ? (
                        <>
                          <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Creating Account...</span>
                        </>
                      ) : (
                        <>
                          <UserPlus className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                          <span>Create Account</span>
                          <div className="w-2 h-2 bg-white/80 rounded-full animate-pulse ml-2"></div>
                        </>
                      )}
                    </div>
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {/* Test Credentials */}
            <div className="mt-8 p-6 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 backdrop-blur-sm rounded-2xl border border-indigo-200/30 shadow-inner">
              <h4 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                Test Credentials
              </h4>
              <div className="space-y-3 text-base text-slate-600">
                <div className="flex items-center gap-3 p-3 bg-white/60 rounded-lg">
                  <Shield className="h-5 w-5 text-indigo-600" />
                  <div>
                    <span className="font-semibold text-indigo-700">Admin:</span>
                    <span className="ml-2">admin@hostel.com / admin123</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/60 rounded-lg">
                  <Users className="h-5 w-5 text-purple-600" />
                  <div>
                    <span className="font-semibold text-purple-700">Student:</span>
                    <span className="ml-2">john.doe@student.com / student123</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
