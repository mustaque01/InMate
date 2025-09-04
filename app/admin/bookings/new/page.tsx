import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminLayout } from "@/components/admin/admin-layout"
import { NewBookingForm } from "@/components/admin/new-booking-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewBookingPage() {
  return (
    <ProtectedRoute requiredRole="ADMIN">
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Link href="/admin/bookings">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Bookings
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">New Booking</h1>
              <p className="text-gray-600">Assign room and bed to a student with payment details</p>
            </div>
          </div>

          <NewBookingForm />
        </div>
      </AdminLayout>
    </ProtectedRoute>
  )
}
