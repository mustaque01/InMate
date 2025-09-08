import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"

const stats = [
  {
    title: "This Month Collected",
    value: "₹4,85,600",
    subtitle: "248 payments",
    icon: DollarSign,
    color: "text-green-600",
    trend: "+8% from last month",
  },
  {
    title: "Total Outstanding",
    value: "₹1,95,500",
    subtitle: "23 pending",
    icon: AlertTriangle,
    color: "text-red-600",
    trend: "Requires attention",
  },
  {
    title: "Collection Rate",
    value: "91.5%",
    subtitle: "This month",
    icon: TrendingUp,
    color: "text-blue-600",
    trend: "+2.3% improvement",
  },
  {
    title: "On-time Payments",
    value: "225",
    subtitle: "Out of 248",
    icon: CheckCircle,
    color: "text-purple-600",
    trend: "90.7% on-time rate",
  },
]

export function RentCollectionStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="bg-white/10 backdrop-blur-md border border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-200">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <p className="text-xs text-blue-300">{stat.subtitle}</p>
            <p className={`text-xs mt-1 ${stat.color}`}>{stat.trend}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
