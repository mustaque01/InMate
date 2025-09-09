"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, Clock, AlertTriangle, Calendar } from "lucide-react"

interface PaymentAnalytics {
  totalRevenue: {
    amount: number
    lateFees: number
    total: number
  }
  paymentsByType: Array<{
    type: string
    _sum: { amount: number }
    _count: number
  }>
  outstandingPayments: {
    amount: number
    count: number
  }
  monthlyTrend: Array<{
    month: string
    total: number
    rent: number
    fees: number
    lateFees: number
    count: number
  }>
  latePayments: {
    totalLateFees: number
    count: number
    details: Array<{
      lateFee: number
      user: {
        name: string
        studentId: string
      }
    }>
  }
}

export function PaymentAnalyticsOverview() {
  const [analytics, setAnalytics] = useState<PaymentAnalytics | null>(null)
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState("month")

  useEffect(() => {
    fetchAnalytics()
  }, [period])

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/payments/analytics?period=${period}`)
      const data = await response.json()
      setAnalytics(data)
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="border bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-6">
              <div className="space-y-3 animate-pulse">
                <div className="w-3/4 h-4 rounded bg-white/20"></div>
                <div className="w-1/2 h-8 rounded bg-white/20"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!analytics) return null

  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount)

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Payment Analytics</h2>
        <div className="flex gap-4">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-32 text-white bg-white/10 border-white/20">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month" className="text-white hover:bg-white/10">Last Month</SelectItem>
              <SelectItem value="quarter" className="text-white hover:bg-white/10">Last Quarter</SelectItem>
              <SelectItem value="year" className="text-white hover:bg-white/10">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            onClick={fetchAnalytics}
            variant="outline"
            className="text-blue-200 border-blue-300 hover:bg-blue-500/20"
          >
            Refresh
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-blue-200">Total Revenue</CardTitle>
            <DollarSign className="w-4 h-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{formatCurrency(analytics.totalRevenue.total)}</div>
            <p className="text-xs text-blue-300">
              Revenue: {formatCurrency(analytics.totalRevenue.amount)} | 
              Late Fees: {formatCurrency(analytics.totalRevenue.lateFees)}
            </p>
          </CardContent>
        </Card>

        <Card className="border bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-blue-200">Outstanding</CardTitle>
            <Clock className="w-4 h-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{formatCurrency(analytics.outstandingPayments.amount)}</div>
            <p className="text-xs text-blue-300">
              {analytics.outstandingPayments.count} pending payments
            </p>
          </CardContent>
        </Card>

        <Card className="border bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-blue-200">Late Payments</CardTitle>
            <AlertTriangle className="w-4 h-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{analytics.latePayments.count}</div>
            <p className="text-xs text-blue-300">
              Late fees: {formatCurrency(analytics.latePayments.totalLateFees)}
            </p>
          </CardContent>
        </Card>

        <Card className="border bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-blue-200">Payment Types</CardTitle>
            <Calendar className="w-4 h-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {analytics.paymentsByType.map((type) => (
                <div key={type.type} className="flex justify-between text-sm">
                  <span className="text-blue-300">{type.type}</span>
                  <span className="text-white">{type._count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trend */}
      <Card className="border bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Monthly Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.monthlyTrend.map((month) => (
              <div key={month.month} className="flex items-center justify-between p-4 border rounded-lg border-white/20 bg-white/5">
                <div>
                  <h4 className="font-medium text-white">{month.month}</h4>
                  <p className="text-sm text-blue-300">{month.count} payments</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-white">{formatCurrency(month.total)}</div>
                  <div className="text-sm text-blue-300">
                    Rent: {formatCurrency(month.rent)} | Fees: {formatCurrency(month.fees)}
                  </div>
                  {month.lateFees > 0 && (
                    <div className="text-sm text-red-400">
                      Late Fees: {formatCurrency(month.lateFees)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Late Payments */}
      {analytics.latePayments.details.length > 0 && (
        <Card className="border bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Recent Late Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.latePayments.details.slice(0, 10).map((payment, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg border-white/20 bg-white/5">
                  <div>
                    <h4 className="font-medium text-white">{payment.user.name}</h4>
                    <p className="text-sm text-blue-300">ID: {payment.user.studentId}</p>
                  </div>
                  <Badge variant="destructive" className="text-red-300 border-red-400 bg-red-500/20">
                    {formatCurrency(payment.lateFee)} late fee
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
