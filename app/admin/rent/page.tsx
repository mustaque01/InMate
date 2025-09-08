import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminLayout } from "@/components/admin/admin-layout"
import { RentCollectionStats } from "@/components/admin/rent-collection-stats"
import { RentCollectionList } from "@/components/admin/rent-collection-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function RentCollectionPage() {
  return (
    <ProtectedRoute requiredRole="ADMIN">
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Rent Collection</h1>
              <p className="text-blue-200">Manage monthly rent payments and generate receipts</p>
            </div>
            <Link href="/admin/rent/collect">
              <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
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
