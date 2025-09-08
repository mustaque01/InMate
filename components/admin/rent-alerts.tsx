import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Clock, DollarSign, Building2 } from "lucide-react"

const rentAlerts = [
  {
    id: 1,
    studentName: "Rahul Sharma",
    roomNumber: "A-101",
    amount: "₹8,500",
    daysOverdue: 15,
    priority: "high" as const,
  },
  {
    id: 2,
    studentName: "Priya Patel",
    roomNumber: "B-205",
    amount: "₹8,500",
    daysOverdue: 8,
    priority: "medium" as const,
  },
  {
    id: 3,
    studentName: "Amit Kumar",
    roomNumber: "C-102",
    amount: "₹8,500",
    daysOverdue: 3,
    priority: "low" as const,
  },
]

export function RentAlerts() {
  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <AlertTriangle className="h-5 w-5 text-red-400" />
          Rent Due Alerts
        </CardTitle>
        <CardDescription className="text-blue-200">Students with pending rent payments</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {rentAlerts.map((alert) => (
          <div key={alert.id} className="flex items-center justify-between p-3 border border-white/20 rounded-lg bg-white/5 backdrop-blur-sm">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-white">{alert.studentName}</span>
                <Badge
                  variant={
                    alert.priority === "high" ? "destructive" : alert.priority === "medium" ? "default" : "secondary"
                  }
                  className={
                    alert.priority === "high" 
                      ? "bg-red-500/20 text-red-400 border-red-400/20" 
                      : alert.priority === "medium"
                      ? "bg-yellow-500/20 text-yellow-400 border-yellow-400/20"
                      : "bg-blue-500/20 text-blue-400 border-blue-400/20"
                  }
                >
                  {alert.priority}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-blue-200">
                <span className="flex items-center gap-1">
                  <Building2 className="h-3 w-3" />
                  {alert.roomNumber}
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign className="h-3 w-3" />
                  {alert.amount}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {alert.daysOverdue} days overdue
                </span>
              </div>
            </div>
            <Button size="sm" variant="outline" className="border-blue-400/20 text-blue-200 hover:text-white hover:bg-blue-600/20">
              Send Reminder
            </Button>
          </div>
        ))}
        <Button className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-blue-200 hover:text-white hover:bg-white/20" variant="outline">
          View All Alerts
        </Button>
      </CardContent>
    </Card>
  )
}
