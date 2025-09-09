import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminLayout } from "@/components/admin/admin-layout"
import { DashboardStats } from "@/components/admin/dashboard-stats"
import { RecentActivity } from "@/components/admin/recent-activity"
import { RentAlerts } from "@/components/admin/rent-alerts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, AlertTriangle, RefreshCw, CreditCard } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  return (
    <ProtectedRoute requiredRole="ADMIN">
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-blue-200">Welcome back! Here's what's happening at your hostel.</p>
          </div>

          <DashboardStats />

          {/* Quick Access to Payment Features */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-200 text-sm font-medium">Payment Analytics</p>
                    <p className="text-white text-lg font-semibold">View Insights</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-blue-400" />
                </div>
                <Link href="/admin/payments/analytics">
                  <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white">
                    View Analytics
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-200 text-sm font-medium">Payment Reminders</p>
                    <p className="text-white text-lg font-semibold">Manage Alerts</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-yellow-400" />
                </div>
                <Link href="/admin/payments/reminders">
                  <Button className="w-full mt-4 bg-yellow-600 hover:bg-yellow-700 text-white">
                    Manage Reminders
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-200 text-sm font-medium">Refund Requests</p>
                    <p className="text-white text-lg font-semibold">Process Refunds</p>
                  </div>
                  <RefreshCw className="h-8 w-8 text-green-400" />
                </div>
                <Link href="/admin/payments/refunds">
                  <Button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white">
                    View Requests
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-200 text-sm font-medium">Rent Collection</p>
                    <p className="text-white text-lg font-semibold">Collect Payments</p>
                  </div>
                  <CreditCard className="h-8 w-8 text-purple-400" />
                </div>
                <Link href="/admin/rent">
                  <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white">
                    Collect Rent
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <RentAlerts />
            <RecentActivity />
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  )
}
