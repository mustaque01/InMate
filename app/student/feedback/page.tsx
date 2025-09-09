import { ProtectedRoute } from "@/components/auth/protected-route"
import { StudentLayout } from "@/components/admin/student-layout"
import { FeedbackSystem } from "@/components/student/feedback-system"

export default function StudentFeedbackPage() {
  return (
    <ProtectedRoute requiredRole="STUDENT">
      <StudentLayout>
        <FeedbackSystem />
      </StudentLayout>
    </ProtectedRoute>
  )
}
