import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminLayout } from "@/components/admin/admin-layout"
import { BookingList } from "@/components/admin/booking-list"
import { BookingStats } from "@/components/admin/booking-stats"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function BookingsPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Booking Management</h1>
              <p className="text-gray-600">Manage room assignments, bookings, and security deposits</p>
            </div>
            <Link href="/admin/bookings/new">
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                New Booking
              </Button>
            </Link>
          </div>

          <BookingStats />
          <BookingList />
        </div>
      </AdminLayout>
    </ProtectedRoute>
  )
}
