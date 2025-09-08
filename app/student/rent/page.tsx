import { ProtectedRoute } from "@/components/auth/protected-route"
import { StudentLayout } from "@/components/admin/student-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CreditCard, Calendar, CheckCircle, AlertCircle, Download } from "lucide-react"

export default function StudentRentPage() {
  return (
    <ProtectedRoute requiredRole="STUDENT">
      <StudentLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Rent Status</h1>
            <p className="text-blue-200">Manage your rent payments and view payment history.</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-200">Current Status</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-400">Paid</div>
                <p className="text-xs text-blue-300">December 2024</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-200">Monthly Rent</CardTitle>
                <CreditCard className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">₹8,500</div>
                <p className="text-xs text-blue-300">Due on 1st of every month</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-200">Next Due Date</CardTitle>
                <Calendar className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">Jan 1, 2025</div>
                <p className="text-xs text-blue-300">7 days remaining</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Upcoming Payment</CardTitle>
              <CardDescription className="text-blue-200">Your next rent payment details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-600/20 backdrop-blur-sm border border-blue-400/20 rounded-lg">
                <div>
                  <h3 className="font-semibold text-white">January 2025 Rent</h3>
                  <p className="text-sm text-blue-200">Due Date: January 1, 2025</p>
                  <p className="text-lg font-bold text-blue-400">₹8,500</p>
                </div>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
                  Pay Now
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Payment History</CardTitle>
              <CardDescription className="text-blue-200">Your rent payment records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-white/20 bg-white/5 backdrop-blur-sm rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <div>
                      <p className="font-semibold text-white">December 2024</p>
                      <p className="text-sm text-blue-200">Paid on Dec 1, 2024</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-white">₹8,500</p>
                    <Badge variant="outline" className="text-green-400 border-green-400/20 bg-green-400/10">
                      Paid
                    </Badge>
                  </div>
                  <Button variant="ghost" size="sm" className="text-blue-200 hover:text-white hover:bg-white/10">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border border-white/20 bg-white/5 backdrop-blur-sm rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <div>
                      <p className="font-semibold text-white">November 2024</p>
                      <p className="text-sm text-blue-200">Paid on Nov 1, 2024</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-white">₹8,500</p>
                    <Badge variant="outline" className="text-green-400 border-green-400/20 bg-green-400/10">
                      Paid
                    </Badge>
                  </div>
                  <Button variant="ghost" size="sm" className="text-blue-200 hover:text-white hover:bg-white/10">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border border-white/20 bg-white/5 backdrop-blur-sm rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <div>
                      <p className="font-semibold text-white">October 2024</p>
                      <p className="text-sm text-blue-200">Paid on Oct 1, 2024</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-white">₹8,500</p>
                    <Badge variant="outline" className="text-green-400 border-green-400/20 bg-green-400/10">
                      Paid
                    </Badge>
                  </div>
                  <Button variant="ghost" size="sm" className="text-blue-200 hover:text-white hover:bg-white/10">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border border-white/20 bg-white/5 backdrop-blur-sm rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-yellow-400" />
                    <div>
                      <p className="font-semibold text-white">September 2024</p>
                      <p className="text-sm text-blue-200">Paid on Sep 5, 2024 (Late)</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-white">₹8,750</p>
                    <Badge variant="outline" className="text-yellow-400 border-yellow-400/20 bg-yellow-400/10">
                      Late Payment
                    </Badge>
                  </div>
                  <Button variant="ghost" size="sm" className="text-blue-200 hover:text-white hover:bg-white/10">
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
