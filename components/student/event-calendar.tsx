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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format } from "date-fns"
import { 
  CalendarIcon, 
  Plus, 
  Calendar as CalendarIconLucide, 
  Clock,
  MapPin,
  Users,
  CheckCircle,
  XCircle,
  AlertTriangle
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Event {
  id: string
  title: string
  description: string
  category: string
  startTime: string
  endTime: string
  location: string
  maxAttendees: number | null
  isPublic: boolean
  status: string
  createdAt: string
  organizer: {
    id: string
    name: string
  }
  attendees: EventAttendee[]
  _count: {
    attendees: number
  }
}

interface EventAttendee {
  id: string
  eventId: string
  userId: string
  status: string
  registeredAt: string
  user: {
    id: string
    name: string
  }
}

export function EventCalendar() {
  const [events, setEvents] = useState<Event[]>([])
  const [myEvents, setMyEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all-events")
  const [filter, setFilter] = useState("all")
  const [isCreating, setIsCreating] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  // Form state
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("SOCIAL")
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [location, setLocation] = useState("")
  const [maxAttendees, setMaxAttendees] = useState("")
  const [isPublic, setIsPublic] = useState(true)

  // Get user from session - you'll need to implement this
  const userId = "current-user-id" // This should come from your auth context

  useEffect(() => {
    fetchEvents()
    fetchMyEvents()
  }, [filter])

  const fetchEvents = async () => {
    try {
      const params = new URLSearchParams()
      if (filter !== 'all') params.append('category', filter)
      
      const response = await fetch(`/api/events?${params}`)
      const data = await response.json()
      setEvents(data.sort((a: any, b: any) => 
        new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
      ))
    } catch (error) {
      console.error('Error fetching events:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchMyEvents = async () => {
    try {
      const response = await fetch(`/api/events?organizerId=${userId}`)
      const data = await response.json()
      setMyEvents(data)
    } catch (error) {
      console.error('Error fetching my events:', error)
    }
  }

  const createEvent = async () => {
    if (!title.trim() || !startDate || !endDate || !startTime || !endTime || !location.trim()) {
      alert('Please fill in all required fields')
      return
    }

    try {
      setIsCreating(true)
      
      const startDateTime = new Date(startDate)
      const [startHour, startMinute] = startTime.split(':')
      startDateTime.setHours(parseInt(startHour), parseInt(startMinute))
      
      const endDateTime = new Date(endDate)
      const [endHour, endMinute] = endTime.split(':')
      endDateTime.setHours(parseInt(endHour), parseInt(endMinute))

      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          category,
          startTime: startDateTime.toISOString(),
          endTime: endDateTime.toISOString(),
          location,
          maxAttendees: maxAttendees ? parseInt(maxAttendees) : null,
          isPublic,
          organizerId: userId
        })
      })

      if (response.ok) {
        fetchEvents()
        fetchMyEvents()
        resetForm()
        alert('Event created successfully!')
      } else {
        alert('Failed to create event')
      }
    } catch (error) {
      console.error('Error creating event:', error)
      alert('Error creating event')
    } finally {
      setIsCreating(false)
    }
  }

  const joinEvent = async (eventId: string) => {
    try {
      const response = await fetch('/api/events/attendees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          eventId,
          userId
        })
      })

      if (response.ok) {
        fetchEvents()
        alert('Successfully joined the event!')
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to join event')
      }
    } catch (error) {
      console.error('Error joining event:', error)
      alert('Error joining event')
    }
  }

  const leaveEvent = async (eventId: string) => {
    try {
      const response = await fetch(`/api/events/attendees?eventId=${eventId}&userId=${userId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        fetchEvents()
        alert('Successfully left the event!')
      } else {
        alert('Failed to leave event')
      }
    } catch (error) {
      console.error('Error leaving event:', error)
      alert('Error leaving event')
    }
  }

  const resetForm = () => {
    setTitle("")
    setDescription("")
    setCategory("SOCIAL")
    setStartDate(undefined)
    setEndDate(undefined)
    setStartTime("")
    setEndTime("")
    setLocation("")
    setMaxAttendees("")
    setIsPublic(true)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'UPCOMING':
        return <Clock className="h-4 w-4 text-blue-400" />
      case 'ONGOING':
        return <AlertTriangle className="h-4 w-4 text-green-400" />
      case 'COMPLETED':
        return <CheckCircle className="h-4 w-4 text-gray-400" />
      case 'CANCELLED':
        return <XCircle className="h-4 w-4 text-red-400" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'UPCOMING':
        return 'bg-blue-500/20 text-blue-300 border-blue-400'
      case 'ONGOING':
        return 'bg-green-500/20 text-green-300 border-green-400'
      case 'COMPLETED':
        return 'bg-gray-500/20 text-gray-300 border-gray-400'
      case 'CANCELLED':
        return 'bg-red-500/20 text-red-300 border-red-400'
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-400'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'SOCIAL':
        return 'bg-pink-500/20 text-pink-300 border-pink-400'
      case 'ACADEMIC':
        return 'bg-blue-500/20 text-blue-300 border-blue-400'
      case 'SPORTS':
        return 'bg-orange-500/20 text-orange-300 border-orange-400'
      case 'CULTURAL':
        return 'bg-purple-500/20 text-purple-300 border-purple-400'
      case 'WORKSHOP':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
      case 'OTHER':
        return 'bg-gray-500/20 text-gray-300 border-gray-400'
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-400'
    }
  }

  const isUserAttending = (event: Event) => {
    return event.attendees.some(attendee => attendee.userId === userId)
  }

  const canJoinEvent = (event: Event) => {
    const now = new Date()
    const eventStart = new Date(event.startTime)
    return eventStart > now && 
           event.status === 'UPCOMING' && 
           !isUserAttending(event) &&
           (event.maxAttendees === null || event._count.attendees < event.maxAttendees)
  }

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.startTime)
      return eventDate.toDateString() === date.toDateString()
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Events & Calendar</h2>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter event title"
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
                    <SelectItem value="SOCIAL" className="text-white hover:bg-white/10">Social</SelectItem>
                    <SelectItem value="ACADEMIC" className="text-white hover:bg-white/10">Academic</SelectItem>
                    <SelectItem value="SPORTS" className="text-white hover:bg-white/10">Sports</SelectItem>
                    <SelectItem value="CULTURAL" className="text-white hover:bg-white/10">Cultural</SelectItem>
                    <SelectItem value="WORKSHOP" className="text-white hover:bg-white/10">Workshop</SelectItem>
                    <SelectItem value="OTHER" className="text-white hover:bg-white/10">Other</SelectItem>
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
                        {startDate ? format(startDate, "PPP") : "Pick start date"}
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
                        {endDate ? format(endDate, "PPP") : "Pick end date"}
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Event location"
                  className="bg-white/10 border-white/20 text-white placeholder:text-green-300"
                />
              </div>

              <div>
                <Label htmlFor="maxAttendees">Max Attendees (optional)</Label>
                <Input
                  id="maxAttendees"
                  type="number"
                  value={maxAttendees}
                  onChange={(e) => setMaxAttendees(e.target.value)}
                  placeholder="Leave empty for unlimited"
                  className="bg-white/10 border-white/20 text-white placeholder:text-green-300"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Event description"
                  className="bg-white/10 border-white/20 text-white placeholder:text-green-300"
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isPublic"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                  className="rounded border-white/20 bg-white/10"
                  aria-label="Make event public"
                />
                <Label htmlFor="isPublic" className="text-sm">Make event public</Label>
              </div>

              <Button 
                onClick={createEvent}
                disabled={isCreating}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {isCreating ? 'Creating...' : 'Create Event'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white/10 border border-white/20">
          <TabsTrigger value="all-events" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            All Events
          </TabsTrigger>
          <TabsTrigger value="my-events" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            My Events
          </TabsTrigger>
          <TabsTrigger value="calendar" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
            Calendar View
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all-events" className="space-y-4">
          {/* Filter */}
          <Card className="bg-white/10 backdrop-blur-md border border-white/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <Label htmlFor="filter" className="text-white">Filter by category:</Label>
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" className="text-white hover:bg-white/10">All Categories</SelectItem>
                    <SelectItem value="SOCIAL" className="text-white hover:bg-white/10">Social</SelectItem>
                    <SelectItem value="ACADEMIC" className="text-white hover:bg-white/10">Academic</SelectItem>
                    <SelectItem value="SPORTS" className="text-white hover:bg-white/10">Sports</SelectItem>
                    <SelectItem value="CULTURAL" className="text-white hover:bg-white/10">Cultural</SelectItem>
                    <SelectItem value="WORKSHOP" className="text-white hover:bg-white/10">Workshop</SelectItem>
                    <SelectItem value="OTHER" className="text-white hover:bg-white/10">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Events List */}
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
              events.map((event) => (
                <Card key={event.id} className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getStatusIcon(event.status)}
                          <h3 className="font-semibold text-white text-lg">{event.title}</h3>
                        </div>
                        <div className="flex gap-2 mb-3">
                          <Badge variant="outline" className={getStatusColor(event.status)}>
                            {event.status}
                          </Badge>
                          <Badge variant="outline" className={getCategoryColor(event.category)}>
                            {event.category}
                          </Badge>
                          {event.maxAttendees && (
                            <Badge variant="outline" className="bg-blue-500/20 text-blue-300 border-blue-400">
                              {event._count.attendees}/{event.maxAttendees}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-right text-sm text-green-300">
                        <div>By: {event.organizer.name}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2 p-3 bg-white/5 rounded border border-white/10">
                        <CalendarIconLucide className="h-4 w-4 text-green-400" />
                        <div>
                          <p className="text-xs text-green-300">Start</p>
                          <p className="text-white font-medium">
                            {format(new Date(event.startTime), "PPP p")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-3 bg-white/5 rounded border border-white/10">
                        <Clock className="h-4 w-4 text-green-400" />
                        <div>
                          <p className="text-xs text-green-300">End</p>
                          <p className="text-white font-medium">
                            {format(new Date(event.endTime), "PPP p")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-3 bg-white/5 rounded border border-white/10">
                        <MapPin className="h-4 w-4 text-green-400" />
                        <div>
                          <p className="text-xs text-green-300">Location</p>
                          <p className="text-white font-medium">{event.location}</p>
                        </div>
                      </div>
                    </div>

                    {event.description && (
                      <div className="mb-4 p-4 bg-white/5 rounded border border-white/10">
                        <p className="text-white">{event.description}</p>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-green-300">
                        <Users className="h-4 w-4" />
                        <span>{event._count.attendees} attending</span>
                      </div>
                      
                      {isUserAttending(event) ? (
                        <Button
                          onClick={() => leaveEvent(event.id)}
                          variant="outline"
                          className="border-red-400 text-red-300 hover:bg-red-500/20"
                        >
                          Leave Event
                        </Button>
                      ) : canJoinEvent(event) ? (
                        <Button
                          onClick={() => joinEvent(event.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Join Event
                        </Button>
                      ) : (
                        <Button disabled variant="outline" className="opacity-50">
                          Cannot Join
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}

            {!loading && events.length === 0 && (
              <Card className="bg-white/10 backdrop-blur-md border border-white/20">
                <CardContent className="p-12 text-center">
                  <CalendarIconLucide className="h-12 w-12 mx-auto mb-4 text-green-300 opacity-50" />
                  <h3 className="text-lg font-medium text-white mb-2">No events found</h3>
                  <p className="text-green-300">No events match your current filter.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="my-events" className="space-y-4">
          <div className="space-y-4">
            {myEvents.map((event) => (
              <Card key={event.id} className="bg-white/10 backdrop-blur-md border border-white/20">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusIcon(event.status)}
                        <h3 className="font-semibold text-white text-lg">{event.title}</h3>
                        <Badge variant="outline" className="bg-purple-500/20 text-purple-300 border-purple-400">
                          Organizer
                        </Badge>
                      </div>
                      <div className="flex gap-2 mb-3">
                        <Badge variant="outline" className={getStatusColor(event.status)}>
                          {event.status}
                        </Badge>
                        <Badge variant="outline" className={getCategoryColor(event.category)}>
                          {event.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right text-sm text-green-300">
                      <div>{event._count.attendees} attendees</div>
                    </div>
                  </div>

                  <p className="text-white mb-4">{event.description}</p>
                  
                  <div className="text-sm text-green-300">
                    <span>📍 {event.location}</span>
                    <span className="ml-4">🕒 {format(new Date(event.startTime), "PPP p")}</span>
                  </div>
                </CardContent>
              </Card>
            ))}

            {myEvents.length === 0 && (
              <Card className="bg-white/10 backdrop-blur-md border border-white/20">
                <CardContent className="p-12 text-center">
                  <CalendarIconLucide className="h-12 w-12 mx-auto mb-4 text-green-300 opacity-50" />
                  <h3 className="text-lg font-medium text-white mb-2">No events created</h3>
                  <p className="text-green-300">You haven't created any events yet.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/10 backdrop-blur-md border border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  className="rounded-md border border-white/20"
                />
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border border-white/20">
              <CardHeader>
                <CardTitle className="text-white">
                  Events on {format(selectedDate, "PPP")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getEventsForDate(selectedDate).map((event) => (
                    <div key={event.id} className="p-3 bg-white/5 rounded border border-white/10">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-white">{event.title}</h4>
                        <Badge variant="outline" className={getCategoryColor(event.category)}>
                          {event.category}
                        </Badge>
                      </div>
                      <p className="text-green-300 text-sm mb-2">{event.location}</p>
                      <p className="text-green-200 text-xs">
                        {format(new Date(event.startTime), "p")} - {format(new Date(event.endTime), "p")}
                      </p>
                    </div>
                  ))}
                  
                  {getEventsForDate(selectedDate).length === 0 && (
                    <p className="text-green-300 text-center py-4">No events on this date</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
