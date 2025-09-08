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
import { Slider } from "@/components/ui/slider"
import { Plus, MessageSquare, Star, ThumbsUp, AlertTriangle, CheckCircle } from "lucide-react"

interface Feedback {
  id: string
  category: string
  rating: number
  subject: string
  message: string
  isAnonymous: boolean
  status: string
  createdAt: string
  responseDate: string | null
  adminResponse: string | null
  respondedBy?: {
    id: string
    name: string
  }
}

export function FeedbackSystem() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  const [isCreating, setIsCreating] = useState(false)

  // Form state
  const [category, setCategory] = useState("GENERAL")
  const [rating, setRating] = useState([5])
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(false)

  // Get user from session - you'll need to implement this
  const userId = "current-user-id" // This should come from your auth context

  useEffect(() => {
    fetchFeedbacks()
  }, [filter])

  const fetchFeedbacks = async () => {
    try {
      const params = new URLSearchParams()
      params.append('userId', userId)
      if (filter !== 'all') params.append('status', filter)
      
      const response = await fetch(`/api/feedback?${params}`)
      const data = await response.json()
      setFeedbacks(data.sort((a: any, b: any) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ))
    } catch (error) {
      console.error('Error fetching feedback:', error)
    } finally {
      setLoading(false)
    }
  }

  const createFeedback = async () => {
    if (!subject.trim() || !message.trim()) {
      alert('Please fill in all required fields')
      return
    }

    try {
      setIsCreating(true)
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId,
          category,
          rating: rating[0],
          subject,
          message,
          isAnonymous
        })
      })

      if (response.ok) {
        fetchFeedbacks()
        setCategory("GENERAL")
        setRating([5])
        setSubject("")
        setMessage("")
        setIsAnonymous(false)
        alert('Feedback submitted successfully!')
      } else {
        alert('Failed to submit feedback')
      }
    } catch (error) {
      console.error('Error creating feedback:', error)
      alert('Error submitting feedback')
    } finally {
      setIsCreating(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <AlertTriangle className="h-4 w-4 text-yellow-400" />
      case 'ACKNOWLEDGED':
        return <CheckCircle className="h-4 w-4 text-blue-400" />
      case 'RESPONDED':
        return <MessageSquare className="h-4 w-4 text-green-400" />
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-400'
      case 'ACKNOWLEDGED':
        return 'bg-blue-500/20 text-blue-300 border-blue-400'
      case 'RESPONDED':
        return 'bg-green-500/20 text-green-300 border-green-400'
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-400'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'GENERAL':
        return 'bg-blue-500/20 text-blue-300 border-blue-400'
      case 'ACCOMMODATION':
        return 'bg-purple-500/20 text-purple-300 border-purple-400'
      case 'FOOD':
        return 'bg-orange-500/20 text-orange-300 border-orange-400'
      case 'STAFF':
        return 'bg-pink-500/20 text-pink-300 border-pink-400'
      case 'FACILITIES':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
      case 'MAINTENANCE':
        return 'bg-red-500/20 text-red-300 border-red-400'
      case 'SECURITY':
        return 'bg-indigo-500/20 text-indigo-300 border-indigo-400'
      case 'SUGGESTION':
        return 'bg-green-500/20 text-green-300 border-green-400'
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-400'
    }
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-green-400'
    if (rating >= 3) return 'text-yellow-400'
    return 'text-red-400'
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating 
            ? `fill-current ${getRatingColor(rating)}` 
            : 'text-gray-400'
        }`}
      />
    ))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Feedback & Suggestions</h2>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Submit Feedback
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-md">
            <DialogHeader>
              <DialogTitle>Submit Feedback</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GENERAL" className="text-white hover:bg-white/10">General</SelectItem>
                    <SelectItem value="ACCOMMODATION" className="text-white hover:bg-white/10">Accommodation</SelectItem>
                    <SelectItem value="FOOD" className="text-white hover:bg-white/10">Food</SelectItem>
                    <SelectItem value="STAFF" className="text-white hover:bg-white/10">Staff</SelectItem>
                    <SelectItem value="FACILITIES" className="text-white hover:bg-white/10">Facilities</SelectItem>
                    <SelectItem value="MAINTENANCE" className="text-white hover:bg-white/10">Maintenance</SelectItem>
                    <SelectItem value="SECURITY" className="text-white hover:bg-white/10">Security</SelectItem>
                    <SelectItem value="SUGGESTION" className="text-white hover:bg-white/10">Suggestion</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="rating">Rating: {rating[0]}/5</Label>
                <div className="px-3 py-2">
                  <Slider
                    value={rating}
                    onValueChange={setRating}
                    max={5}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-green-300 mt-1">
                    <span>1 - Poor</span>
                    <span>3 - Average</span>
                    <span>5 - Excellent</span>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Brief summary of your feedback"
                  className="bg-white/10 border-white/20 text-white placeholder:text-green-300"
                />
              </div>

              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Detailed feedback or suggestion"
                  className="bg-white/10 border-white/20 text-white placeholder:text-green-300"
                  rows={4}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded border-white/20 bg-white/10"
                  aria-label="Submit feedback anonymously"
                />
                <Label htmlFor="anonymous" className="text-sm">Submit anonymously</Label>
              </div>

              <Button 
                onClick={createFeedback}
                disabled={!subject.trim() || !message.trim() || isCreating}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {isCreating ? 'Submitting...' : 'Submit Feedback'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {['PENDING', 'ACKNOWLEDGED', 'RESPONDED', 'TOTAL'].map((stat) => {
          const count = stat === 'TOTAL' 
            ? feedbacks.length 
            : feedbacks.filter(feedback => feedback.status === stat).length
          
          return (
            <Card key={stat} className="bg-white/10 backdrop-blur-md border border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-300 text-sm font-medium">
                      {stat === 'TOTAL' ? 'Total Feedback' : stat}
                    </p>
                    <p className="text-3xl font-bold text-white">{count}</p>
                  </div>
                  <div className="p-3 rounded-full bg-green-500/20">
                    <MessageSquare className="h-6 w-6 text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Filter */}
      <Card className="bg-white/10 backdrop-blur-md border border-white/20">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <Label htmlFor="filter" className="text-white">Filter by status:</Label>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-white hover:bg-white/10">All Status</SelectItem>
                <SelectItem value="PENDING" className="text-white hover:bg-white/10">Pending</SelectItem>
                <SelectItem value="ACKNOWLEDGED" className="text-white hover:bg-white/10">Acknowledged</SelectItem>
                <SelectItem value="RESPONDED" className="text-white hover:bg-white/10">Responded</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Feedback List */}
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
          feedbacks.map((feedback) => (
            <Card key={feedback.id} className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getStatusIcon(feedback.status)}
                      <h3 className="font-semibold text-white text-lg">{feedback.subject}</h3>
                      {feedback.isAnonymous && (
                        <Badge variant="outline" className="bg-gray-500/20 text-gray-300 border-gray-400">
                          Anonymous
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-2 mb-3">
                      <Badge variant="outline" className={getStatusColor(feedback.status)}>
                        {feedback.status}
                      </Badge>
                      <Badge variant="outline" className={getCategoryColor(feedback.category)}>
                        {feedback.category}
                      </Badge>
                      <div className="flex items-center gap-1">
                        {renderStars(feedback.rating)}
                        <span className={`text-sm font-medium ml-1 ${getRatingColor(feedback.rating)}`}>
                          {feedback.rating}/5
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right text-sm text-green-300">
                    <div>Submitted: {new Date(feedback.createdAt).toLocaleDateString()}</div>
                    {feedback.responseDate && (
                      <div>Responded: {new Date(feedback.responseDate).toLocaleDateString()}</div>
                    )}
                  </div>
                </div>
                
                <div className="mb-4 p-4 bg-white/5 rounded border border-white/10">
                  <p className="text-white leading-relaxed">{feedback.message}</p>
                </div>

                {feedback.respondedBy && (
                  <div className="mb-3 text-sm text-green-200">
                    <span className="font-medium">Responded by:</span> {feedback.respondedBy.name}
                  </div>
                )}

                {feedback.adminResponse && (
                  <div className="p-4 bg-green-500/10 rounded border border-green-400/20">
                    <div className="flex items-center gap-2 mb-2">
                      <ThumbsUp className="h-4 w-4 text-green-400" />
                      <span className="font-medium text-green-300">Admin Response</span>
                    </div>
                    <p className="text-green-200">{feedback.adminResponse}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
        
        {!loading && feedbacks.length === 0 && (
          <Card className="bg-white/10 backdrop-blur-md border border-white/20">
            <CardContent className="p-12 text-center">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-green-300 opacity-50" />
              <h3 className="text-lg font-medium text-white mb-2">No feedback submitted</h3>
              <p className="text-green-300">Share your thoughts and help us improve!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
