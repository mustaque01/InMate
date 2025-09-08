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
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Plus, FileText, Clock, CheckCircle, XCircle, Calendar as CalendarIconLucide } from "lucide-react"
import { cn } from "@/lib/utils"

interface LeaveApplication {
  id: string
  type: string
  startDate: string
  endDate: string
  reason: string
  status: string
  applicationDate: string
  responseDate: string | null
  adminResponse: string | null
  reviewedBy?: {
    id: string
    name: string
  }
}

export function LeaveApplicationSystem() {
  const [applications, setApplications] = useState<LeaveApplication[]>([])
  const [loading, setLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)

  // Form state
  const [type, setType] = useState("VACATION")
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [reason, setReason] = useState("")

  // Get user from session - you'll need to implement this
  const userId = "current-user-id" // This should come from your auth context

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      const response = await fetch(`/api/leave-applications?userId=${userId}`)
      const data = await response.json()
      setApplications(data.sort((a: any, b: any) => 
        new Date(b.applicationDate).getTime() - new Date(a.applicationDate).getTime()
      ))
    } catch (error) {
      console.error('Error fetching leave applications:', error)
    } finally {
      setLoading(false)
    }
  }

  const createApplication = async () => {
    if (!startDate || !endDate || !reason.trim()) {
      alert('Please fill in all required fields')
      return
    }

    try {
      setIsCreating(true)
      const response = await fetch('/api/leave-applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId,
          type,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          reason
        })
      })

      if (response.ok) {
        fetchApplications()
        setType("VACATION")
        setStartDate(undefined)
        setEndDate(undefined)
        setReason("")
        alert('Leave application submitted successfully!')
      } else {
        alert('Failed to submit leave application')
      }
    } catch (error) {
      console.error('Error creating leave application:', error)
      alert('Error submitting leave application')
    } finally {
      setIsCreating(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Clock className="h-4 w-4 text-yellow-400" />
      case 'APPROVED':
        return <CheckCircle className="h-4 w-4 text-green-400" />
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
      case 'REJECTED':
        return 'bg-red-500/20 text-red-300 border-red-400'
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-400'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'VACATION':
        return 'bg-blue-500/20 text-blue-300 border-blue-400'
      case 'SICK':
        return 'bg-red-500/20 text-red-300 border-red-400'
      case 'EMERGENCY':
        return 'bg-orange-500/20 text-orange-300 border-orange-400'
      case 'PERSONAL':
        return 'bg-purple-500/20 text-purple-300 border-purple-400'
      case 'FAMILY':
        return 'bg-pink-500/20 text-pink-300 border-pink-400'
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-400'
    }
  }

  const calculateDuration = (start: string, end: string) => {
    const startDate = new Date(start)
    const endDate = new Date(end)
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays === 1 ? '1 day' : `${diffDays} days`
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Leave Applications</h2>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Apply for Leave
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-md">
            <DialogHeader>
              <DialogTitle>Submit Leave Application</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="type">Leave Type</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="VACATION" className="text-white hover:bg-white/10">Vacation</SelectItem>
                    <SelectItem value="SICK" className="text-white hover:bg-white/10">Sick Leave</SelectItem>
                    <SelectItem value="EMERGENCY" className="text-white hover:bg-white/10">Emergency</SelectItem>
                    <SelectItem value="PERSONAL" className="text-white hover:bg-white/10">Personal</SelectItem>
                    <SelectItem value="FAMILY" className="text-white hover:bg-white/10">Family</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal bg-white/10 border-white/20 text-white hover:bg-white/20",
                          !startDate && "text-green-300"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label>End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal bg-white/10 border-white/20 text-white hover:bg-white/20",
                          !endDate && "text-green-300"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                        disabled={(date) => date < (startDate || new Date())}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div>
                <Label htmlFor="reason">Reason</Label>
                <Textarea
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Please provide a reason for your leave"
                  className="bg-white/10 border-white/20 text-white placeholder:text-green-300"
                  rows={3}
                />
              </div>

              <Button 
                onClick={createApplication}
                disabled={!startDate || !endDate || !reason.trim() || isCreating}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {isCreating ? 'Submitting...' : 'Submit Application'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {['PENDING', 'APPROVED', 'REJECTED', 'TOTAL'].map((stat) => {
          const count = stat === 'TOTAL' 
            ? applications.length 
            : applications.filter(app => app.status === stat).length
          
          return (
            <Card key={stat} className="bg-white/10 backdrop-blur-md border border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-300 text-sm font-medium">
                      {stat === 'TOTAL' ? 'Total Applications' : `${stat} Applications`}
                    </p>
                    <p className="text-3xl font-bold text-white">{count}</p>
                  </div>
                  <div className={cn(
                    "p-3 rounded-full",
                    stat === 'PENDING' && "bg-yellow-500/20",
                    stat === 'APPROVED' && "bg-green-500/20",
                    stat === 'REJECTED' && "bg-red-500/20",
                    stat === 'TOTAL' && "bg-blue-500/20"
                  )}>
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {loading ? (
          [...Array(3)].map((_, i) => (
            <Card key={i} className="bg-white/10 backdrop-blur-md border border-white/20">
              <CardContent className="p-6">
                <div className="animate-pulse space-y-3">
                  <div className="h-4 bg-white/20 rounded w-3/4"></div>
                  <div className="h-3 bg-white/20 rounded w-1/2"></div>
                  <div className="h-3 bg-white/20 rounded w-full"></div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          applications.map((application) => (
            <Card key={application.id} className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getStatusIcon(application.status)}
                      <h3 className="font-semibold text-white text-lg">
                        {application.type.replace('_', ' ')} Leave
                      </h3>
                    </div>
                    <div className="flex gap-2 mb-3">
                      <Badge variant="outline" className={getStatusColor(application.status)}>
                        {application.status}
                      </Badge>
                      <Badge variant="outline" className={getTypeColor(application.type)}>
                        {application.type}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right text-sm text-green-300">
                    <div>Applied: {new Date(application.applicationDate).toLocaleDateString()}</div>
                    {application.responseDate && (
                      <div>Reviewed: {new Date(application.responseDate).toLocaleDateString()}</div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2 p-3 bg-white/5 rounded border border-white/10">
                    <CalendarIconLucide className="h-4 w-4 text-green-400" />
                    <div>
                      <p className="text-xs text-green-300">Start Date</p>
                      <p className="text-white font-medium">
                        {new Date(application.startDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-white/5 rounded border border-white/10">
                    <CalendarIconLucide className="h-4 w-4 text-green-400" />
                    <div>
                      <p className="text-xs text-green-300">End Date</p>
                      <p className="text-white font-medium">
                        {new Date(application.endDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-white/5 rounded border border-white/10">
                    <Clock className="h-4 w-4 text-green-400" />
                    <div>
                      <p className="text-xs text-green-300">Duration</p>
                      <p className="text-white font-medium">
                        {calculateDuration(application.startDate, application.endDate)}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4 p-4 bg-white/5 rounded border border-white/10">
                  <p className="text-xs text-green-300 mb-1">Reason</p>
                  <p className="text-white leading-relaxed">{application.reason}</p>
                </div>

                {application.reviewedBy && (
                  <div className="mb-3 text-sm text-green-200">
                    <span className="font-medium">Reviewed by:</span> {application.reviewedBy.name}
                  </div>
                )}

                {application.adminResponse && (
                  <div className={cn(
                    "p-4 rounded border",
                    application.status === 'APPROVED' 
                      ? "bg-green-500/10 border-green-400/20"
                      : "bg-red-500/10 border-red-400/20"
                  )}>
                    <div className="flex items-center gap-2 mb-2">
                      {application.status === 'APPROVED' ? (
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-400" />
                      )}
                      <span className={cn(
                        "font-medium",
                        application.status === 'APPROVED' ? "text-green-300" : "text-red-300"
                      )}>
                        Admin Response
                      </span>
                    </div>
                    <p className={cn(
                      application.status === 'APPROVED' ? "text-green-200" : "text-red-200"
                    )}>
                      {application.adminResponse}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
        
        {!loading && applications.length === 0 && (
          <Card className="bg-white/10 backdrop-blur-md border border-white/20">
            <CardContent className="p-12 text-center">
              <FileText className="h-12 w-12 mx-auto mb-4 text-green-300 opacity-50" />
              <h3 className="text-lg font-medium text-white mb-2">No leave applications</h3>
              <p className="text-green-300">You haven't submitted any leave applications yet.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
