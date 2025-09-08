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
import { Plus, MessageSquare, Clock, CheckCircle, XCircle, AlertTriangle, Search } from "lucide-react"

interface Complaint {
  id: string
  title: string
  description: string
  category: string
  priority: string
  status: string
  createdAt: string
  resolvedAt: string | null
  resolution: string | null
  assignedAdmin?: {
    id: string
    name: string
  }
}

export function StudentComplaintSystem() {
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreating, setIsCreating] = useState(false)

  // Form state
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("MAINTENANCE")
  const [priority, setPriority] = useState("MEDIUM")

  // Get user from session - you'll need to implement this
  const userId = "current-user-id" // This should come from your auth context

  useEffect(() => {
    fetchComplaints()
  }, [filter])

  const fetchComplaints = async () => {
    try {
      const params = new URLSearchParams()
      params.append('userId', userId)
      if (filter !== 'all') params.append('status', filter)
      
      const response = await fetch(`/api/complaints?${params}`)
      const data = await response.json()
      setComplaints(data)
    } catch (error) {
      console.error('Error fetching complaints:', error)
    } finally {
      setLoading(false)
    }
  }

  const createComplaint = async () => {
    try {
      setIsCreating(true)
      const response = await fetch('/api/complaints', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId,
          title,
          description,
          category,
          priority
        })
      })

      if (response.ok) {
        fetchComplaints()
        setTitle("")
        setDescription("")
        setCategory("MAINTENANCE")
        setPriority("MEDIUM")
        alert('Complaint submitted successfully!')
      } else {
        alert('Failed to submit complaint')
      }
    } catch (error) {
      console.error('Error creating complaint:', error)
      alert('Error submitting complaint')
    } finally {
      setIsCreating(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'OPEN':
        return <Clock className="h-4 w-4 text-yellow-400" />
      case 'IN_PROGRESS':
        return <AlertTriangle className="h-4 w-4 text-blue-400" />
      case 'RESOLVED':
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case 'CLOSED':
        return <XCircle className="h-4 w-4 text-gray-400" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-400'
      case 'IN_PROGRESS':
        return 'bg-blue-500/20 text-blue-300 border-blue-400'
      case 'RESOLVED':
        return 'bg-green-500/20 text-green-300 border-green-400'
      case 'CLOSED':
        return 'bg-gray-500/20 text-gray-300 border-gray-400'
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-400'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'LOW':
        return 'bg-green-500/20 text-green-300 border-green-400'
      case 'MEDIUM':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-400'
      case 'HIGH':
        return 'bg-orange-500/20 text-orange-300 border-orange-400'
      case 'URGENT':
        return 'bg-red-500/20 text-red-300 border-red-400'
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-400'
    }
  }

  const filteredComplaints = complaints.filter(complaint =>
    complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    complaint.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">My Complaints</h2>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              New Complaint
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-700 text-white">
            <DialogHeader>
              <DialogTitle>Submit New Complaint</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Brief description of the issue"
                  className="bg-white/10 border-white/20 text-white placeholder:text-green-300"
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MAINTENANCE" className="text-white hover:bg-white/10">Maintenance</SelectItem>
                    <SelectItem value="CLEANING" className="text-white hover:bg-white/10">Cleaning</SelectItem>
                    <SelectItem value="SECURITY" className="text-white hover:bg-white/10">Security</SelectItem>
                    <SelectItem value="NOISE" className="text-white hover:bg-white/10">Noise</SelectItem>
                    <SelectItem value="ROOMMATE" className="text-white hover:bg-white/10">Roommate</SelectItem>
                    <SelectItem value="FACILITIES" className="text-white hover:bg-white/10">Facilities</SelectItem>
                    <SelectItem value="FOOD" className="text-white hover:bg-white/10">Food</SelectItem>
                    <SelectItem value="OTHER" className="text-white hover:bg-white/10">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LOW" className="text-white hover:bg-white/10">Low</SelectItem>
                    <SelectItem value="MEDIUM" className="text-white hover:bg-white/10">Medium</SelectItem>
                    <SelectItem value="HIGH" className="text-white hover:bg-white/10">High</SelectItem>
                    <SelectItem value="URGENT" className="text-white hover:bg-white/10">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detailed description of the issue"
                  className="bg-white/10 border-white/20 text-white placeholder:text-green-300"
                  rows={4}
                />
              </div>

              <Button 
                onClick={createComplaint}
                disabled={!title || !description || isCreating}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {isCreating ? 'Submitting...' : 'Submit Complaint'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and Search */}
      <Card className="bg-white/10 backdrop-blur-md border border-white/20">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-300 h-4 w-4" />
              <Input
                placeholder="Search complaints..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-green-300"
              />
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-white hover:bg-white/10">All Status</SelectItem>
                <SelectItem value="OPEN" className="text-white hover:bg-white/10">Open</SelectItem>
                <SelectItem value="IN_PROGRESS" className="text-white hover:bg-white/10">In Progress</SelectItem>
                <SelectItem value="RESOLVED" className="text-white hover:bg-white/10">Resolved</SelectItem>
                <SelectItem value="CLOSED" className="text-white hover:bg-white/10">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Complaints List */}
      <div className="space-y-4">
        {loading ? (
          [...Array(5)].map((_, i) => (
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
          filteredComplaints.map((complaint) => (
            <Card key={complaint.id} className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getStatusIcon(complaint.status)}
                      <h3 className="font-semibold text-white text-lg">{complaint.title}</h3>
                    </div>
                    <div className="flex gap-2 mb-3">
                      <Badge variant="outline" className={getStatusColor(complaint.status)}>
                        {complaint.status}
                      </Badge>
                      <Badge variant="outline" className={getPriorityColor(complaint.priority)}>
                        {complaint.priority}
                      </Badge>
                      <Badge variant="outline" className="bg-blue-500/20 text-blue-300 border-blue-400">
                        {complaint.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right text-sm text-green-300">
                    <div>Submitted: {new Date(complaint.createdAt).toLocaleDateString()}</div>
                    {complaint.resolvedAt && (
                      <div>Resolved: {new Date(complaint.resolvedAt).toLocaleDateString()}</div>
                    )}
                  </div>
                </div>
                
                <div className="mb-4 p-4 bg-white/5 rounded border border-white/10">
                  <p className="text-white leading-relaxed">{complaint.description}</p>
                </div>

                {complaint.assignedAdmin && (
                  <div className="mb-3 text-sm text-green-200">
                    <span className="font-medium">Assigned to:</span> {complaint.assignedAdmin.name}
                  </div>
                )}

                {complaint.resolution && (
                  <div className="p-4 bg-green-500/10 rounded border border-green-400/20">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span className="font-medium text-green-300">Resolution</span>
                    </div>
                    <p className="text-green-200">{complaint.resolution}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
        
        {!loading && filteredComplaints.length === 0 && (
          <Card className="bg-white/10 backdrop-blur-md border border-white/20">
            <CardContent className="p-12 text-center">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-green-300 opacity-50" />
              <h3 className="text-lg font-medium text-white mb-2">No complaints found</h3>
              <p className="text-green-300">
                {searchTerm ? 'No complaints match your search.' : 'You haven\'t submitted any complaints yet.'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
