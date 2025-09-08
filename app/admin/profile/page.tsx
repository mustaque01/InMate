import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminLayout } from "@/components/admin/admin-layout"
import { AdminProfileForm } from "@/components/admin/admin-profile-form"

export default function AdminProfilePage() {
  return (
    <ProtectedRoute requiredRole="ADMIN">
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Profile</h1>
            <p className="text-blue-200">Manage your account settings and personal information</p>
          </div>

          <AdminProfileForm />
        </div>
      </AdminLayout>
    </ProtectedRoute>
  )
}
