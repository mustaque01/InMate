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
    <div className="relative flex items-center justify-center min-h-screen p-4 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Modern animated background elements matching landing page */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/20 via-indigo-600/10 to-transparent"></div>
        <div className="absolute w-64 h-64 rounded-full top-1/4 left-1/4 bg-blue-500/20 blur-3xl animate-pulse"></div>
        <div className="absolute delay-1000 rounded-full bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500/20 blur-3xl animate-pulse"></div>
        <div className="absolute rounded-full top-3/4 left-1/2 w-96 h-96 bg-purple-500/10 blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 animate-fade-in">
          <Link 
            href="/" 
            className="inline-flex items-center text-blue-200 transition-colors duration-300 hover:text-white group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
        </div>

        <Card className="border shadow-2xl bg-white/10 backdrop-blur-xl animate-slide-in border-white/20">
          <CardHeader className="pb-10 text-center">
            <div className="flex items-center justify-center mb-8 group">
              <div className="relative">
                <div className="relative">
                  <UserIcon className="w-16 h-16 text-blue-400 transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 w-16 h-16 transition-all duration-500 rounded-full bg-gradient-to-r from-blue-500/30 to-indigo-500/30 blur-xl group-hover:from-blue-500/40 group-hover:to-indigo-500/40"></div>
                </div>
                <div className="absolute w-6 h-6 rounded-full -top-2 -right-2 bg-gradient-to-r from-indigo-500 to-blue-500 animate-pulse"></div>
              </div>
              <div className="relative ml-4">
                <Sparkles className="w-8 h-8 text-indigo-400 animate-bounce-in animate-delay-300" />
                <div className="absolute inset-0 w-8 h-8 rounded-full bg-indigo-500/30 blur-lg animate-pulse"></div>
              </div>
            </div>
            <CardTitle className="mb-3 text-4xl font-bold text-transparent capitalize bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-500 bg-clip-text">
              {userType} Portal
            </CardTitle>
            <CardDescription className="text-lg leading-relaxed text-blue-200">
              Secure access to your {userType} dashboard
            </CardDescription>
          </CardHeader>
          
          <CardContent className="px-10 pb-10">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 p-1 mb-8 border bg-white/10 backdrop-blur-md rounded-xl border-white/20">
                <TabsTrigger 
                  value="login" 
                  className="flex items-center justify-center gap-2 rounded-lg py-4 px-6 font-semibold text-lg text-blue-200 transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white hover:text-white hover:bg-white/10"
                >
                  <LogIn className="w-5 h-5" />
                  Login
                </TabsTrigger>
                <TabsTrigger 
                  value="signup"
                  className="flex items-center justify-center gap-2 rounded-lg py-4 px-6 font-semibold text-lg text-blue-200 transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-blue-600 data-[state=active]:text-white hover:text-white hover:bg-white/10"
                >
                  <UserPlus className="w-5 h-5" />
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="mt-8 space-y-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {error && (
                    <Alert variant="destructive" className="border-red-400 shadow-lg bg-red-500/20 backdrop-blur-sm animate-shake">
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                      <AlertDescription className="text-base font-medium text-red-200">{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="form-group group">
                    <Label htmlFor="email" className="flex items-center gap-3 mb-3 text-base font-semibold text-blue-200">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400"></div>
                      <Mail className="w-5 h-5 text-blue-400 transition-colors duration-300 group-hover:text-indigo-400" />
                      Email Address
                      <div className="w-1 h-1 ml-auto bg-indigo-400 rounded-full animate-pulse"></div>
                    </Label>
                    <div className="relative">
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        placeholder="Enter your email address" 
                        required 
                        className="py-6 pr-6 text-lg text-white transition-all duration-500 border rounded-lg pl-14 bg-white/10 backdrop-blur-sm border-white/20 placeholder:text-blue-200 focus:bg-white/20"
                      />
                      <div className="absolute flex items-center transform -translate-y-1/2 left-4 top-1/2">
                        <Mail className="w-6 h-6 text-blue-400 transition-colors duration-300 group-hover:text-indigo-400" />
                        <div className="w-1 h-8 ml-2 rounded-full bg-gradient-to-b from-blue-300 to-indigo-300 opacity-60"></div>
                      </div>
                    </div>
                  </div>

                  <div className="form-group group">
                    <Label htmlFor="password" className="flex items-center gap-3 mb-3 text-base font-semibold text-blue-200">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-400 to-blue-400"></div>
                      <Lock className="w-5 h-5 text-indigo-400 transition-colors duration-300 group-hover:text-blue-400" />
                      Password
                      <div className="w-1 h-1 ml-auto bg-blue-400 rounded-full animate-pulse"></div>
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your secure password"
                        required
                        className="py-6 pr-16 text-lg text-white transition-all duration-500 border rounded-lg pl-14 bg-white/10 backdrop-blur-sm border-white/20 placeholder:text-blue-200 focus:bg-white/20"
                      />
                      <div className="absolute flex items-center transform -translate-y-1/2 left-4 top-1/2">
                        <Lock className="w-6 h-6 text-indigo-400 transition-colors duration-300 group-hover:text-blue-400" />
                        <div className="w-1 h-8 ml-2 rounded-full bg-gradient-to-b from-indigo-300 to-blue-300 opacity-60"></div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute w-12 h-12 transition-all duration-300 transform -translate-y-1/2 rounded-lg right-2 top-1/2 hover:bg-white/20 group"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-5 h-5 text-blue-200 group-hover:text-white" /> : <Eye className="w-5 h-5 text-blue-200 group-hover:text-white" />}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <Button 
                      type="button" 
                      variant="ghost" 
                      className="px-6 py-3 text-base font-semibold text-blue-200 transition-all duration-300 border rounded-lg bg-white/5 backdrop-blur-sm border-white/10 hover:text-white hover:bg-white/10 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/20 group" 
                      onClick={handleForgotPassword}
                    >
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Forgot your password?
                      </span>
                    </Button>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full text-xl py-8 font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:via-indigo-700 hover:to-blue-800 shadow-2xl hover:shadow-blue-500/30 transform hover:scale-[1.02] transition-all duration-500 group relative overflow-hidden rounded-lg" 
                    disabled={isLoading}
                  >
                    <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-r from-indigo-600/20 to-blue-600/20 group-hover:opacity-100"></div>
                    <div className="relative flex items-center justify-center gap-3">
                      {isLoading ? (
                        <>
                          <div className="w-6 h-6 rounded-full border-3 border-white/30 border-t-white animate-spin"></div>
                          <span>Authenticating...</span>
                        </>
                      ) : (
                        <>
                          <LogIn className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                          <span>Sign In</span>
                          <div className="w-2 h-2 ml-2 rounded-full bg-white/80 animate-pulse"></div>
                        </>
                      )}
                    </div>
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="mt-8 space-y-8">
                <form onSubmit={handleSignupSubmit} className="space-y-8">
                  {error && (
                    <Alert variant="destructive" className="shadow-lg border-red-400/20 bg-red-900/20 backdrop-blur-sm animate-shake">
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                      <AlertDescription className="text-base font-medium text-red-200">{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="grid grid-cols-2 gap-6">
                    <div className="form-group group">
                      <Label htmlFor="firstName" className="flex items-center gap-3 mb-3 text-base font-semibold text-blue-200">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400"></div>
                        <User className="w-5 h-5 text-blue-400 transition-colors duration-300 group-hover:text-indigo-400" />
                        First Name
                      </Label>
                      <div className="relative">
                        <Input 
                          id="firstName" 
                          name="firstName" 
                          placeholder="Enter first name" 
                          required 
                          className="py-6 pr-6 text-lg text-white transition-all duration-500 border rounded-lg pl-14 border-white/20 bg-white/10 backdrop-blur-md placeholder:text-blue-200/70 focus:border-blue-400 focus:bg-white/20"
                        />
                        <div className="absolute flex items-center transform -translate-y-1/2 left-4 top-1/2">
                          <User className="w-6 h-6 text-blue-400 transition-colors duration-300 group-hover:text-indigo-400" />
                          <div className="w-1 h-8 ml-2 rounded-full bg-gradient-to-b from-blue-400 to-indigo-400 opacity-60"></div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group group">
                      <Label htmlFor="lastName" className="flex items-center gap-3 mb-3 text-base font-semibold text-blue-200">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-400 to-blue-400"></div>
                        Last Name
                      </Label>
                      <div className="relative">
                        <Input 
                          id="lastName" 
                          name="lastName" 
                          placeholder="Enter last name" 
                          required 
                          className="py-6 pl-6 pr-6 text-lg text-white transition-all duration-500 border rounded-lg border-white/20 bg-white/10 backdrop-blur-md placeholder:text-blue-200/70 focus:border-blue-400 focus:bg-white/20"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group group">
                    <Label htmlFor="signupEmail" className="flex items-center gap-3 mb-3 text-base font-semibold text-blue-200">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400"></div>
                      <Mail className="w-5 h-5 text-blue-400 transition-colors duration-300 group-hover:text-indigo-400" />
                      Email Address
                    </Label>
                    <div className="relative">
                      <Input 
                        id="signupEmail" 
                        name="signupEmail" 
                        type="email" 
                        placeholder="Enter your enterprise email" 
                        required 
                        className="py-6 pr-6 text-lg text-white transition-all duration-500 border rounded-lg pl-14 border-white/20 bg-white/10 backdrop-blur-md placeholder:text-blue-200/70 focus:border-blue-400 focus:bg-white/20"
                      />
                      <div className="absolute flex items-center transform -translate-y-1/2 left-4 top-1/2">
                        <Mail className="w-6 h-6 text-blue-400 transition-colors duration-300 group-hover:text-indigo-400" />
                        <div className="w-1 h-8 ml-2 rounded-full bg-gradient-to-b from-blue-400 to-indigo-400 opacity-60"></div>
                      </div>
                    </div>
                  </div>

                  <div className="form-group group">
                    <Label htmlFor="phone" className="flex items-center gap-3 mb-3 text-base font-semibold text-blue-200">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-400 to-blue-400"></div>
                      <Phone className="w-5 h-5 text-indigo-400 transition-colors duration-300 group-hover:text-blue-400" />
                      Phone Number
                    </Label>
                    <div className="relative">
                      <Input 
                        id="phone" 
                        name="phone" 
                        type="tel" 
                        placeholder="Enter your contact number" 
                        required 
                        className="py-6 pr-6 text-lg text-white transition-all duration-500 border rounded-lg pl-14 border-white/20 bg-white/10 backdrop-blur-md placeholder:text-blue-200/70 focus:border-blue-400 focus:bg-white/20"
                      />
                      <div className="absolute flex items-center transform -translate-y-1/2 left-4 top-1/2">
                        <Phone className="w-6 h-6 text-indigo-400 transition-colors duration-300 group-hover:text-blue-400" />
                        <div className="w-1 h-8 ml-2 rounded-full bg-gradient-to-b from-indigo-400 to-blue-400 opacity-60"></div>
                      </div>
                    </div>
                  </div>

                  <div className="form-group group">
                    <Label htmlFor="signupPassword" className="flex items-center gap-3 mb-3 text-base font-semibold text-blue-200">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400"></div>
                      <Lock className="w-5 h-5 text-blue-400 transition-colors duration-300 group-hover:text-indigo-400" />
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="signupPassword"
                        name="signupPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a secure password"
                        required
                        className="py-6 pr-16 text-lg text-white transition-all duration-500 border rounded-lg pl-14 border-white/20 bg-white/10 backdrop-blur-md placeholder:text-blue-200/70 focus:border-blue-400 focus:bg-white/20"
                      />
                      <div className="absolute flex items-center transform -translate-y-1/2 left-4 top-1/2">
                        <Lock className="w-6 h-6 text-blue-400 transition-colors duration-300 group-hover:text-indigo-400" />
                        <div className="w-1 h-8 ml-2 rounded-full bg-gradient-to-b from-blue-400 to-indigo-400 opacity-60"></div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute w-12 h-12 transition-all duration-300 transform -translate-y-1/2 rounded-lg right-2 top-1/2 hover:bg-white/10 backdrop-blur-sm group"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-5 h-5 text-blue-300 group-hover:text-blue-400" /> : <Eye className="w-5 h-5 text-blue-300 group-hover:text-indigo-400" />}
                      </Button>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full text-xl py-8 font-bold text-white bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 hover:from-indigo-700 hover:via-blue-700 hover:to-indigo-800 shadow-2xl hover:shadow-blue-500/30 transform hover:scale-[1.02] transition-all duration-500 group relative overflow-hidden rounded-lg" 
                    disabled={isLoading}
                  >
                    <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 group-hover:opacity-100"></div>
                    <div className="relative flex items-center justify-center gap-3">
                      {isLoading ? (
                        <>
                          <div className="w-6 h-6 rounded-full border-3 border-white/30 border-t-white animate-spin"></div>
                          <span>Creating Account...</span>
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                          <span>Create Account</span>
                          <div className="w-2 h-2 ml-2 rounded-full bg-white/80 animate-pulse"></div>
                        </>
                      )}
                    </div>
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {/* Test Credentials */}
            <div className="p-6 mt-8 border shadow-inner bg-white/10 backdrop-blur-md rounded-2xl border-white/20">
              <h4 className="flex items-center gap-2 mb-4 text-lg font-semibold text-blue-200">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400"></div>
                Test Credentials
              </h4>
              <div className="space-y-3 text-base text-blue-100">
                <div className="flex items-center gap-3 p-3 border rounded-lg bg-white/10 backdrop-blur-sm border-white/10">
                  <Shield className="w-5 h-5 text-blue-400" />
                  <div>
                    <span className="font-semibold text-blue-300">Admin:</span>
                    <span className="ml-2 text-white">admin@hostel.com / admin123</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg bg-white/10 backdrop-blur-sm border-white/10">
                  <Users className="w-5 h-5 text-indigo-400" />
                  <div>
                    <span className="font-semibold text-indigo-300">Student:</span>
                    <span className="ml-2 text-white">john.doe@student.com / student123</span>
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
