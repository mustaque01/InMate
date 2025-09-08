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
        <Card key={stat.title} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-200">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <p
              className={`text-xs ${
                stat.changeType === "positive"
                  ? "text-green-400"
                  : stat.changeType === "negative"
                    ? "text-red-400"
                    : "text-blue-300"
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
