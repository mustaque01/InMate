import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Download, Calendar, TrendingUp } from "lucide-react"

const reportStats = [
  {
    title: "Total Reports",
    value: "156",
    subtitle: "Generated this month",
    icon: FileText,
    color: "text-blue-600",
  },
  {
    title: "Downloads",
    value: "89",
    subtitle: "Reports downloaded",
    icon: Download,
    color: "text-green-600",
  },
  {
    title: "Scheduled Reports",
    value: "12",
    subtitle: "Auto-generated",
    icon: Calendar,
    color: "text-purple-600",
  },
  {
    title: "Report Usage",
    value: "+23%",
    subtitle: "Increase this month",
    icon: TrendingUp,
    color: "text-orange-600",
  },
]

export function ReportsOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {reportStats.map((stat) => (
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
