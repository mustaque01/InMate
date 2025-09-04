import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminLayout } from "@/components/admin/admin-layout"
import { RentCollectionStats } from "@/components/admin/rent-collection-stats"
import { RentCollectionList } from "@/components/admin/rent-collection-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function RentCollectionPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Rent Collection</h1>
              <p className="text-gray-600">Manage monthly rent payments and generate receipts</p>
            </div>
            <Link href="/admin/rent/collect">
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Collect Rent
              </Button>
            </Link>
          </div>

          <RentCollectionStats />
          <RentCollectionList />
        </div>
      </AdminLayout>
    </ProtectedRoute>
  )
}
