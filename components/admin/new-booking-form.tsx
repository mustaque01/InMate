"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, Building2, Users, DollarSign } from "lucide-react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

// Mock data
const mockStudents = [
  {
    id: 1,
    name: "Anita Singh",
    email: "anita.singh@email.com",
    phone: "+91 9876543214",
    photo: "/diverse-female-student.png",
  },
  {
    id: 2,
    name: "Vikash Yadav",
    email: "vikash.yadav@email.com",
    phone: "+91 9876543215",
    photo: "/male-student-studying.png",
  },
  {
    id: 3,
    name: "Deepak Gupta",
    email: "deepak.gupta@email.com",
    phone: "+91 9876543216",
    photo: "/diverse-students.png",
  },
]

const mockAvailableRooms = [
  { id: 1, number: "A-103", floor: 1, type: "double", rent: 8500, availableBeds: ["Bed 1", "Bed 2"] },
  { id: 2, number: "B-202", floor: 2, type: "single", rent: 12000, availableBeds: ["Bed 1"] },
  { id: 3, number: "C-301", floor: 3, type: "double", rent: 8500, availableBeds: ["Bed 1"] },
]

export function NewBookingForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [selectedRoom, setSelectedRoom] = useState<any>(null)
  const [selectedBed, setSelectedBed] = useState("")
  const [checkInDate, setCheckInDate] = useState<Date>()
  const [nextRentDue, setNextRentDue] = useState<Date>()
  const [securityDeposit, setSecurityDeposit] = useState("")
  const [bookingAmount, setBookingAmount] = useState("")

  // Auto-calculate next rent due date when check-in date changes
  useEffect(() => {
    if (checkInDate) {
      const nextMonth = new Date(checkInDate)
      nextMonth.setMonth(nextMonth.getMonth() + 1)
      setNextRentDue(nextMonth)
    }
  }, [checkInDate])

  // Auto-calculate booking amount when room is selected
  useEffect(() => {
    if (selectedRoom) {
      const deposit = selectedRoom.rent
      setSecurityDeposit(deposit.toString())
      setBookingAmount((selectedRoom.rent + deposit).toString())
    }
  }, [selectedRoom])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      alert("Booking created successfully!")
      router.push("/admin/bookings")
    }, 2000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Student Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Select Student
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="student">Student *</Label>
              <Select
                required
                onValueChange={(value) => {
                  const student = mockStudents.find((s) => s.id.toString() === value)
                  setSelectedStudent(student)
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a student" />
                </SelectTrigger>
                <SelectContent>
                  {mockStudents.map((student) => (
                    <SelectItem key={student.id} value={student.id.toString()}>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={student.photo || "/placeholder.svg"} alt={student.name} />
                          <AvatarFallback className="text-xs">
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-xs text-gray-500">{student.email}</div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedStudent && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedStudent.photo || "/placeholder.svg"} alt={selectedStudent.name} />
                    <AvatarFallback>
                      {selectedStudent.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{selectedStudent.name}</div>
                    <div className="text-sm text-gray-600">{selectedStudent.email}</div>
                    <div className="text-sm text-gray-600">{selectedStudent.phone}</div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Room Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Select Room & Bed
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="room">Available Room *</Label>
              <Select
                required
                onValueChange={(value) => {
                  const room = mockAvailableRooms.find((r) => r.id.toString() === value)
                  setSelectedRoom(room)
                  setSelectedBed("") // Reset bed selection
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a room" />
                </SelectTrigger>
                <SelectContent>
                  {mockAvailableRooms.map((room) => (
                    <SelectItem key={room.id} value={room.id.toString()}>
                      <div className="flex items-center justify-between w-full">
                        <div>
                          <div className="font-medium">{room.number}</div>
                          <div className="text-xs text-gray-500">
                            Floor {room.floor} • {room.type}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">₹{room.rent.toLocaleString()}</div>
                          <div className="text-xs text-gray-500">{room.availableBeds.length} beds available</div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedRoom && (
              <div className="space-y-2">
                <Label htmlFor="bed">Select Bed *</Label>
                <Select required value={selectedBed} onValueChange={setSelectedBed}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a bed" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedRoom.availableBeds.map((bed: string) => (
                      <SelectItem key={bed} value={bed}>
                        {bed}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {selectedRoom && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Room:</span>
                    <span className="font-medium">{selectedRoom.number}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Type:</span>
                    <Badge variant="outline">{selectedRoom.type}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Monthly Rent:</span>
                    <span className="font-medium">₹{selectedRoom.rent.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Booking Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Booking Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Check-in Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !checkInDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkInDate ? format(checkInDate, "PPP") : "Select check-in date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={checkInDate} onSelect={setCheckInDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Next Rent Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !nextRentDue && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {nextRentDue ? format(nextRentDue, "PPP") : "Auto-calculated"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={nextRentDue} onSelect={setNextRentDue} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Booking Notes</Label>
            <Textarea id="notes" placeholder="Any additional notes about this booking..." />
          </div>
        </CardContent>
      </Card>

      {/* Payment Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Payment Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="securityDeposit">Security Deposit (₹) *</Label>
              <Input
                id="securityDeposit"
                type="number"
                value={securityDeposit}
                onChange={(e) => setSecurityDeposit(e.target.value)}
                placeholder="Enter security deposit"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bookingAmount">Total Booking Amount (₹) *</Label>
              <Input
                id="bookingAmount"
                type="number"
                value={bookingAmount}
                onChange={(e) => setBookingAmount(e.target.value)}
                placeholder="Enter total amount"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentMethod">Payment Method *</Label>
            <Select required>
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="card">Credit/Debit Card</SelectItem>
                <SelectItem value="upi">UPI</SelectItem>
                <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                <SelectItem value="cheque">Cheque</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {selectedRoom && (
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium mb-2">Payment Breakdown</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Monthly Rent:</span>
                  <span>₹{selectedRoom.rent.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Security Deposit:</span>
                  <span>₹{securityDeposit ? Number.parseInt(securityDeposit).toLocaleString() : "0"}</span>
                </div>
                <div className="border-t pt-1 flex justify-between font-medium">
                  <span>Total Amount:</span>
                  <span>₹{bookingAmount ? Number.parseInt(bookingAmount).toLocaleString() : "0"}</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Submit Buttons */}
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating Booking..." : "Create Booking"}
        </Button>
      </div>
    </form>
  )
}
