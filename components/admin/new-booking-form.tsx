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
import { mockAvailableStudents, mockAvailableRooms } from "@/lib/mock-data"

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
        <Card className="bg-white/10 backdrop-blur-md border border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Users className="h-5 w-5" />
              Select Student
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="student" className="text-blue-200">Student *</Label>
              <Select
                required
                onValueChange={(value) => {
                  const student = mockAvailableStudents.find((s) => s.id.toString() === value)
                  setSelectedStudent(student)
                }}
              >
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select a student" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/20">
                  {mockAvailableStudents.map((student) => (
                    <SelectItem key={student.id} value={student.id.toString()} className="text-white hover:bg-white/10">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={student.photo || "/placeholder.svg"} alt={student.name} />
                          <AvatarFallback className="text-xs bg-blue-600 text-white">
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-xs text-blue-200">{student.email}</div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedStudent && (
              <div className="p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedStudent.photo || "/placeholder.svg"} alt={selectedStudent.name} />
                    <AvatarFallback className="bg-blue-600 text-white">
                      {selectedStudent.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-white">{selectedStudent.name}</div>
                    <div className="text-sm text-blue-200">{selectedStudent.email}</div>
                    <div className="text-sm text-blue-200">{selectedStudent.phone}</div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Room Selection */}
        <Card className="bg-white/10 backdrop-blur-md border border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Building2 className="h-5 w-5" />
              Select Room & Bed
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="room" className="text-blue-200">Available Room *</Label>
              <Select
                required
                onValueChange={(value) => {
                  const room = mockAvailableRooms.find((r) => r.id.toString() === value)
                  setSelectedRoom(room)
                  setSelectedBed("") // Reset bed selection
                }}
              >
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select a room" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/20">
                  {mockAvailableRooms.map((room) => (
                    <SelectItem key={room.id} value={room.id.toString()} className="text-white hover:bg-white/10">
                      <div className="flex items-center justify-between w-full">
                        <div>
                          <div className="font-medium">{room.number}</div>
                          <div className="text-xs text-blue-200">
                            Floor {room.floor} • {room.type}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">₹{room.rent.toLocaleString()}</div>
                          <div className="text-xs text-blue-200">{room.availableBeds.length} beds available</div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedRoom && (
              <div className="space-y-2">
                <Label htmlFor="bed" className="text-blue-200">Select Bed *</Label>
                <Select required value={selectedBed} onValueChange={setSelectedBed}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select a bed" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-white/20">
                    {selectedRoom.availableBeds.map((bed: string) => (
                      <SelectItem key={bed} value={bed} className="text-white hover:bg-white/10">
                        {bed}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {selectedRoom && (
              <div className="p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-200">Room:</span>
                    <span className="font-medium text-white">{selectedRoom.number}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-200">Type:</span>
                    <Badge className="bg-blue-600 text-white">{selectedRoom.type}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-200">Monthly Rent:</span>
                    <span className="font-medium text-white">₹{selectedRoom.rent.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Booking Details */}
      <Card className="bg-white/10 backdrop-blur-md border border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <CalendarIcon className="h-5 w-5" />
            Booking Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-blue-200">Check-in Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-white/10 border-white/20 text-white hover:bg-white/20",
                      !checkInDate && "text-blue-300",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkInDate ? format(checkInDate, "PPP") : "Select check-in date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-slate-800 border-white/20">
                  <Calendar mode="single" selected={checkInDate} onSelect={setCheckInDate} initialFocus className="text-white" />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label className="text-blue-200">Next Rent Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-white/10 border-white/20 text-white hover:bg-white/20",
                      !nextRentDue && "text-blue-300",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {nextRentDue ? format(nextRentDue, "PPP") : "Auto-calculated"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-slate-800 border-white/20">
                  <Calendar mode="single" selected={nextRentDue} onSelect={setNextRentDue} initialFocus className="text-white" />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-blue-200">Booking Notes</Label>
            <Textarea id="notes" placeholder="Any additional notes about this booking..." className="bg-white/10 border-white/20 text-white placeholder:text-blue-300" />
          </div>
        </CardContent>
      </Card>

      {/* Payment Details */}
      <Card className="bg-white/10 backdrop-blur-md border border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <DollarSign className="h-5 w-5" />
            Payment Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="securityDeposit" className="text-blue-200">Security Deposit (₹) *</Label>
              <Input
                id="securityDeposit"
                type="number"
                value={securityDeposit}
                onChange={(e) => setSecurityDeposit(e.target.value)}
                placeholder="Enter security deposit"
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-blue-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bookingAmount" className="text-blue-200">Total Booking Amount (₹) *</Label>
              <Input
                id="bookingAmount"
                type="number"
                value={bookingAmount}
                onChange={(e) => setBookingAmount(e.target.value)}
                placeholder="Enter total amount"
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-blue-300"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentMethod" className="text-blue-200">Payment Method *</Label>
            <Select required>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-white/20">
                <SelectItem value="cash" className="text-white hover:bg-white/10">Cash</SelectItem>
                <SelectItem value="card" className="text-white hover:bg-white/10">Credit/Debit Card</SelectItem>
                <SelectItem value="upi" className="text-white hover:bg-white/10">UPI</SelectItem>
                <SelectItem value="bank-transfer" className="text-white hover:bg-white/10">Bank Transfer</SelectItem>
                <SelectItem value="cheque" className="text-white hover:bg-white/10">Cheque</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {selectedRoom && (
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <h4 className="font-medium mb-2 text-white">Payment Breakdown</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-200">Monthly Rent:</span>
                  <span className="text-white">₹{selectedRoom.rent.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-200">Security Deposit:</span>
                  <span className="text-white">₹{securityDeposit ? Number.parseInt(securityDeposit).toLocaleString() : "0"}</span>
                </div>
                <div className="border-t border-white/20 pt-1 flex justify-between font-medium">
                  <span className="text-blue-200">Total Amount:</span>
                  <span className="text-white">₹{bookingAmount ? Number.parseInt(bookingAmount).toLocaleString() : "0"}</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Submit Buttons */}
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()} className="border-white/20 text-blue-200 hover:bg-white/10">
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 text-white">
          {isLoading ? "Creating Booking..." : "Create Booking"}
        </Button>
      </div>
    </form>
  )
}
