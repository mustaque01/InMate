import { ProtectedRoute } from "@/components/auth/protected-route"
import { StudentLayout } from "@/components/admin/student-layout"
import { LeaveApplicationSystem } from "@/components/student/leave-application-system"

export default function StudentLeavePage() {
  return (
    <ProtectedRoute requiredRole="STUDENT">
      <StudentLayout>
        <LeaveApplicationSystem />
      </StudentLayout>
    </ProtectedRoute>
  )
}
