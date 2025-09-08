"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MoreHorizontal, Edit, Eye, LogOut, Calendar, DollarSign, Building2 } from "lucide-react"

// Mock booking data
const mockBookings = [
  {
    id: 1,
    student: {
      name: "Rahul Sharma",
      email: "rahul.sharma@email.com",
      photo: "/diverse-students.png",
    },
    room: "A-101",
    bed: "Bed 1",
    checkIn: "2024-01-15",
    checkOut: null,
    monthlyRent: 8500,
    securityDeposit: 10000,
    nextRentDue: "2025-01-01",
    status: "active",
    totalPaid: 18500,
  },
  {
    id: 2,
    student: {
      name: "Priya Patel",
      email: "priya.patel@email.com",
      photo: "/diverse-female-student.png",
    },
    room: "B-205",
    bed: "Bed 2",
    checkIn: "2024-02-20",
    checkOut: null,
    monthlyRent: 8500,
    securityDeposit: 10000,
    nextRentDue: "2025-01-01",
    status: "active",
    totalPaid: 18500,
  },
  {
    id: 3,
    student: {
      name: "Amit Kumar",
      email: "amit.kumar@email.com",
      photo: "/male-student-studying.png",
    },
    room: "C-102",
    bed: "Bed 1",
    checkIn: "2024-03-10",
    checkOut: "2024-12-15",
    monthlyRent: 8500,
    securityDeposit: 10000,
    nextRentDue: null,
    status: "checked-out",
    totalPaid: 18500,
  },
]

export function BookingList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredBookings = mockBookings.filter((booking) => {
    const matchesSearch =
      booking.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.room.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || booking.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleBookingAction = (action: string, bookingId: number) => {
    alert(`${action} booking ${bookingId}`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "checked-out":
        return "secondary"
      case "pending":
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-md border border-white/20">
      <CardHeader>
        <CardTitle className="text-white">Booking List</CardTitle>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 h-4 w-4" />
            <Input
              placeholder="Search bookings by student name, email, or room..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-blue-300"
            />
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-white/20">
                <SelectItem value="all" className="text-white hover:bg-white/10">All Status</SelectItem>
                <SelectItem value="active" className="text-white hover:bg-white/10">Active</SelectItem>
                <SelectItem value="checked-out" className="text-white hover:bg-white/10">Checked Out</SelectItem>
                <SelectItem value="pending" className="text-white hover:bg-white/10">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div key={booking.id} className="flex items-center justify-between p-4 border border-white/20 rounded-lg hover:bg-white/10 bg-white/5 backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 border-2 border-blue-400">
                  <AvatarImage src={booking.student.photo || "/placeholder.svg"} alt={booking.student.name} />
                  <AvatarFallback className="bg-blue-600 text-white">
                    {booking.student.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-white">{booking.student.name}</h3>
                    <Badge variant={getStatusColor(booking.status)}>{booking.status}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-blue-200">
                    <span className="flex items-center gap-1">
                      <Building2 className="h-3 w-3" />
                      {booking.room} - {booking.bed}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />₹{booking.monthlyRent.toLocaleString()}/month
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-blue-300">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Check-in: {new Date(booking.checkIn).toLocaleDateString()}
                    </span>
                    {booking.nextRentDue && (
                      <span>Next rent due: {new Date(booking.nextRentDue).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-right text-sm">
                  <div className="font-medium text-white">₹{booking.securityDeposit.toLocaleString()}</div>
                  <div className="text-blue-200">Security Deposit</div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-blue-200 hover:bg-white/10">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-slate-800 border-white/20">
                    <DropdownMenuItem onClick={() => handleBookingAction("View", booking.id)} className="text-white hover:bg-white/10">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleBookingAction("Edit", booking.id)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Booking
                    </DropdownMenuItem>
                    {booking.status === "active" && (
                      <DropdownMenuItem onClick={() => handleBookingAction("Checkout", booking.id)}>
                        <LogOut className="h-4 w-4 mr-2" />
                        Check Out
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
        {filteredBookings.length === 0 && (
          <div className="text-center py-8 text-gray-500">No bookings found matching your criteria.</div>
        )}
      </CardContent>
    </Card>
  )
}
