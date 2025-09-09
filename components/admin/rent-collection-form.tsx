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
import { mockPendingStudents } from "@/lib/mock-data"

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
        <Card className="bg-white/10 backdrop-blur-md border border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Users className="h-5 w-5" />
              Select Student
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="student" className="text-blue-200">Student with Pending Rent *</Label>
              <Select
                required
                onValueChange={(value) => {
                  const student = mockPendingStudents.find((s) => s.id.toString() === value)
                  setSelectedStudent(student)
                }}
              >
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select a student" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/20">
                  {mockPendingStudents.map((student) => (
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
                          <div className="text-xs text-blue-200">
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
              <div className="p-3 bg-red-900/30 backdrop-blur-sm rounded-lg border border-red-400/30">
                <div className="flex items-center gap-3 mb-3">
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
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-200">Room:</span>
                    <span className="font-medium text-white">{selectedStudent.room}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-200">Monthly Rent:</span>
                    <span className="font-medium text-white">₹{selectedStudent.monthlyRent.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-200">Due Date:</span>
                    <span className="font-medium text-white">{new Date(selectedStudent.dueDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-red-300">
                    <span>Days Overdue:</span>
                    <Badge className="bg-red-600 text-white">{selectedStudent.daysOverdue} days</Badge>
                  </div>
                  {selectedStudent.lateFee > 0 && (
                    <div className="flex justify-between text-red-300">
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
        <Card className="bg-white/10 backdrop-blur-md border border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <DollarSign className="h-5 w-5" />
              Payment Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-blue-200">Payment Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-white/10 border-white/20 text-white hover:bg-white/20",
                      !paymentDate && "text-blue-300",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {paymentDate ? format(paymentDate, "PPP") : "Select payment date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-slate-800 border-white/20">
                  <Calendar mode="single" selected={paymentDate} onSelect={setPaymentDate} required className="text-white" />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentMethod" className="text-blue-200">Payment Method *</Label>
              <Select required value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/20">
                  <SelectItem value="cash" className="text-white hover:bg-white/10">Cash</SelectItem>
                  <SelectItem value="upi" className="text-white hover:bg-white/10">UPI</SelectItem>
                  <SelectItem value="card" className="text-white hover:bg-white/10">Credit/Debit Card</SelectItem>
                  <SelectItem value="bank-transfer" className="text-white hover:bg-white/10">Bank Transfer</SelectItem>
                  <SelectItem value="cheque" className="text-white hover:bg-white/10">Cheque</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {paymentMethod === "cheque" && (
              <div className="space-y-2">
                <Label htmlFor="chequeNumber" className="text-blue-200">Cheque Number</Label>
                <Input id="chequeNumber" placeholder="Enter cheque number" className="bg-white/10 border-white/20 text-white placeholder:text-blue-300" />
              </div>
            )}

            {paymentMethod === "upi" && (
              <div className="space-y-2">
                <Label htmlFor="transactionId" className="text-blue-200">Transaction ID</Label>
                <Input id="transactionId" placeholder="Enter UPI transaction ID" className="bg-white/10 border-white/20 text-white placeholder:text-blue-300" />
              </div>
            )}

            {selectedStudent && selectedStudent.lateFee > 0 && (
              <div className="flex items-center space-x-2">
                <Checkbox id="lateFee" checked={includeLateFee} onCheckedChange={(checked) => setIncludeLateFee(checked === true)} className="border-white/20 data-[state=checked]:bg-blue-600" />
                <Label htmlFor="lateFee" className="text-sm text-blue-200">
                  Include late fee of ₹{selectedStudent.lateFee}
                </Label>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="paymentAmount" className="text-blue-200">Payment Amount (₹) *</Label>
              <Input
                id="paymentAmount"
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                placeholder="Enter payment amount"
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-blue-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes" className="text-blue-200">Payment Notes</Label>
              <Textarea id="notes" placeholder="Any additional notes about this payment..." className="bg-white/10 border-white/20 text-white placeholder:text-blue-300" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Summary */}
      {selectedStudent && (
        <Card className="bg-white/10 backdrop-blur-md border border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Receipt className="h-5 w-5" />
              Payment Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-blue-200">Student:</span>
                  <span className="font-medium text-white">{selectedStudent.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-200">Room:</span>
                  <span className="font-medium text-white">{selectedStudent.room}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-200">Month:</span>
                  <span className="font-medium text-white">December 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-200">Payment Method:</span>
                  <span className="font-medium text-white capitalize">{paymentMethod || "Not selected"}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-blue-200">Monthly Rent:</span>
                  <span className="font-medium text-white">₹{selectedStudent.monthlyRent.toLocaleString()}</span>
                </div>
                {includeLateFee && (
                  <div className="flex justify-between text-red-300">
                    <span>Late Fee:</span>
                    <span className="font-medium">₹{selectedStudent.lateFee}</span>
                  </div>
                )}
                <div className="border-t border-white/20 pt-2 flex justify-between text-lg font-bold text-white">
                  <span>Total Amount:</span>
                  <span>₹{paymentAmount ? Number.parseInt(paymentAmount).toLocaleString() : "0"}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="flex items-center space-x-2">
                <Checkbox id="generateReceipt" checked={generateReceipt} onCheckedChange={(checked) => setGenerateReceipt(checked === true)} className="border-white/20 data-[state=checked]:bg-blue-600" />
                <Label htmlFor="generateReceipt" className="text-sm text-blue-200">
                  Generate and download PDF receipt
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Submit Buttons */}
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()} className="border-white/20 text-blue-200 hover:bg-white/10">
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading || !selectedStudent} className="bg-blue-600 hover:bg-blue-700 text-white">
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
