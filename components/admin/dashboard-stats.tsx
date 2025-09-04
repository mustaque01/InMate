import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Building2, DollarSign, AlertTriangle } from "lucide-react"

const stats = [
  {
    title: "Total Students",
    value: "248",
    change: "+12 this month",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    title: "Rooms Occupied",
    value: "156/180",
    change: "87% occupancy",
    changeType: "neutral" as const,
    icon: Building2,
  },
  {
    title: "Monthly Rent Collected",
    value: "₹4,85,600",
    change: "+8% from last month",
    changeType: "positive" as const,
    icon: DollarSign,
  },
  {
    title: "Rent Due Alerts",
    value: "23",
    change: "Requires attention",
    changeType: "negative" as const,
    icon: AlertTriangle,
  },
]

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p
              className={`text-xs ${
                stat.changeType === "positive"
                  ? "text-green-600"
                  : stat.changeType === "negative"
                    ? "text-red-600"
                    : "text-muted-foreground"
              }`}
            >
              {stat.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
