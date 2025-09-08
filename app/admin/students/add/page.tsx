import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminLayout } from "@/components/admin/admin-layout"
import { AddStudentForm } from "@/components/admin/add-student-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AddStudentPage() {
  return (
    <ProtectedRoute requiredRole="ADMIN">
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Link href="/admin/students">
              <Button variant="ghost" size="sm" className="text-blue-200 hover:bg-white/10">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Students
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">Add New Student</h1>
              <p className="text-blue-200">Register a new student with complete details and documentation</p>
            </div>
          </div>

          <AddStudentForm />
        </div>
      </AdminLayout>
    </ProtectedRoute>
  )
}
