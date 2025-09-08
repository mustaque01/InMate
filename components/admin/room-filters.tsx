"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, Filter } from "lucide-react"

export function RoomFilters() {
  const [searchTerm, setSearchTerm] = useState("")
  const [floorFilter, setFloorFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  return (
    <Card className="bg-white/10 backdrop-blur-md border border-white/20">
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 h-4 w-4" />
            <Input
              placeholder="Search rooms by number or block..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-blue-300"
            />
          </div>
          <div className="flex gap-2">
            <Select value={floorFilter} onValueChange={setFloorFilter}>
              <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Floor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-white hover:bg-white/10">All Floors</SelectItem>
                <SelectItem value="1" className="text-white hover:bg-white/10">Floor 1</SelectItem>
                <SelectItem value="2" className="text-white hover:bg-white/10">Floor 2</SelectItem>
                <SelectItem value="3" className="text-white hover:bg-white/10">Floor 3</SelectItem>
                <SelectItem value="4" className="text-white hover:bg-white/10">Floor 4</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-white hover:bg-white/10">All Status</SelectItem>
                <SelectItem value="available" className="text-white hover:bg-white/10">Available</SelectItem>
                <SelectItem value="occupied" className="text-white hover:bg-white/10">Occupied</SelectItem>
                <SelectItem value="maintenance" className="text-white hover:bg-white/10">Maintenance</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-white hover:bg-white/10">All Types</SelectItem>
                <SelectItem value="single" className="text-white hover:bg-white/10">Single</SelectItem>
                <SelectItem value="double" className="text-white hover:bg-white/10">Double</SelectItem>
                <SelectItem value="triple" className="text-white hover:bg-white/10">Triple</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" className="border-blue-300 text-blue-200 hover:bg-blue-500/20">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
