import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminLayout } from "@/components/admin/admin-layout"
import { DashboardStats } from "@/components/admin/dashboard-stats"
import { RecentActivity } from "@/components/admin/recent-activity"
import { RentAlerts } from "@/components/admin/rent-alerts"

export default function AdminDashboard() {
  return (
    <ProtectedRoute requiredRole="admin">
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening at your hostel.</p>
          </div>

          <DashboardStats />

          <div className="grid lg:grid-cols-2 gap-6">
            <RentAlerts />
            <RecentActivity />
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  )
}
