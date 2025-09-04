"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MoreHorizontal, Edit, Trash2, Eye, Phone, Mail } from "lucide-react"

// Mock student data
const mockStudents = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul.sharma@email.com",
    phone: "+91 9876543210",
    roomNumber: "A-101",
    course: "B.Tech CSE",
    year: "3rd Year",
    status: "active",
    joinDate: "2024-01-15",
    photo: "/diverse-students.png",
    rentStatus: "paid",
  },
  {
    id: 2,
    name: "Priya Patel",
    email: "priya.patel@email.com",
    phone: "+91 9876543211",
    roomNumber: "B-205",
    course: "MBA",
    year: "1st Year",
    status: "active",
    joinDate: "2024-02-20",
    photo: "/diverse-female-student.png",
    rentStatus: "due",
  },
  {
    id: 3,
    name: "Amit Kumar",
    email: "amit.kumar@email.com",
    phone: "+91 9876543212",
    roomNumber: "C-102",
    course: "B.Sc Physics",
    year: "2nd Year",
    status: "active",
    joinDate: "2024-03-10",
    photo: "/male-student-studying.png",
    rentStatus: "paid",
  },
  {
    id: 4,
    name: "Sneha Singh",
    email: "sneha.singh@email.com",
    phone: "+91 9876543213",
    roomNumber: "D-301",
    course: "M.Tech",
    year: "1st Year",
    status: "inactive",
    joinDate: "2023-08-15",
    photo: "/female-student-2.png",
    rentStatus: "paid",
  },
]

export function StudentList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [rentFilter, setRentFilter] = useState("all")

  const filteredStudents = mockStudents.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.roomNumber.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || student.status === statusFilter
    const matchesRent = rentFilter === "all" || student.rentStatus === rentFilter

    return matchesSearch && matchesStatus && matchesRent
  })

  const handleEdit = (studentId: number) => {
    alert(`Edit student ${studentId}`)
  }

  const handleDelete = (studentId: number) => {
    if (confirm("Are you sure you want to delete this student?")) {
      alert(`Delete student ${studentId}`)
    }
  }

  const handleView = (studentId: number) => {
    alert(`View student ${studentId} details`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Student List</CardTitle>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search students by name, email, or room..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select value={rentFilter} onValueChange={setRentFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Rent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Rent</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="due">Due</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredStudents.map((student) => (
            <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={student.photo || "/placeholder.svg"} alt={student.name} />
                  <AvatarFallback>
                    {student.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{student.name}</h3>
                    <Badge variant={student.status === "active" ? "default" : "secondary"}>{student.status}</Badge>
                    <Badge variant={student.rentStatus === "paid" ? "default" : "destructive"}>
                      {student.rentStatus}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {student.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {student.phone}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Room: {student.roomNumber}</span>
                    <span>{student.course}</span>
                    <span>{student.year}</span>
                  </div>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleView(student.id)}>
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleEdit(student.id)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDelete(student.id)} className="text-red-600">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
        {filteredStudents.length === 0 && (
          <div className="text-center py-8 text-gray-500">No students found matching your criteria.</div>
        )}
      </CardContent>
    </Card>
  )
}
