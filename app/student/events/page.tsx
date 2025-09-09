import { ProtectedRoute } from "@/components/auth/protected-route"
import { StudentLayout } from "@/components/admin/student-layout"
import { EventCalendar } from "@/components/student/event-calendar"

export default function StudentEventsPage() {
  return (
    <ProtectedRoute requiredRole="STUDENT">
      <StudentLayout>
        <EventCalendar />
      </StudentLayout>
    </ProtectedRoute>
  )
}
