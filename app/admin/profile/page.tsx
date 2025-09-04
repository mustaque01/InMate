import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminLayout } from "@/components/admin/admin-layout"
import { AdminProfileForm } from "@/components/admin/admin-profile-form"

export default function AdminProfilePage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Profile</h1>
            <p className="text-gray-600">Manage your account settings and personal information</p>
          </div>

          <AdminProfileForm />
        </div>
      </AdminLayout>
    </ProtectedRoute>
  )
}
