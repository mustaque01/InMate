import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminLayout } from "@/components/admin/admin-layout"
import { PaymentReminderManager } from "@/components/admin/payment-reminders"

export default function PaymentRemindersPage() {
  return (
    <ProtectedRoute requiredRole="ADMIN">
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Payment Reminders</h1>
            <p className="text-blue-200">Manage automated payment reminders and notifications.</p>
          </div>

          <PaymentReminderManager />
        </div>
      </AdminLayout>
    </ProtectedRoute>
  )
}
