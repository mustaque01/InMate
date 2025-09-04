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
            <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's your hostel information.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Room Details</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">A-101</div>
                <p className="text-xs text-muted-foreground">Bed 2 • Floor 1</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Rent Status</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">Paid</div>
                <p className="text-xs text-muted-foreground">Next due: Jan 1, 2025</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Notices</CardTitle>
                <Bell className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">Unread messages</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Notices</CardTitle>
                <CardDescription>Latest announcements from hostel management</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Badge variant="default">New</Badge>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Maintenance Schedule</p>
                    <p className="text-xs text-gray-500">
                      Water supply will be interrupted on Dec 25th from 10 AM to 2 PM
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="secondary">Info</Badge>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Rent Due Reminder</p>
                    <p className="text-xs text-gray-500">Monthly rent for January is due on 1st Jan 2025</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>Your recent rent payments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">December 2024</p>
                    <p className="text-xs text-gray-500">Paid on Dec 1, 2024</p>
                  </div>
                  <Badge variant="outline" className="text-green-600">
                    ₹8,500
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">November 2024</p>
                    <p className="text-xs text-gray-500">Paid on Nov 1, 2024</p>
                  </div>
                  <Badge variant="outline" className="text-green-600">
                    ₹8,500
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">October 2024</p>
                    <p className="text-xs text-gray-500">Paid on Oct 1, 2024</p>
                  </div>
                  <Badge variant="outline" className="text-green-600">
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
