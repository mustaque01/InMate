import { ProtectedRoute } from "@/components/auth/protected-route"
import { StudentLayout } from "@/components/admin/student-layout"
import { StudentComplaintSystem } from "@/components/student/complaint-system"

export default function StudentComplaintsPage() {
  return (
    <ProtectedRoute requiredRole="STUDENT">
      <StudentLayout>
        <StudentComplaintSystem />
      </StudentLayout>
    </ProtectedRoute>
  )
}
