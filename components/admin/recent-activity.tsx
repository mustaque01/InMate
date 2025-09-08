import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { UserPlus, CreditCard, Home, FileText } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "student_added",
    description: "New student Anita Singh registered",
    time: "2 hours ago",
    icon: UserPlus,
    color: "text-green-600",
  },
  {
    id: 2,
    type: "payment_received",
    description: "Rent payment received from Vikash Yadav",
    time: "4 hours ago",
    icon: CreditCard,
    color: "text-blue-600",
  },
  {
    id: 3,
    type: "room_assigned",
    description: "Room B-301 assigned to Deepak Gupta",
    time: "6 hours ago",
    icon: Home,
    color: "text-purple-600",
  },
  {
    id: 4,
    type: "report_generated",
    description: "Monthly rent report generated",
    time: "1 day ago",
    icon: FileText,
    color: "text-orange-600",
  },
]

export function RecentActivity() {
  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader>
        <CardTitle className="text-white">Recent Activity</CardTitle>
        <CardDescription className="text-blue-200">Latest updates and actions in your hostel</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className={`${activity.color} bg-white/10 backdrop-blur-sm border border-white/20`}>
                <activity.icon className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium text-white">{activity.description}</p>
              <p className="text-xs text-blue-200">{activity.time}</p>
            </div>
          </div>
        ))}
        <div className="pt-2">
          <Badge variant="outline" className="w-full justify-center bg-white/10 backdrop-blur-sm border-white/20 text-blue-200 hover:text-white hover:bg-white/20">
            View All Activity
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
