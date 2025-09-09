import { ProtectedRoute } from "@/components/auth/protected-route"
import { StudentLayout } from "@/components/admin/student-layout"
import { RoommateFinder } from "@/components/student/roommate-finder"

export default function StudentRoommatePage() {
  return (
    <ProtectedRoute requiredRole="STUDENT">
      <StudentLayout>
        <RoommateFinder />
      </StudentLayout>
    </ProtectedRoute>
  )
}
