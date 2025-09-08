"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Download, FileText, Users, DollarSign, Building2, CalendarIcon, AlertTriangle, TrendingUp } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

const reportTypes = [
  {
    id: "rent-due",
    title: "Rent Due List",
    description: "List of students with pending rent payments",
    icon: AlertTriangle,
    color: "text-red-600",
    format: ["PDF", "Excel"],
    lastGenerated: "2024-12-15",
  },
  {
    id: "student-list",
    title: "Student Directory",
    description: "Complete list of all registered students",
    icon: Users,
    color: "text-blue-600",
    format: ["PDF", "Excel"],
    lastGenerated: "2024-12-14",
  },
  {
    id: "payment-history",
    title: "Payment History",
    description: "Detailed payment records and transactions",
    icon: DollarSign,
    color: "text-green-600",
    format: ["PDF", "Excel"],
    lastGenerated: "2024-12-15",
  },
  {
    id: "occupancy-report",
    title: "Room Occupancy Report",
    description: "Room utilization and availability statistics",
    icon: Building2,
    color: "text-purple-600",
    format: ["PDF", "Excel"],
    lastGenerated: "2024-12-13",
  },
  {
    id: "monthly-summary",
    title: "Monthly Summary",
    description: "Comprehensive monthly performance report",
    icon: TrendingUp,
    color: "text-orange-600",
    format: ["PDF"],
    lastGenerated: "2024-12-01",
  },
  {
    id: "financial-report",
    title: "Financial Report",
    description: "Revenue, expenses, and financial analytics",
    icon: FileText,
    color: "text-indigo-600",
    format: ["PDF", "Excel"],
    lastGenerated: "2024-12-10",
  },
]

export function ReportsList() {
  const [selectedDateRange, setSelectedDateRange] = useState<{ from?: Date; to?: Date }>({})
  const [isGenerating, setIsGenerating] = useState<string | null>(null)

  const handleGenerateReport = async (reportId: string, format: string) => {
    setIsGenerating(`${reportId}-${format}`)

    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(null)
      alert(`${format} report generated and downloaded successfully!`)
    }, 2000)
  }

  const handleQuickExport = (type: string) => {
    alert(`Exporting ${type} to Excel...`)
  }

  return (
    <div className="space-y-6">
      {/* Quick Export Actions */}
      <Card className="bg-white/10 backdrop-blur-md border border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Quick Export</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              onClick={() => handleQuickExport("Current Month Rent Due")}
              className="flex items-center gap-2 border-blue-300 text-blue-200 hover:bg-blue-500/20"
            >
              <Download className="h-4 w-4" />
              Rent Due List (Excel)
            </Button>
            <Button
              variant="outline"
              onClick={() => handleQuickExport("All Students")}
              className="flex items-center gap-2 border-blue-300 text-blue-200 hover:bg-blue-500/20"
            >
              <Download className="h-4 w-4" />
              Student List (Excel)
            </Button>
            <Button
              variant="outline"
              onClick={() => handleQuickExport("Payment History")}
              className="flex items-center gap-2 border-blue-300 text-blue-200 hover:bg-blue-500/20"
            >
              <Download className="h-4 w-4" />
              Payment History (Excel)
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Date Range Filter */}
      <Card className="bg-white/10 backdrop-blur-md border border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Report Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-blue-200">From Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal border-blue-300 text-blue-200 hover:bg-blue-500/20",
                      !selectedDateRange.from && "text-blue-300",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDateRange.from ? format(selectedDateRange.from, "PPP") : "Select start date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white/10 backdrop-blur-md border border-white/20">
                  <Calendar
                    mode="single"
                    selected={selectedDateRange.from}
                    onSelect={(date) => setSelectedDateRange((prev) => ({ ...prev, from: date }))}
                    initialFocus
                    className="text-white"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-blue-200">To Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal border-blue-300 text-blue-200 hover:bg-blue-500/20",
                      !selectedDateRange.to && "text-blue-300",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDateRange.to ? format(selectedDateRange.to, "PPP") : "Select end date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white/10 backdrop-blur-md border border-white/20">
                  <Calendar
                    mode="single"
                    selected={selectedDateRange.to}
                    onSelect={(date) => setSelectedDateRange((prev) => ({ ...prev, to: date }))}
                    initialFocus
                    className="text-white"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Reports */}
      <Card className="bg-white/10 backdrop-blur-md border border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Available Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {reportTypes.map((report) => (
              <div key={report.id} className="p-4 border border-white/20 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <report.icon className={`h-6 w-6 ${report.color}`} />
                    <div>
                      <h3 className="font-semibold text-white">{report.title}</h3>
                      <p className="text-sm text-blue-200">{report.description}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-xs text-blue-300">
                    Last generated: {new Date(report.lastGenerated).toLocaleDateString()}
                  </div>
                  <div className="flex gap-2">
                    {report.format.map((format) => (
                      <Button
                        key={format}
                        size="sm"
                        variant="outline"
                        onClick={() => handleGenerateReport(report.id, format)}
                        disabled={isGenerating === `${report.id}-${format}`}
                        className="flex items-center gap-1 border-blue-300 text-blue-200 hover:bg-blue-500/20"
                      >
                        <Download className="h-3 w-3" />
                        {isGenerating === `${report.id}-${format}` ? "Generating..." : format}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
