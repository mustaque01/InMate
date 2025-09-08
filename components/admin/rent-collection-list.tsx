"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, MoreHorizontal, Download, Eye, Send, Calendar, DollarSign, Building2 } from "lucide-react"

// Mock payment data
const mockPayments = [
  {
    id: 1,
    student: {
      name: "Rahul Sharma",
      email: "rahul.sharma@email.com",
      photo: "/diverse-students.png",
    },
    room: "A-101",
    amount: 8500,
    month: "December 2024",
    paymentDate: "2024-12-01",
    dueDate: "2024-12-01",
    status: "paid",
    paymentMethod: "UPI",
    receiptNumber: "RCP-2024-001",
    lateFee: 0,
  },
  {
    id: 2,
    student: {
      name: "Priya Patel",
      email: "priya.patel@email.com",
      photo: "/diverse-female-student.png",
    },
    room: "B-205",
    amount: 8500,
    month: "December 2024",
    paymentDate: null,
    dueDate: "2024-12-01",
    status: "overdue",
    paymentMethod: null,
    receiptNumber: null,
    lateFee: 500,
  },
  {
    id: 3,
    student: {
      name: "Amit Kumar",
      email: "amit.kumar@email.com",
      photo: "/male-student-studying.png",
    },
    room: "C-102",
    amount: 8500,
    month: "December 2024",
    paymentDate: "2024-11-28",
    dueDate: "2024-12-01",
    status: "paid",
    paymentMethod: "Cash",
    receiptNumber: "RCP-2024-002",
    lateFee: 0,
  },
]

const mockPaymentHistory = [
  {
    id: 1,
    student: "Rahul Sharma",
    room: "A-101",
    amount: 8500,
    month: "November 2024",
    paymentDate: "2024-11-01",
    paymentMethod: "UPI",
    receiptNumber: "RCP-2024-003",
  },
  {
    id: 2,
    student: "Priya Patel",
    room: "B-205",
    amount: 8500,
    month: "November 2024",
    paymentDate: "2024-11-05",
    paymentMethod: "Bank Transfer",
    receiptNumber: "RCP-2024-004",
  },
]

export function RentCollectionList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [monthFilter, setMonthFilter] = useState("current")

  const filteredPayments = mockPayments.filter((payment) => {
    const matchesSearch =
      payment.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.room.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || payment.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handlePaymentAction = (action: string, paymentId: number) => {
    if (action === "Download Receipt") {
      // Simulate PDF download
      alert(`Downloading receipt for payment ${paymentId}`)
    } else {
      alert(`${action} for payment ${paymentId}`)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "default"
      case "overdue":
        return "destructive"
      case "partial":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const getDaysOverdue = (dueDate: string) => {
    const due = new Date(dueDate)
    const today = new Date()
    const diffTime = today.getTime() - due.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  return (
    <Tabs defaultValue="current" className="space-y-4">
      <TabsList className="bg-white/10 backdrop-blur-md border border-white/20">
        <TabsTrigger value="current" className="text-white data-[state=active]:bg-blue-600 data-[state=active]:text-white">Current Month</TabsTrigger>
        <TabsTrigger value="history" className="text-white data-[state=active]:bg-blue-600 data-[state=active]:text-white">Payment History</TabsTrigger>
      </TabsList>

      <TabsContent value="current">
        <Card className="bg-white/10 backdrop-blur-md border border-white/20">
          <CardHeader>
            <CardTitle className="text-white">December 2024 Rent Collection</CardTitle>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 h-4 w-4" />
                <Input
                  placeholder="Search by student name, email, or room..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-blue-300"
                />
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-white/20">
                    <SelectItem value="all" className="text-white hover:bg-white/10">All Status</SelectItem>
                    <SelectItem value="paid" className="text-white hover:bg-white/10">Paid</SelectItem>
                    <SelectItem value="overdue" className="text-white hover:bg-white/10">Overdue</SelectItem>
                    <SelectItem value="partial" className="text-white hover:bg-white/10">Partial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={payment.student.photo || "/placeholder.svg"} alt={payment.student.name} />
                      <AvatarFallback>
                        {payment.student.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{payment.student.name}</h3>
                        <Badge variant={getStatusColor(payment.status)}>{payment.status}</Badge>
                        {payment.status === "overdue" && (
                          <Badge variant="outline" className="text-red-600">
                            {getDaysOverdue(payment.dueDate)} days overdue
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Building2 className="h-3 w-3" />
                          {payment.room}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />₹{payment.amount.toLocaleString()}
                          {payment.lateFee > 0 && ` + ₹${payment.lateFee} late fee`}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Due: {new Date(payment.dueDate).toLocaleDateString()}
                        </span>
                        {payment.paymentDate && <span>Paid: {new Date(payment.paymentDate).toLocaleDateString()}</span>}
                        {payment.paymentMethod && <span>via {payment.paymentMethod}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {payment.status === "paid" && payment.receiptNumber && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handlePaymentAction("Download Receipt", payment.id)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Receipt
                      </Button>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handlePaymentAction("View Details", payment.id)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        {payment.status === "overdue" && (
                          <>
                            <DropdownMenuItem onClick={() => handlePaymentAction("Collect Payment", payment.id)}>
                              <DollarSign className="h-4 w-4 mr-2" />
                              Collect Payment
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handlePaymentAction("Send Reminder", payment.id)}>
                              <Send className="h-4 w-4 mr-2" />
                              Send Reminder
                            </DropdownMenuItem>
                          </>
                        )}
                        {payment.status === "paid" && (
                          <DropdownMenuItem onClick={() => handlePaymentAction("Download Receipt", payment.id)}>
                            <Download className="h-4 w-4 mr-2" />
                            Download Receipt
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
            {filteredPayments.length === 0 && (
              <div className="text-center py-8 text-gray-500">No payments found matching your criteria.</div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="history">
        <Card className="bg-white/10 backdrop-blur-md border border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Payment History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockPaymentHistory.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{payment.student}</h3>
                      <Badge variant="default">Paid</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Building2 className="h-3 w-3" />
                        {payment.room}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />₹{payment.amount.toLocaleString()}
                      </span>
                      <span>{payment.month}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Paid: {new Date(payment.paymentDate).toLocaleDateString()}
                      </span>
                      <span>via {payment.paymentMethod}</span>
                      <span>Receipt: {payment.receiptNumber}</span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handlePaymentAction("Download Receipt", payment.id)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Receipt
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
