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
    <ProtectedRoute requiredRole="ADMIN">
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Room & Bed Management</h1>
              <p className="text-blue-200">Manage room allocations, occupancy, and availability</p>
            </div>
            <Link href="/admin/rooms/add">
              <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
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
