import { ProtectedRoute } from "@/components/auth/protected-route"
import { StudentLayout } from "@/components/admin/student-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, AlertTriangle, Info, CheckCircle } from "lucide-react"

export default function StudentNoticesPage() {
  return (
    <ProtectedRoute requiredRole="student">
      <StudentLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Hostel Notices</h1>
            <p className="text-gray-600">Stay updated with important announcements and notices.</p>
          </div>

          <div className="grid gap-6">
            <Card className="border-l-4 border-l-red-500">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Urgent: Water Supply Maintenance</CardTitle>
                      <Badge variant="destructive">Urgent</Badge>
                    </div>
                    <CardDescription className="text-sm text-gray-500 mt-1">
                      Posted on December 20, 2024
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Water supply will be interrupted on December 25th, 2024, from 10:00 AM to 2:00 PM due to maintenance work. 
                  Please store sufficient water beforehand. Emergency water tankers will be available if needed.
                </p>
                <div className="mt-3 text-sm text-gray-500">
                  <p><strong>Contact:</strong> Hostel Office - +91 9876543210</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <Bell className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">January 2025 Rent Due Reminder</CardTitle>
                      <Badge variant="outline" className="text-blue-600">New</Badge>
                    </div>
                    <CardDescription className="text-sm text-gray-500 mt-1">
                      Posted on December 18, 2024
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  This is a friendly reminder that your monthly rent for January 2025 (₹8,500) is due on January 1st, 2025. 
                  Please ensure timely payment to avoid late fees. Online payment options are available through the student portal.
                </p>
                <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <strong>Late Payment Policy:</strong> A late fee of ₹250 will be charged after January 5th, 2025.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">WiFi Upgrade Completed</CardTitle>
                      <Badge variant="outline" className="text-green-600">Completed</Badge>
                    </div>
                    <CardDescription className="text-sm text-gray-500 mt-1">
                      Posted on December 15, 2024
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  We're pleased to announce that the WiFi infrastructure upgrade has been completed successfully. 
                  All students can now enjoy faster internet speeds up to 100 Mbps. 
                  Please restart your devices to connect to the new network.
                </p>
                <div className="mt-3 text-sm text-gray-600">
                  <p><strong>New Network:</strong> HostelHub_5G</p>
                  <p><strong>Password:</strong> Same as before (check with hostel office if needed)</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-yellow-500">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">New Year Celebration Guidelines</CardTitle>
                      <Badge variant="outline" className="text-yellow-600">Info</Badge>
                    </div>
                    <CardDescription className="text-sm text-gray-500 mt-1">
                      Posted on December 12, 2024
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  New Year celebration is permitted in the common areas until 12:30 AM on January 1st, 2025. 
                  Please maintain discipline and ensure no damage to hostel property. 
                  Loud music in rooms is strictly prohibited after 11 PM.
                </p>
                <div className="mt-3">
                  <h4 className="font-semibold text-sm mb-2">Guidelines:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Common area celebration ends at 12:30 AM</li>
                    <li>• No alcohol or smoking in hostel premises</li>
                    <li>• Clean up after celebration</li>
                    <li>• Report any damage immediately</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-gray-400">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Mess Menu Update</CardTitle>
                      <Badge variant="outline" className="text-gray-600">General</Badge>
                    </div>
                    <CardDescription className="text-sm text-gray-500 mt-1">
                      Posted on December 10, 2024
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  The mess menu has been updated with new items based on student feedback. 
                  Special dishes will be served on weekends. Please check the notice board for the complete weekly menu.
                </p>
                <div className="mt-3 text-sm text-gray-600">
                  <p><strong>Mess Timing:</strong> Breakfast: 7-9 AM, Lunch: 12-2 PM, Dinner: 7-9 PM</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </StudentLayout>
    </ProtectedRoute>
  )
}
