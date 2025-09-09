import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminLayout } from "@/components/admin/admin-layout"
import { PaymentAnalyticsOverview } from "@/components/admin/payment-analytics/payment-analytics-overview"

export default function PaymentAnalyticsPage() {
  return (
    <ProtectedRoute requiredRole="ADMIN">
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Payment Analytics</h1>
            <p className="text-blue-200">Comprehensive insights into payment patterns and financial metrics.</p>
          </div>

          <PaymentAnalyticsOverview />
        </div>
      </AdminLayout>
    </ProtectedRoute>
  )
}
