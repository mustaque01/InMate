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
import { Checkbox } from "@/components/ui/checkbox"
import { CalendarIcon, Users, DollarSign, Receipt, Download } from "lucide-react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

// Mock data for students with pending rent
const mockPendingStudents = [
  {
    id: 1,
    name: "Priya Patel",
    email: "priya.patel@email.com",
    photo: "/diverse-female-student.png",
    room: "B-205",
    monthlyRent: 8500,
    dueDate: "2024-12-01",
    daysOverdue: 15,
    lateFee: 500,
  },
  {
    id: 2,
    name: "Vikash Yadav",
    email: "vikash.yadav@email.com",
    photo: "/male-student-studying.png",
    room: "D-301",
    monthlyRent: 8500,
    dueDate: "2024-12-01",
    daysOverdue: 8,
    lateFee: 200,
  },
]

export function RentCollectionForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [paymentDate, setPaymentDate] = useState<Date>(new Date())
  const [paymentAmount, setPaymentAmount] = useState("")
  const [includeLateFee, setIncludeLateFee] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("")
  const [generateReceipt, setGenerateReceipt] = useState(true)

  // Auto-calculate payment amount when student is selected
  useEffect(() => {
    if (selectedStudent) {
      const baseAmount = selectedStudent.monthlyRent
      const lateFee = includeLateFee ? selectedStudent.lateFee : 0
      setPaymentAmount((baseAmount + lateFee).toString())
    }
  }, [selectedStudent, includeLateFee])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      if (generateReceipt) {
        alert("Payment recorded successfully! Receipt generated and downloaded.")
      } else {
        alert("Payment recorded successfully!")
      }
      router.push("/admin/rent")
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
              <Label htmlFor="student">Student with Pending Rent *</Label>
              <Select
                required
                onValueChange={(value) => {
                  const student = mockPendingStudents.find((s) => s.id.toString() === value)
                  setSelectedStudent(student)
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a student" />
                </SelectTrigger>
                <SelectContent>
                  {mockPendingStudents.map((student) => (
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
                          <div className="text-xs text-gray-500">
                            {student.room} • {student.daysOverdue} days overdue
                          </div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedStudent && (
              <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center gap-3 mb-3">
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
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Room:</span>
                    <span className="font-medium">{selectedStudent.room}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Rent:</span>
                    <span className="font-medium">₹{selectedStudent.monthlyRent.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Due Date:</span>
                    <span className="font-medium">{new Date(selectedStudent.dueDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-red-600">
                    <span>Days Overdue:</span>
                    <Badge variant="destructive">{selectedStudent.daysOverdue} days</Badge>
                  </div>
                  {selectedStudent.lateFee > 0 && (
                    <div className="flex justify-between text-red-600">
                      <span>Late Fee:</span>
                      <span className="font-medium">₹{selectedStudent.lateFee}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
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
            <div className="space-y-2">
              <Label>Payment Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !paymentDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {paymentDate ? format(paymentDate, "PPP") : "Select payment date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={paymentDate} onSelect={setPaymentDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Payment Method *</Label>
              <Select required value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="upi">UPI</SelectItem>
                  <SelectItem value="card">Credit/Debit Card</SelectItem>
                  <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                  <SelectItem value="cheque">Cheque</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {paymentMethod === "cheque" && (
              <div className="space-y-2">
                <Label htmlFor="chequeNumber">Cheque Number</Label>
                <Input id="chequeNumber" placeholder="Enter cheque number" />
              </div>
            )}

            {paymentMethod === "upi" && (
              <div className="space-y-2">
                <Label htmlFor="transactionId">Transaction ID</Label>
                <Input id="transactionId" placeholder="Enter UPI transaction ID" />
              </div>
            )}

            {selectedStudent && selectedStudent.lateFee > 0 && (
              <div className="flex items-center space-x-2">
                <Checkbox id="lateFee" checked={includeLateFee} onCheckedChange={setIncludeLateFee} />
                <Label htmlFor="lateFee" className="text-sm">
                  Include late fee of ₹{selectedStudent.lateFee}
                </Label>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="paymentAmount">Payment Amount (₹) *</Label>
              <Input
                id="paymentAmount"
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                placeholder="Enter payment amount"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Payment Notes</Label>
              <Textarea id="notes" placeholder="Any additional notes about this payment..." />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Summary */}
      {selectedStudent && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5" />
              Payment Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Student:</span>
                  <span className="font-medium">{selectedStudent.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Room:</span>
                  <span className="font-medium">{selectedStudent.room}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Month:</span>
                  <span className="font-medium">December 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="font-medium capitalize">{paymentMethod || "Not selected"}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Rent:</span>
                  <span className="font-medium">₹{selectedStudent.monthlyRent.toLocaleString()}</span>
                </div>
                {includeLateFee && (
                  <div className="flex justify-between text-red-600">
                    <span>Late Fee:</span>
                    <span className="font-medium">₹{selectedStudent.lateFee}</span>
                  </div>
                )}
                <div className="border-t pt-2 flex justify-between text-lg font-bold">
                  <span>Total Amount:</span>
                  <span>₹{paymentAmount ? Number.parseInt(paymentAmount).toLocaleString() : "0"}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center space-x-2">
                <Checkbox id="generateReceipt" checked={generateReceipt} onCheckedChange={setGenerateReceipt} />
                <Label htmlFor="generateReceipt" className="text-sm">
                  Generate and download PDF receipt
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Submit Buttons */}
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading || !selectedStudent}>
          {isLoading ? (
            "Processing Payment..."
          ) : (
            <>
              <DollarSign className="h-4 w-4 mr-2" />
              Record Payment
              {generateReceipt && (
                <>
                  {" & "}
                  <Download className="h-4 w-4 ml-1" />
                </>
              )}
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
