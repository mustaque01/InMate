import { ProtectedRoute } from "@/components/auth/protected-route"
import { StudentLayout } from "@/components/admin/student-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, CreditCard, Bell } from "lucide-react"

export default function StudentDashboard() {
  return (
    <ProtectedRoute requiredRole="STUDENT">
      <StudentLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Student Dashboard</h1>
            <p className="text-blue-200">Welcome back! Here's your hostel information.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-200">Room Details</CardTitle>
                <Building2 className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">A-101</div>
                <p className="text-xs text-blue-300">Bed 2 • Floor 1</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-200">Rent Status</CardTitle>
                <CreditCard className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-400">Paid</div>
                <p className="text-xs text-blue-300">Next due: Jan 1, 2025</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-200">New Notices</CardTitle>
                <Bell className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">3</div>
                <p className="text-xs text-blue-300">Unread messages</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Recent Notices</CardTitle>
                <CardDescription className="text-blue-200">Latest announcements from hostel management</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Badge variant="default" className="bg-blue-600/20 text-blue-400 border-blue-400/20">New</Badge>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-white">Maintenance Schedule</p>
                    <p className="text-xs text-blue-200">
                      Water supply will be interrupted on Dec 25th from 10 AM to 2 PM
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="secondary" className="bg-indigo-600/20 text-indigo-400 border-indigo-400/20">Info</Badge>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-white">Rent Due Reminder</p>
                    <p className="text-xs text-blue-200">Monthly rent for January is due on 1st Jan 2025</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Payment History</CardTitle>
                <CardDescription className="text-blue-200">Your recent rent payments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">December 2024</p>
                    <p className="text-xs text-blue-200">Paid on Dec 1, 2024</p>
                  </div>
                  <Badge variant="outline" className="text-green-400 border-green-400/20 bg-green-400/10">
                    ₹8,500
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">November 2024</p>
                    <p className="text-xs text-blue-200">Paid on Nov 1, 2024</p>
                  </div>
                  <Badge variant="outline" className="text-green-400 border-green-400/20 bg-green-400/10">
                    ₹8,500
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">October 2024</p>
                    <p className="text-xs text-blue-200">Paid on Oct 1, 2024</p>
                  </div>
                  <Badge variant="outline" className="text-green-400 border-green-400/20 bg-green-400/10">
                    ₹8,500
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </StudentLayout>
    </ProtectedRoute>
  )
}
