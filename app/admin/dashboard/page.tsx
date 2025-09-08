import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminLayout } from "@/components/admin/admin-layout"
import { DashboardStats } from "@/components/admin/dashboard-stats"
import { RecentActivity } from "@/components/admin/recent-activity"
import { RentAlerts } from "@/components/admin/rent-alerts"

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

          <div className="grid lg:grid-cols-2 gap-6">
            <RentAlerts />
            <RecentActivity />
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  )
}
