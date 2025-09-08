"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, Bed, Users, MoreHorizontal, Edit, Eye, Settings } from "lucide-react"

// Mock room data
const mockRooms = [
  {
    id: 1,
    number: "A-101",
    floor: 1,
    block: "A",
    type: "double",
    totalBeds: 2,
    occupiedBeds: 2,
    status: "occupied",
    rent: 8500,
    students: ["Rahul Sharma", "Amit Kumar"],
  },
  {
    id: 2,
    number: "A-102",
    floor: 1,
    block: "A",
    type: "double",
    totalBeds: 2,
    occupiedBeds: 1,
    status: "partial",
    rent: 8500,
    students: ["Priya Patel"],
  },
  {
    id: 3,
    number: "A-103",
    floor: 1,
    block: "A",
    type: "double",
    totalBeds: 2,
    occupiedBeds: 0,
    status: "available",
    rent: 8500,
    students: [],
  },
  {
    id: 4,
    number: "B-201",
    floor: 2,
    block: "B",
    type: "triple",
    totalBeds: 3,
    occupiedBeds: 3,
    status: "occupied",
    rent: 7500,
    students: ["Sneha Singh", "Vikash Yadav", "Deepak Gupta"],
  },
  {
    id: 5,
    number: "B-202",
    floor: 2,
    block: "B",
    type: "single",
    totalBeds: 1,
    occupiedBeds: 0,
    status: "maintenance",
    rent: 12000,
    students: [],
  },
  {
    id: 6,
    number: "C-301",
    floor: 3,
    block: "C",
    type: "double",
    totalBeds: 2,
    occupiedBeds: 0,
    status: "available",
    rent: 8500,
    students: [],
  },
]

export function RoomGrid() {
  const [selectedFloor, setSelectedFloor] = useState("1")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "occupied":
        return "bg-red-100 text-red-800"
      case "partial":
        return "bg-yellow-100 text-yellow-800"
      case "available":
        return "bg-green-100 text-green-800"
      case "maintenance":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "occupied":
        return <Users className="h-3 w-3" />
      case "partial":
        return <Users className="h-3 w-3" />
      case "available":
        return <Bed className="h-3 w-3" />
      case "maintenance":
        return <Settings className="h-3 w-3" />
      default:
        return <Bed className="h-3 w-3" />
    }
  }

  const filteredRooms = mockRooms.filter((room) => room.floor.toString() === selectedFloor)

  const handleRoomAction = (action: string, roomId: number) => {
    alert(`${action} room ${roomId}`)
  }

  return (
    <div className="space-y-6">
      <Tabs value={selectedFloor} onValueChange={setSelectedFloor}>
        <TabsList className="bg-white/10 backdrop-blur-md border border-white/20">
          <TabsTrigger value="1" className="text-white data-[state=active]:bg-blue-600 data-[state=active]:text-white">Floor 1</TabsTrigger>
          <TabsTrigger value="2" className="text-white data-[state=active]:bg-blue-600 data-[state=active]:text-white">Floor 2</TabsTrigger>
          <TabsTrigger value="3" className="text-white data-[state=active]:bg-blue-600 data-[state=active]:text-white">Floor 3</TabsTrigger>
          <TabsTrigger value="4" className="text-white data-[state=active]:bg-blue-600 data-[state=active]:text-white">Floor 4</TabsTrigger>
        </TabsList>

        {["1", "2", "3", "4"].map((floor) => (
          <TabsContent key={floor} value={floor} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredRooms.map((room) => (
                <Card key={room.id} className="hover:shadow-md transition-shadow bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center gap-2 text-white">
                        <Building2 className="h-4 w-4" />
                        {room.number}
                      </CardTitle>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-blue-200 hover:bg-white/10">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleRoomAction("View", room.id)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleRoomAction("Edit", room.id)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Room
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleRoomAction("Assign", room.id)}>
                            <Users className="h-4 w-4 mr-2" />
                            Assign Student
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge className={getStatusColor(room.status)}>
                        {getStatusIcon(room.status)}
                        <span className="ml-1 capitalize">{room.status}</span>
                      </Badge>
                      <span className="text-sm text-gray-500 capitalize">{room.type}</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Occupancy:</span>
                        <span className="font-medium">
                          {room.occupiedBeds}/{room.totalBeds} beds
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Rent:</span>
                        <span className="font-medium">₹{room.rent.toLocaleString()}</span>
                      </div>
                    </div>

                    {room.students.length > 0 && (
                      <div className="space-y-1">
                        <span className="text-xs text-gray-500">Current Students:</span>
                        <div className="space-y-1">
                          {room.students.map((student, index) => (
                            <div key={index} className="text-xs bg-gray-50 px-2 py-1 rounded">
                              {student}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      {room.status === "available" && (
                        <Button size="sm" className="flex-1">
                          Assign Student
                        </Button>
                      )}
                      {room.status === "partial" && (
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          Add Student
                        </Button>
                      )}
                      {room.status === "occupied" && (
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          View Details
                        </Button>
                      )}
                      {room.status === "maintenance" && (
                        <Button size="sm" variant="secondary" className="flex-1">
                          Mark Available
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
