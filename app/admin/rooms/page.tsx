import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminLayout } from "@/components/admin/admin-layout"
import { RoomGrid } from "@/components/admin/room-grid"
import { RoomStats } from "@/components/admin/room-stats"
import { RoomFilters } from "@/components/admin/room-filters"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function RoomsPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Room & Bed Management</h1>
              <p className="text-gray-600">Manage room allocations, occupancy, and availability</p>
            </div>
            <Link href="/admin/rooms/add">
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add New Room
              </Button>
            </Link>
          </div>

          <RoomStats />
          <RoomFilters />
          <RoomGrid />
        </div>
      </AdminLayout>
    </ProtectedRoute>
  )
}
