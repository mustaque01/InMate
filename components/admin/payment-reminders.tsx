"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Bell, Send, MessageSquare, Clock, CheckCircle, XCircle } from "lucide-react"

interface PaymentReminder {
  id: string
  type: string
  sentDate: string
  status: string
  method: string
  message: string
  payment: {
    id: string
    amount: number
    dueDate: string
    status: string
    user: {
      id: string
      name: string
      studentId: string
      email: string
      phone: string
    }
  }
}

export function PaymentReminderManager() {
  const [reminders, setReminders] = useState<PaymentReminder[]>([])
  const [loading, setLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)

  // Form state
  const [selectedPayment, setSelectedPayment] = useState("")
  const [reminderType, setReminderType] = useState("DUE_DATE")
  const [method, setMethod] = useState("email")
  const [message, setMessage] = useState("")
  const [pendingPayments, setPendingPayments] = useState([])

  useEffect(() => {
    fetchReminders()
    fetchPendingPayments()
  }, [])

  const fetchReminders = async () => {
    try {
      const response = await fetch('/api/payments/reminders')
      const data = await response.json()
      setReminders(data)
    } catch (error) {
      console.error('Error fetching reminders:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchPendingPayments = async () => {
    try {
      const response = await fetch('/api/payments?status=PENDING')
      const data = await response.json()
      setPendingPayments(data)
    } catch (error) {
      console.error('Error fetching pending payments:', error)
    }
  }

  const createReminder = async () => {
    try {
      setIsCreating(true)
      const response = await fetch('/api/payments/reminders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          paymentId: selectedPayment,
          type: reminderType,
          method,
          message
        })
      })

      if (response.ok) {
        fetchReminders()
        // Reset form
        setSelectedPayment("")
        setMessage("")
        alert('Reminder sent successfully!')
      } else {
        alert('Failed to send reminder')
      }
    } catch (error) {
      console.error('Error creating reminder:', error)
      alert('Error sending reminder')
    } finally {
      setIsCreating(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'SENT':
        return <Send className="h-4 w-4 text-blue-400" />
      case 'DELIVERED':
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case 'FAILED':
        return <XCircle className="h-4 w-4 text-red-400" />
      default:
        return <Clock className="h-4 w-4 text-yellow-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SENT':
        return 'bg-blue-500/20 text-blue-300 border-blue-400'
      case 'DELIVERED':
        return 'bg-green-500/20 text-green-300 border-green-400'
      case 'FAILED':
        return 'bg-red-500/20 text-red-300 border-red-400'
      default:
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-400'
    }
  }

  const getReminderTypeText = (type: string) => {
    switch (type) {
      case 'DUE_DATE':
        return 'Due Date'
      case 'OVERDUE':
        return 'Overdue'
      case 'FINAL_NOTICE':
        return 'Final Notice'
      case 'LATE_FEE':
        return 'Late Fee'
      default:
        return type
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Payment Reminders</h2>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Bell className="h-4 w-4 mr-2" />
              Send Reminder
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-700 text-white">
            <DialogHeader>
              <DialogTitle>Send Payment Reminder</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="payment">Select Payment</Label>
                <Select value={selectedPayment} onValueChange={setSelectedPayment}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Choose a pending payment" />
                  </SelectTrigger>
                  <SelectContent>
                    {pendingPayments.map((payment: any) => (
                      <SelectItem key={payment.id} value={payment.id} className="text-white hover:bg-white/10">
                        {payment.user.name} - ₹{payment.amount} (Due: {new Date(payment.dueDate).toLocaleDateString()})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="type">Reminder Type</Label>
                <Select value={reminderType} onValueChange={setReminderType}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DUE_DATE" className="text-white hover:bg-white/10">Due Date Reminder</SelectItem>
                    <SelectItem value="OVERDUE" className="text-white hover:bg-white/10">Overdue Notice</SelectItem>
                    <SelectItem value="FINAL_NOTICE" className="text-white hover:bg-white/10">Final Notice</SelectItem>
                    <SelectItem value="LATE_FEE" className="text-white hover:bg-white/10">Late Fee Notice</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="method">Method</Label>
                <Select value={method} onValueChange={setMethod}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email" className="text-white hover:bg-white/10">Email</SelectItem>
                    <SelectItem value="sms" className="text-white hover:bg-white/10">SMS</SelectItem>
                    <SelectItem value="push" className="text-white hover:bg-white/10">Push Notification</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter your reminder message..."
                  className="bg-white/10 border-white/20 text-white placeholder:text-blue-300"
                  rows={4}
                />
              </div>

              <Button 
                onClick={createReminder}
                disabled={!selectedPayment || !message || isCreating}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {isCreating ? 'Sending...' : 'Send Reminder'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Reminders List */}
      <Card className="bg-white/10 backdrop-blur-md border border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Recent Reminders</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="animate-pulse space-y-3 p-4 border border-white/20 rounded-lg">
                  <div className="h-4 bg-white/20 rounded w-3/4"></div>
                  <div className="h-3 bg-white/20 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {reminders.map((reminder) => (
                <div key={reminder.id} className="p-4 border border-white/20 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusIcon(reminder.status)}
                        <h4 className="font-medium text-white">{reminder.payment.user.name}</h4>
                        <Badge variant="outline" className={getStatusColor(reminder.status)}>
                          {reminder.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm text-blue-200">
                        <div>
                          <span className="font-medium">Student ID:</span> {reminder.payment.user.studentId}
                        </div>
                        <div>
                          <span className="font-medium">Amount:</span> ₹{reminder.payment.amount}
                        </div>
                        <div>
                          <span className="font-medium">Type:</span> {getReminderTypeText(reminder.type)}
                        </div>
                        <div>
                          <span className="font-medium">Method:</span> {reminder.method}
                        </div>
                        <div>
                          <span className="font-medium">Sent:</span> {new Date(reminder.sentDate).toLocaleDateString()}
                        </div>
                        <div>
                          <span className="font-medium">Due Date:</span> {new Date(reminder.payment.dueDate).toLocaleDateString()}
                        </div>
                      </div>
                      
                      <div className="mt-3 p-3 bg-white/5 rounded border border-white/10">
                        <p className="text-sm text-blue-300">
                          <MessageSquare className="h-4 w-4 inline mr-1" />
                          {reminder.message}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {reminders.length === 0 && (
                <div className="text-center py-8 text-blue-300">
                  <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No reminders sent yet</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
