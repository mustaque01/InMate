import { ProtectedRoute } from "@/components/auth/protected-route"
import { StudentLayout } from "@/components/admin/student-layout"
import { StudentProfileForm } from "@/components/admin/student-profile-form"

export default function StudentProfilePage() {
  return (
    <ProtectedRoute requiredRole="student">
      <StudentLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600">Manage your personal information and account settings</p>
          </div>
          <StudentProfileForm />
        </div>
      </StudentLayout>
    </ProtectedRoute>
  )
}