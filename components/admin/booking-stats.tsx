import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, DollarSign, Users, Clock } from "lucide-react"

const stats = [
  {
    title: "Total Bookings",
    value: "248",
    subtitle: "Active bookings",
    icon: Calendar,
    color: "text-blue-600",
  },
  {
    title: "Security Deposits",
    value: "₹24,80,000",
    subtitle: "Total collected",
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    title: "New This Month",
    value: "12",
    subtitle: "Recent bookings",
    icon: Users,
    color: "text-purple-600",
  },
  {
    title: "Pending Checkout",
    value: "5",
    subtitle: "Due for checkout",
    icon: Clock,
    color: "text-orange-600",
  },
]

export function BookingStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
