import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminLayout } from "@/components/admin/admin-layout"
import { RentCollectionForm } from "@/components/admin/rent-collection-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CollectRentPage() {
  return (
    <ProtectedRoute requiredRole="ADMIN">
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Link href="/admin/rent">
              <Button variant="ghost" size="sm" className="text-blue-200 hover:bg-white/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Rent Collection
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">Collect Rent Payment</h1>
              <p className="text-blue-200">Record a new rent payment and generate receipt</p>
            </div>
          </div>

          <RentCollectionForm />
        </div>
      </AdminLayout>
    </ProtectedRoute>
  )
}
