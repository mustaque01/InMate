import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminLayout } from "@/components/admin/admin-layout"
import { RefundManager } from "@/components/admin/refund-manager"

export default function RefundRequestsPage() {
  return (
    <ProtectedRoute requiredRole="ADMIN">
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Refund Requests</h1>
            <p className="text-blue-200">Review and process student refund requests.</p>
          </div>

          <RefundManager />
        </div>
      </AdminLayout>
    </ProtectedRoute>
  )
}
