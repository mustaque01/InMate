import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Bed, Users, CheckCircle } from "lucide-react"

const stats = [
  {
    title: "Total Rooms",
    value: "180",
    subtitle: "Across 4 floors",
    icon: Building2,
    color: "text-blue-600",
  },
  {
    title: "Total Beds",
    value: "360",
    subtitle: "2 beds per room",
    icon: Bed,
    color: "text-green-600",
  },
  {
    title: "Occupied Beds",
    value: "248",
    subtitle: "69% occupancy",
    icon: Users,
    color: "text-orange-600",
  },
  {
    title: "Available Beds",
    value: "112",
    subtitle: "Ready for booking",
    icon: CheckCircle,
    color: "text-purple-600",
  },
]

export function RoomStats() {
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
