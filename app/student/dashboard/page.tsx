import { ProtectedRoute } from "@/components/auth/protected-route"
import { StudentLayout } from "@/components/admin/student-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Building2, 
  CreditCard, 
  Bell, 
  MessageSquare, 
  Calendar, 
  Star, 
  Users, 
  CalendarDays 
} from "lucide-react"
import Link from "next/link"

export default function StudentDashboard() {
  return (
    <ProtectedRoute requiredRole="STUDENT">
      <StudentLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Student Dashboard</h1>
            <p className="text-green-200">Welcome back! Here's your hostel information.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-green-200">Room Details</CardTitle>
                <Building2 className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">A-101</div>
                <p className="text-xs text-green-300">Bed 2 • Floor 1</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-green-200">Rent Status</CardTitle>
                <CreditCard className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-400">Paid</div>
                <p className="text-xs text-green-300">Next due: Jan 1, 2025</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-green-200">New Notices</CardTitle>
                <Bell className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">3</div>
                <p className="text-xs text-green-300">Unread messages</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Access to Student Features */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/student/complaints">
                <Card className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <MessageSquare className="h-8 w-8 mx-auto mb-2 text-green-400" />
                    <p className="text-white font-medium">Submit Complaint</p>
                    <p className="text-green-300 text-xs">Report issues</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/student/leave">
                <Card className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Calendar className="h-8 w-8 mx-auto mb-2 text-green-400" />
                    <p className="text-white font-medium">Apply for Leave</p>
                    <p className="text-green-300 text-xs">Request time off</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/student/feedback">
                <Card className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Star className="h-8 w-8 mx-auto mb-2 text-green-400" />
                    <p className="text-white font-medium">Give Feedback</p>
                    <p className="text-green-300 text-xs">Share thoughts</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/student/roommate">
                <Card className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Users className="h-8 w-8 mx-auto mb-2 text-green-400" />
                    <p className="text-white font-medium">Find Roommate</p>
                    <p className="text-green-300 text-xs">Connect with others</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Recent Notices</CardTitle>
                <CardDescription className="text-green-200">Latest announcements from hostel management</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Badge variant="default" className="bg-green-600/20 text-green-400 border-green-400/20">New</Badge>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-white">Maintenance Schedule</p>
                    <p className="text-xs text-green-200">
                      Water supply will be interrupted on Dec 25th from 10 AM to 2 PM
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="secondary" className="bg-indigo-600/20 text-indigo-400 border-indigo-400/20">Info</Badge>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-white">Rent Due Reminder</p>
                    <p className="text-xs text-green-200">Monthly rent for January is due on 1st Jan 2025</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Payment History</CardTitle>
                <CardDescription className="text-green-200">Your recent rent payments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">December 2024</p>
                    <p className="text-xs text-green-200">Paid on Dec 1, 2024</p>
                  </div>
                  <Badge variant="outline" className="text-green-400 border-green-400/20 bg-green-400/10">
                    ₹8,500
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">November 2024</p>
                    <p className="text-xs text-green-200">Paid on Nov 1, 2024</p>
                  </div>
                  <Badge variant="outline" className="text-green-400 border-green-400/20 bg-green-400/10">
                    ₹8,500
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">October 2024</p>
                    <p className="text-xs text-green-200">Paid on Oct 1, 2024</p>
                  </div>
                  <Badge variant="outline" className="text-green-400 border-green-400/20 bg-green-400/10">
                    ₹8,500
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Events */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-white">Upcoming Events</CardTitle>
                <CardDescription className="text-green-200">Events happening in your hostel</CardDescription>
              </div>
              <Link href="/student/events">
                <Button variant="outline" className="border-green-400 text-green-300 hover:bg-green-500/20">
                  <CalendarDays className="h-4 w-4 mr-2" />
                  View All Events
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded border border-white/10">
                  <div>
                    <p className="text-white font-medium">Movie Night</p>
                    <p className="text-green-300 text-sm">Recreation Room • Tonight 8:00 PM</p>
                  </div>
                  <Badge variant="outline" className="text-blue-400 border-blue-400/20 bg-blue-400/10">
                    Social
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded border border-white/10">
                  <div>
                    <p className="text-white font-medium">Study Group Session</p>
                    <p className="text-green-300 text-sm">Library • Tomorrow 6:00 PM</p>
                  </div>
                  <Badge variant="outline" className="text-purple-400 border-purple-400/20 bg-purple-400/10">
                    Academic
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </StudentLayout>
    </ProtectedRoute>
  )
}
