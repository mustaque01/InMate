import { ProtectedRoute } from "@/components/auth/protected-route"
import { StudentLayout } from "@/components/admin/student-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CreditCard, Calendar, CheckCircle, AlertCircle, Download } from "lucide-react"

export default function StudentRentPage() {
  return (
    <ProtectedRoute requiredRole="student">
      <StudentLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Rent Status</h1>
            <p className="text-gray-600">Manage your rent payments and view payment history.</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Status</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">Paid</div>
                <p className="text-xs text-muted-foreground">December 2024</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Rent</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹8,500</div>
                <p className="text-xs text-muted-foreground">Due on 1st of every month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Next Due Date</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Jan 1, 2025</div>
                <p className="text-xs text-muted-foreground">7 days remaining</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Payment</CardTitle>
              <CardDescription>Your next rent payment details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div>
                  <h3 className="font-semibold">January 2025 Rent</h3>
                  <p className="text-sm text-gray-600">Due Date: January 1, 2025</p>
                  <p className="text-lg font-bold text-blue-600">₹8,500</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Pay Now
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>Your rent payment records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-semibold">December 2024</p>
                      <p className="text-sm text-gray-500">Paid on Dec 1, 2024</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹8,500</p>
                    <Badge variant="outline" className="text-green-600">
                      Paid
                    </Badge>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-semibold">November 2024</p>
                      <p className="text-sm text-gray-500">Paid on Nov 1, 2024</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹8,500</p>
                    <Badge variant="outline" className="text-green-600">
                      Paid
                    </Badge>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-semibold">October 2024</p>
                      <p className="text-sm text-gray-500">Paid on Oct 1, 2024</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹8,500</p>
                    <Badge variant="outline" className="text-green-600">
                      Paid
                    </Badge>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                    <div>
                      <p className="font-semibold">September 2024</p>
                      <p className="text-sm text-gray-500">Paid on Sep 5, 2024 (Late)</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹8,750</p>
                    <Badge variant="outline" className="text-yellow-600">
                      Late Payment
                    </Badge>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </StudentLayout>
    </ProtectedRoute>
  )
}
