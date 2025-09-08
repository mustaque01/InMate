"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RefreshCw, DollarSign, CheckCircle, XCircle, Clock, Plus } from "lucide-react"

interface Refund {
  id: string
  amount: number
  reason: string
  status: string
  processedDate: string | null
  refundMethod: string | null
  reference: string | null
  notes: string | null
  createdAt: string
  payment: {
    id: string
    amount: number
    type: string
    user: {
      id: string
      name: string
      studentId: string
      email: string
      phone: string
    }
  }
  user: {
    id: string
    name: string
    studentId: string
  }
}

export function RefundManager() {
  const [refunds, setRefunds] = useState<Refund[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  const [processingRefund, setProcessingRefund] = useState<string | null>(null)

  // Form state for new refund
  const [isCreating, setIsCreating] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState("")
  const [refundAmount, setRefundAmount] = useState("")
  const [refundReason, setRefundReason] = useState("")
  const [paidPayments, setPaidPayments] = useState([])

  useEffect(() => {
    fetchRefunds()
    fetchPaidPayments()
  }, [filter])

  const fetchRefunds = async () => {
    try {
      const params = filter !== 'all' ? `?status=${filter}` : ''
      const response = await fetch(`/api/payments/refunds${params}`)
      const data = await response.json()
      setRefunds(data)
    } catch (error) {
      console.error('Error fetching refunds:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchPaidPayments = async () => {
    try {
      const response = await fetch('/api/payments?status=PAID')
      const data = await response.json()
      setPaidPayments(data)
    } catch (error) {
      console.error('Error fetching paid payments:', error)
    }
  }

  const createRefund = async () => {
    try {
      setIsCreating(true)
      const payment = paidPayments.find((p: any) => p.id === selectedPayment)
      
      const response = await fetch('/api/payments/refunds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          paymentId: selectedPayment,
          userId: payment?.userId,
          amount: parseFloat(refundAmount),
          reason: refundReason
        })
      })

      if (response.ok) {
        fetchRefunds()
        setSelectedPayment("")
        setRefundAmount("")
        setRefundReason("")
        alert('Refund request created successfully!')
      } else {
        alert('Failed to create refund request')
      }
    } catch (error) {
      console.error('Error creating refund:', error)
      alert('Error creating refund request')
    } finally {
      setIsCreating(false)
    }
  }

  const processRefund = async (refundId: string, action: 'approve' | 'reject', notes?: string) => {
    try {
      setProcessingRefund(refundId)
      
      const response = await fetch(`/api/payments/refunds/${refundId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: action === 'approve' ? 'APPROVED' : 'REJECTED',
          notes
        })
      })

      if (response.ok) {
        fetchRefunds()
        alert(`Refund ${action}d successfully!`)
      } else {
        alert(`Failed to ${action} refund`)
      }
    } catch (error) {
      console.error(`Error ${action}ing refund:`, error)
      alert(`Error ${action}ing refund`)
    } finally {
      setProcessingRefund(null)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Clock className="h-4 w-4 text-yellow-400" />
      case 'APPROVED':
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case 'PROCESSED':
        return <CheckCircle className="h-4 w-4 text-blue-400" />
      case 'REJECTED':
        return <XCircle className="h-4 w-4 text-red-400" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-400'
      case 'APPROVED':
        return 'bg-green-500/20 text-green-300 border-green-400'
      case 'PROCESSED':
        return 'bg-blue-500/20 text-blue-300 border-blue-400'
      case 'REJECTED':
        return 'bg-red-500/20 text-red-300 border-red-400'
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-400'
    }
  }

  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Refund Management</h2>
        
        <div className="flex gap-4">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-white hover:bg-white/10">All Refunds</SelectItem>
              <SelectItem value="PENDING" className="text-white hover:bg-white/10">Pending</SelectItem>
              <SelectItem value="APPROVED" className="text-white hover:bg-white/10">Approved</SelectItem>
              <SelectItem value="PROCESSED" className="text-white hover:bg-white/10">Processed</SelectItem>
              <SelectItem value="REJECTED" className="text-white hover:bg-white/10">Rejected</SelectItem>
            </SelectContent>
          </Select>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                New Refund
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-700 text-white">
              <DialogHeader>
                <DialogTitle>Create Refund Request</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="payment">Select Payment</Label>
                  <Select value={selectedPayment} onValueChange={setSelectedPayment}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Choose a paid payment" />
                    </SelectTrigger>
                    <SelectContent>
                      {paidPayments.map((payment: any) => (
                        <SelectItem key={payment.id} value={payment.id} className="text-white hover:bg-white/10">
                          {payment.user.name} - {formatCurrency(payment.amount)} ({payment.type})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="amount">Refund Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={refundAmount}
                    onChange={(e) => setRefundAmount(e.target.value)}
                    placeholder="Enter refund amount"
                    className="bg-white/10 border-white/20 text-white placeholder:text-blue-300"
                  />
                </div>

                <div>
                  <Label htmlFor="reason">Reason</Label>
                  <Textarea
                    id="reason"
                    value={refundReason}
                    onChange={(e) => setRefundReason(e.target.value)}
                    placeholder="Enter reason for refund"
                    className="bg-white/10 border-white/20 text-white placeholder:text-blue-300"
                    rows={3}
                  />
                </div>

                <Button 
                  onClick={createRefund}
                  disabled={!selectedPayment || !refundAmount || !refundReason || isCreating}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {isCreating ? 'Creating...' : 'Create Refund'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Refunds List */}
      <Card className="bg-white/10 backdrop-blur-md border border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Refund Requests</CardTitle>
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
              {refunds.map((refund) => (
                <div key={refund.id} className="p-4 border border-white/20 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusIcon(refund.status)}
                        <h4 className="font-medium text-white">{refund.payment.user.name}</h4>
                        <Badge variant="outline" className={getStatusColor(refund.status)}>
                          {refund.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm text-blue-200 mb-3">
                        <div>
                          <span className="font-medium">Student ID:</span> {refund.payment.user.studentId}
                        </div>
                        <div>
                          <span className="font-medium">Original Amount:</span> {formatCurrency(refund.payment.amount)}
                        </div>
                        <div>
                          <span className="font-medium">Refund Amount:</span> {formatCurrency(refund.amount)}
                        </div>
                        <div>
                          <span className="font-medium">Payment Type:</span> {refund.payment.type}
                        </div>
                        <div>
                          <span className="font-medium">Requested:</span> {new Date(refund.createdAt).toLocaleDateString()}
                        </div>
                        {refund.processedDate && (
                          <div>
                            <span className="font-medium">Processed:</span> {new Date(refund.processedDate).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                      
                      <div className="mb-3 p-3 bg-white/5 rounded border border-white/10">
                        <p className="text-sm text-blue-300">
                          <span className="font-medium">Reason:</span> {refund.reason}
                        </p>
                      </div>

                      {refund.notes && (
                        <div className="mb-3 p-3 bg-white/5 rounded border border-white/10">
                          <p className="text-sm text-blue-300">
                            <span className="font-medium">Notes:</span> {refund.notes}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    {refund.status === 'PENDING' && (
                      <div className="flex gap-2 ml-4">
                        <Button
                          size="sm"
                          onClick={() => processRefund(refund.id, 'approve')}
                          disabled={processingRefund === refund.id}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => processRefund(refund.id, 'reject')}
                          disabled={processingRefund === refund.id}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {refunds.length === 0 && (
                <div className="text-center py-8 text-blue-300">
                  <RefreshCw className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No refunds found</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
