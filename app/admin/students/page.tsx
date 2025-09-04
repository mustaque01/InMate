import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminLayout } from "@/components/admin/admin-layout"
import { StudentList } from "@/components/admin/student-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function StudentsPage() {
  return (
    <ProtectedRoute requiredRole="ADMIN">
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Student Management</h1>
              <p className="text-gray-600">Manage student registrations, details, and documentation</p>
            </div>
            <Link href="/admin/students/add">
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add New Student
              </Button>
            </Link>
          </div>

          <StudentList />
        </div>
      </AdminLayout>
    </ProtectedRoute>
  )
}
