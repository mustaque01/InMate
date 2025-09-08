import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminLayout } from "@/components/admin/admin-layout"
import { ReportsOverview } from "@/components/admin/reports-overview"
import { ReportsList } from "@/components/admin/reports-list"

export default function ReportsPage() {
  return (
    <ProtectedRoute requiredRole="ADMIN">
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Reports & Analytics</h1>
            <p className="text-blue-200">Generate and export various reports for hostel management</p>
          </div>

          <ReportsOverview />
          <ReportsList />
        </div>
      </AdminLayout>
    </ProtectedRoute>
  )
}
