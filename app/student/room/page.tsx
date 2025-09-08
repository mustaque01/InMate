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
            <h1 className="text-3xl font-bold text-white">Room Details</h1>
            <p className="text-blue-200">Information about your assigned room and amenities.</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Building2 className="h-5 w-5 text-green-400" />
                  Room Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-blue-200">Room Number</label>
                    <p className="text-lg font-semibold text-white">A-101</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-blue-200">Floor</label>
                    <p className="text-lg font-semibold text-white">1st Floor</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-blue-200">Room Type</label>
                    <p className="text-lg font-semibold text-white">Double Sharing</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-blue-200">Bed Number</label>
                    <p className="text-lg font-semibold text-white">Bed 2</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-blue-200">Monthly Rent</label>
                  <p className="text-2xl font-bold text-green-400">₹8,500</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Users className="h-5 w-5 text-green-400" />
                  Roommate Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-green-400/20 backdrop-blur-sm border border-green-400/30 flex items-center justify-center">
                    <Users className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Rahul Kumar</p>
                    <p className="text-sm text-blue-200">rahul.kumar@email.com</p>
                    <p className="text-sm text-blue-200">+91 9876543210</p>
                  </div>
                </div>
                
                <div className="pt-2">
                  <Badge variant="outline" className="text-green-400 border-green-400/20 bg-green-400/10">
                    Bed 1 - Occupied
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Room Amenities</CardTitle>
              <CardDescription className="text-blue-200">Available facilities in your room and floor</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg">
                  <Wifi className="h-5 w-5 text-blue-400" />
                  <span className="text-sm font-medium text-white">Free WiFi</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg">
                  <Car className="h-5 w-5 text-blue-400" />
                  <span className="text-sm font-medium text-white">Parking</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg">
                  <Utensils className="h-5 w-5 text-blue-400" />
                  <span className="text-sm font-medium text-white">Mess Facility</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg">
                  <Bed className="h-5 w-5 text-blue-400" />
                  <span className="text-sm font-medium text-white">Furnished</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Room Rules & Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-blue-200">
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
