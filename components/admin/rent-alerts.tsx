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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          Rent Due Alerts
        </CardTitle>
        <CardDescription>Students with pending rent payments</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {rentAlerts.map((alert) => (
          <div key={alert.id} className="flex items-center justify-between p-3 border rounded-lg">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{alert.studentName}</span>
                <Badge
                  variant={
                    alert.priority === "high" ? "destructive" : alert.priority === "medium" ? "default" : "secondary"
                  }
                >
                  {alert.priority}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
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
            <Button size="sm" variant="outline">
              Send Reminder
            </Button>
          </div>
        ))}
        <Button className="w-full bg-transparent" variant="outline">
          View All Alerts
        </Button>
      </CardContent>
    </Card>
  )
}
