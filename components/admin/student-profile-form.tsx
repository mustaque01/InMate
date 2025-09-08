"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { Camera, Save, Key, Eye, EyeOff, Building2, CreditCard } from "lucide-react"

export function StudentProfileForm() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      alert("Profile updated successfully!")
    }, 1000)
  }

  const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      alert("Password changed successfully!")
    }, 1000)
  }

  return (
    <Tabs defaultValue="profile" className="space-y-6">
      <TabsList className="bg-white/10 backdrop-blur-md border border-white/20">
        <TabsTrigger value="profile" className="text-white data-[state=active]:bg-green-600 data-[state=active]:text-white">Profile Information</TabsTrigger>
        <TabsTrigger value="hostel" className="text-white data-[state=active]:bg-green-600 data-[state=active]:text-white">Hostel Details</TabsTrigger>
        <TabsTrigger value="password" className="text-white data-[state=active]:bg-green-600 data-[state=active]:text-white">Change Password</TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <form onSubmit={handleProfileUpdate} className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Profile Photo */}
            <Card className="bg-white/10 backdrop-blur-md border border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Profile Photo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-32 w-32 border-2 border-green-400">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="text-2xl bg-green-600 text-white">
                      {user?.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("") || "ST"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-center space-y-2">
                    <Label htmlFor="photo" className="cursor-pointer">
                      <div className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                        <Camera className="h-4 w-4" />
                        Change Photo
                      </div>
                    </Label>
                    <Input id="photo" type="file" accept="image/*" className="hidden" />
                    <p className="text-xs text-blue-200 text-center">JPG, PNG up to 2MB</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Personal Information */}
            <div className="lg:col-span-2">
              <Card className="bg-white/10 backdrop-blur-md border border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-blue-200">First Name</Label>
                      <Input id="firstName" defaultValue="Student" className="bg-white/10 border-white/20 text-white placeholder:text-blue-300" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-blue-200">Last Name</Label>
                      <Input id="lastName" defaultValue="User" className="bg-white/10 border-white/20 text-white placeholder:text-blue-300" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-blue-200">Email Address</Label>
                    <Input id="email" type="email" defaultValue={user?.email || ""} className="bg-white/10 border-white/20 text-white placeholder:text-blue-300" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-blue-200">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue={user?.phone || ""} className="bg-white/10 border-white/20 text-white placeholder:text-blue-300" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth" className="text-blue-200">Date of Birth</Label>
                      <Input id="dateOfBirth" type="date" className="bg-white/10 border-white/20 text-white placeholder:text-blue-300" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="studentId" className="text-blue-200">Student ID</Label>
                      <Input id="studentId" defaultValue="STU-2024-001" className="bg-white/10 border-white/20 text-white placeholder:text-blue-300" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Academic Information */}
          <Card className="bg-white/10 backdrop-blur-md border border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Academic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="course" className="text-blue-200">Course</Label>
                  <Input id="course" defaultValue="B.Tech Computer Science" className="bg-white/10 border-white/20 text-white placeholder:text-blue-300" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year" className="text-blue-200">Academic Year</Label>
                  <Input id="year" defaultValue="3rd Year" className="bg-white/10 border-white/20 text-white placeholder:text-blue-300" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="college" className="text-blue-200">College/University</Label>
                  <Input id="college" defaultValue="ABC University" className="bg-white/10 border-white/20 text-white placeholder:text-blue-300" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          <Card className="bg-white/10 backdrop-blur-md border border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Emergency Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact" className="text-blue-200">Emergency Contact Name</Label>
                  <Input id="emergencyContact" placeholder="Enter emergency contact name" className="bg-white/10 border-white/20 text-white placeholder:text-blue-300" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyPhone" className="text-blue-200">Emergency Contact Phone</Label>
                  <Input id="emergencyPhone" type="tel" placeholder="Enter emergency contact phone" className="bg-white/10 border-white/20 text-white placeholder:text-blue-300" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-blue-200">Home Address</Label>
                <Input id="address" placeholder="Enter your home address" className="bg-white/10 border-white/20 text-white placeholder:text-blue-300" />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white">
              <Save className="h-4 w-4" />
              {isLoading ? "Updating..." : "Update Profile"}
            </Button>
          </div>
        </form>
      </TabsContent>

      <TabsContent value="hostel">
        <div className="space-y-6">
          {/* Room Information */}
          <Card className="bg-white/10 backdrop-blur-md border border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Building2 className="h-5 w-5" />
                Room Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-blue-200">Room Number</Label>
                  <div className="p-2 bg-white/10 backdrop-blur-sm rounded border border-white/20">
                    <span className="font-medium text-white">{user?.roomNumber || "A-101"}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-blue-200">Bed Number</Label>
                  <div className="p-2 bg-white/10 backdrop-blur-sm rounded border border-white/20">
                    <span className="font-medium text-white">Bed 2</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-blue-200">Floor</Label>
                  <div className="p-2 bg-white/10 backdrop-blur-sm rounded border border-white/20">
                    <span className="font-medium text-white">Floor 1</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-blue-200">Block</Label>
                  <div className="p-2 bg-white/10 backdrop-blur-sm rounded border border-white/20">
                    <span className="font-medium text-white">Block A</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-blue-200">Check-in Date</Label>
                <div className="p-2 bg-white/10 backdrop-blur-sm rounded border border-white/20">
                  <span className="font-medium text-white">January 15, 2024</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card className="bg-white/10 backdrop-blur-md border border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <CreditCard className="h-5 w-5" />
                Payment Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-blue-200">Monthly Rent</Label>
                  <div className="p-2 bg-white/10 backdrop-blur-sm rounded border border-white/20">
                    <span className="font-medium text-white">₹8,500</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-blue-200">Security Deposit</Label>
                  <div className="p-2 bg-white/10 backdrop-blur-sm rounded border border-white/20">
                    <span className="font-medium text-white">₹10,000</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-blue-200">Rent Status</Label>
                  <div className="p-2 bg-white/10 backdrop-blur-sm rounded border border-white/20">
                    <Badge className="bg-green-600 text-white">Paid</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-blue-200">Next Due Date</Label>
                  <div className="p-2 bg-white/10 backdrop-blur-sm rounded border border-white/20">
                    <span className="font-medium text-white">January 1, 2025</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="password">
        <Card className="bg-white/10 backdrop-blur-md border border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Key className="h-5 w-5" />
              Change Password
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-blue-200">Current Password</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Enter current password"
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-blue-300"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-white/10 text-blue-200"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-blue-200">New Password</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-blue-300"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-white/10 text-blue-200"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-blue-200">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-blue-300"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-white/10 text-blue-200"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="pt-4">
                <Button type="submit" disabled={isLoading} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white">
                  <Key className="h-4 w-4" />
                  {isLoading ? "Changing Password..." : "Change Password"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
