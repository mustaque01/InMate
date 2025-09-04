import { ProtectedRoute } from "@/components/auth/protected-route"
import { StudentLayout } from "@/components/admin/student-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Users, Bed, Wifi, Car, Utensils } from "lucide-react"

export default function StudentRoomPage() {
  return (
    <ProtectedRoute requiredRole="STUDENT">
      <StudentLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Room Details</h1>
            <p className="text-gray-600">Information about your assigned room and amenities.</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Room Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Room Number</label>
                    <p className="text-lg font-semibold">A-101</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Floor</label>
                    <p className="text-lg font-semibold">1st Floor</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Room Type</label>
                    <p className="text-lg font-semibold">Double Sharing</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Bed Number</label>
                    <p className="text-lg font-semibold">Bed 2</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Monthly Rent</label>
                  <p className="text-2xl font-bold text-green-600">₹8,500</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Roommate Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Rahul Kumar</p>
                    <p className="text-sm text-gray-500">rahul.kumar@email.com</p>
                    <p className="text-sm text-gray-500">+91 9876543210</p>
                  </div>
                </div>
                
                <div className="pt-2">
                  <Badge variant="outline" className="text-green-600">
                    Bed 1 - Occupied
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Room Amenities</CardTitle>
              <CardDescription>Available facilities in your room and floor</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Wifi className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium">Free WiFi</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Car className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium">Parking</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Utensils className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium">Mess Facility</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Bed className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium">Furnished</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Room Rules & Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• No smoking or alcohol consumption in rooms</li>
                <li>• Maintain cleanliness and hygiene</li>
                <li>• No loud music after 10 PM</li>
                <li>• Guests are allowed only during visiting hours (10 AM - 8 PM)</li>
                <li>• Report any maintenance issues to hostel office</li>
                <li>• No cooking in rooms - use common kitchen area</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </StudentLayout>
    </ProtectedRoute>
  )
}
