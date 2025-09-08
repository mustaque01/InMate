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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Plus, 
  Users, 
  MessageCircle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Search,
  UserPlus,
  MessageSquare
} from "lucide-react"

interface RoommateRequest {
  id: string
  type: 'FIND_ROOMMATE' | 'ROOM_CHANGE' | 'SWAP_ROOMS'
  preferredGender?: string
  preferredRoomType?: string
  preferredFloor?: string
  studyHabits?: string
  sleepSchedule?: string
  cleanliness?: string
  description: string
  status: string
  createdAt: string
  resolvedAt: string | null
  currentRoom?: {
    id: string
    number: string
    type: string
  }
  targetRoom?: {
    id: string
    number: string
    type: string
  }
}

interface RoommateResponse {
  id: string
  requestId: string
  responderUserId: string
  message: string
  status: string
  createdAt: string
  responder: {
    id: string
    name: string
    email: string
    room?: {
      id: string
      number: string
      type: string
    }
  }
}

export function RoommateFinder() {
  const [requests, setRequests] = useState<RoommateRequest[]>([])
  const [responses, setResponses] = useState<RoommateResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("my-requests")
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreating, setIsCreating] = useState(false)

  // Form state
  const [type, setType] = useState<'FIND_ROOMMATE' | 'ROOM_CHANGE' | 'SWAP_ROOMS'>('FIND_ROOMMATE')
  const [preferredGender, setPreferredGender] = useState('')
  const [preferredRoomType, setPreferredRoomType] = useState('')
  const [preferredFloor, setPreferredFloor] = useState('')
  const [studyHabits, setStudyHabits] = useState('')
  const [sleepSchedule, setSleepSchedule] = useState('')
  const [cleanliness, setCleanliness] = useState('')
  const [description, setDescription] = useState('')

  // Get user from session - you'll need to implement this
  const userId = "current-user-id" // This should come from your auth context

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [requestsRes, responsesRes] = await Promise.all([
        fetch(`/api/roommate-requests?userId=${userId}`),
        fetch(`/api/roommate-requests/responses?userId=${userId}`)
      ])
      
      const requestsData = await requestsRes.json()
      const responsesData = await responsesRes.json()
      
      setRequests(requestsData)
      setResponses(responsesData)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const createRequest = async () => {
    if (!description.trim()) {
      alert('Please provide a description')
      return
    }

    try {
      setIsCreating(true)
      const response = await fetch('/api/roommate-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId,
          type,
          preferredGender: preferredGender || null,
          preferredRoomType: preferredRoomType || null,
          preferredFloor: preferredFloor || null,
          studyHabits: studyHabits || null,
          sleepSchedule: sleepSchedule || null,
          cleanliness: cleanliness || null,
          description
        })
      })

      if (response.ok) {
        fetchData()
        resetForm()
        alert('Roommate request submitted successfully!')
      } else {
        alert('Failed to submit request')
      }
    } catch (error) {
      console.error('Error creating request:', error)
      alert('Error submitting request')
    } finally {
      setIsCreating(false)
    }
  }

  const respondToRequest = async (requestId: string, message: string) => {
    try {
      const response = await fetch('/api/roommate-requests/responses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          requestId,
          responderUserId: userId,
          message
        })
      })

      if (response.ok) {
        fetchData()
        alert('Response sent successfully!')
      } else {
        alert('Failed to send response')
      }
    } catch (error) {
      console.error('Error sending response:', error)
      alert('Error sending response')
    }
  }

  const resetForm = () => {
    setType('FIND_ROOMMATE')
    setPreferredGender('')
    setPreferredRoomType('')
    setPreferredFloor('')
    setStudyHabits('')
    setSleepSchedule('')
    setCleanliness('')
    setDescription('')
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'OPEN':
        return <Clock className="h-4 w-4 text-yellow-400" />
      case 'MATCHED':
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
      case 'MATCHED':
        return 'bg-green-500/20 text-green-300 border-green-400'
      case 'CLOSED':
        return 'bg-gray-500/20 text-gray-300 border-gray-400'
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-400'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'FIND_ROOMMATE':
        return 'bg-blue-500/20 text-blue-300 border-blue-400'
      case 'ROOM_CHANGE':
        return 'bg-purple-500/20 text-purple-300 border-purple-400'
      case 'SWAP_ROOMS':
        return 'bg-orange-500/20 text-orange-300 border-orange-400'
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-400'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Roommate Finder</h2>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              New Request
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create Roommate Request</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="type">Request Type</Label>
                <Select value={type} onValueChange={(value: any) => setType(value)}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FIND_ROOMMATE" className="text-white hover:bg-white/10">Find Roommate</SelectItem>
                    <SelectItem value="ROOM_CHANGE" className="text-white hover:bg-white/10">Room Change</SelectItem>
                    <SelectItem value="SWAP_ROOMS" className="text-white hover:bg-white/10">Swap Rooms</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="preferredGender">Preferred Gender</Label>
                  <Select value={preferredGender} onValueChange={setPreferredGender}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MALE" className="text-white hover:bg-white/10">Male</SelectItem>
                      <SelectItem value="FEMALE" className="text-white hover:bg-white/10">Female</SelectItem>
                      <SelectItem value="OTHER" className="text-white hover:bg-white/10">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="preferredRoomType">Preferred Room Type</Label>
                  <Select value={preferredRoomType} onValueChange={setPreferredRoomType}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SINGLE" className="text-white hover:bg-white/10">Single</SelectItem>
                      <SelectItem value="SHARED" className="text-white hover:bg-white/10">Shared</SelectItem>
                      <SelectItem value="SUITE" className="text-white hover:bg-white/10">Suite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="studyHabits">Study Habits</Label>
                  <Select value={studyHabits} onValueChange={setStudyHabits}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="QUIET" className="text-white hover:bg-white/10">Quiet</SelectItem>
                      <SelectItem value="MODERATE" className="text-white hover:bg-white/10">Moderate</SelectItem>
                      <SelectItem value="SOCIAL" className="text-white hover:bg-white/10">Social</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="sleepSchedule">Sleep Schedule</Label>
                  <Select value={sleepSchedule} onValueChange={setSleepSchedule}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EARLY" className="text-white hover:bg-white/10">Early (9-11 PM)</SelectItem>
                      <SelectItem value="NORMAL" className="text-white hover:bg-white/10">Normal (11-12 AM)</SelectItem>
                      <SelectItem value="LATE" className="text-white hover:bg-white/10">Late (12+ AM)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="cleanliness">Cleanliness</Label>
                  <Select value={cleanliness} onValueChange={setCleanliness}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="VERY_CLEAN" className="text-white hover:bg-white/10">Very Clean</SelectItem>
                      <SelectItem value="CLEAN" className="text-white hover:bg-white/10">Clean</SelectItem>
                      <SelectItem value="MODERATE" className="text-white hover:bg-white/10">Moderate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what you're looking for in a roommate or living situation"
                  className="bg-white/10 border-white/20 text-white placeholder:text-green-300"
                  rows={4}
                />
              </div>

              <Button 
                onClick={createRequest}
                disabled={!description.trim() || isCreating}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {isCreating ? 'Submitting...' : 'Submit Request'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white/10 border border-white/20">
          <TabsTrigger value="my-requests" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            My Requests
          </TabsTrigger>
          <TabsTrigger value="browse-requests" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            Browse Requests
          </TabsTrigger>
          <TabsTrigger value="responses" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            Responses
          </TabsTrigger>
        </TabsList>

        <TabsContent value="my-requests" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['OPEN', 'MATCHED', 'TOTAL'].map((stat) => {
              const count = stat === 'TOTAL' 
                ? requests.length 
                : requests.filter(req => req.status === stat).length
              
              return (
                <Card key={stat} className="bg-white/10 backdrop-blur-md border border-white/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-300 text-sm font-medium">
                          {stat === 'TOTAL' ? 'Total Requests' : `${stat} Requests`}
                        </p>
                        <p className="text-3xl font-bold text-white">{count}</p>
                      </div>
                      <div className="p-3 rounded-full bg-green-500/20">
                        <Users className="h-6 w-6 text-green-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="space-y-4">
            {requests.map((request) => (
              <Card key={request.id} className="bg-white/10 backdrop-blur-md border border-white/20">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusIcon(request.status)}
                        <h3 className="font-semibold text-white text-lg">
                          {request.type.replace('_', ' ')}
                        </h3>
                      </div>
                      <div className="flex gap-2 mb-3">
                        <Badge variant="outline" className={getStatusColor(request.status)}>
                          {request.status}
                        </Badge>
                        <Badge variant="outline" className={getTypeColor(request.type)}>
                          {request.type.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right text-sm text-green-300">
                      <div>Created: {new Date(request.createdAt).toLocaleDateString()}</div>
                    </div>
                  </div>

                  <div className="mb-4 p-4 bg-white/5 rounded border border-white/10">
                    <p className="text-white">{request.description}</p>
                  </div>

                  {/* Preferences */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    {request.preferredGender && (
                      <div>
                        <span className="text-green-300">Gender:</span>
                        <span className="text-white ml-1">{request.preferredGender}</span>
                      </div>
                    )}
                    {request.studyHabits && (
                      <div>
                        <span className="text-green-300">Study:</span>
                        <span className="text-white ml-1">{request.studyHabits}</span>
                      </div>
                    )}
                    {request.sleepSchedule && (
                      <div>
                        <span className="text-green-300">Sleep:</span>
                        <span className="text-white ml-1">{request.sleepSchedule}</span>
                      </div>
                    )}
                    {request.cleanliness && (
                      <div>
                        <span className="text-green-300">Cleanliness:</span>
                        <span className="text-white ml-1">{request.cleanliness}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}

            {requests.length === 0 && (
              <Card className="bg-white/10 backdrop-blur-md border border-white/20">
                <CardContent className="p-12 text-center">
                  <Users className="h-12 w-12 mx-auto mb-4 text-green-300 opacity-50" />
                  <h3 className="text-lg font-medium text-white mb-2">No requests yet</h3>
                  <p className="text-green-300">Create your first roommate request!</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="browse-requests" className="space-y-4">
          <Card className="bg-white/10 backdrop-blur-md border border-white/20">
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-300 h-4 w-4" />
                <Input
                  placeholder="Search requests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-green-300"
                />
              </div>
            </CardContent>
          </Card>

          <div className="text-center py-8 text-green-300">
            <UserPlus className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Browse other students' roommate requests here</p>
            <p className="text-sm mt-2">(This would show requests from other users)</p>
          </div>
        </TabsContent>

        <TabsContent value="responses" className="space-y-4">
          <div className="space-y-4">
            {responses.map((response) => (
              <Card key={response.id} className="bg-white/10 backdrop-blur-md border border-white/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-green-600 text-white">
                        {response.responder.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-white">{response.responder.name}</h4>
                        <Badge variant="outline" className="bg-blue-500/20 text-blue-300 border-blue-400">
                          {response.responder.room?.number || 'No room'}
                        </Badge>
                      </div>
                      <p className="text-green-300 text-sm mb-2">{response.responder.email}</p>
                      <p className="text-white mb-2">{response.message}</p>
                      <p className="text-green-300 text-xs">
                        Responded on {new Date(response.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {responses.length === 0 && (
              <Card className="bg-white/10 backdrop-blur-md border border-white/20">
                <CardContent className="p-12 text-center">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 text-green-300 opacity-50" />
                  <h3 className="text-lg font-medium text-white mb-2">No responses yet</h3>
                  <p className="text-green-300">Responses to your requests will appear here</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
