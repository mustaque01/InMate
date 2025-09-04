import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, Shield } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Building2 className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">HostelHub</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Complete hostel management solution for administrators and students
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle className="text-2xl">Admin Portal</CardTitle>
              <CardDescription>Manage students, rooms, rent collection, and generate reports</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Student & Room Management</li>
                <li>• Rent Collection & Tracking</li>
                <li>• Reports & Analytics</li>
                <li>• Booking Management</li>
              </ul>
              <Link href="/auth/admin" className="block">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Admin Login</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle className="text-2xl">Student Portal</CardTitle>
              <CardDescription>View room details, rent status, and hostel notices</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Room & Bed Information</li>
                <li>• Rent Payment Status</li>
                <li>• Hostel Notices</li>
                <li>• Profile Management</li>
              </ul>
              <Link href="/auth/student" className="block">
                <Button className="w-full bg-green-600 hover:bg-green-700">Student Login</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500">Secure, efficient, and user-friendly hostel management</p>
        </div>
      </div>
    </div>
  )
}
