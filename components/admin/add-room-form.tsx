"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"

export function AddRoomForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [bedCount, setBedCount] = useState(2)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      alert("Room added successfully!")
      router.push("/admin/rooms")
    }, 2000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Room Information */}
        <Card className="bg-white/10 backdrop-blur-md border border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Room Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="roomNumber" className="text-blue-200">Room Number *</Label>
                <Input id="roomNumber" placeholder="e.g., A-101" required className="bg-white/10 border-white/20 text-white placeholder:text-blue-300" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="block" className="text-blue-200">Block *</Label>
                <Select required>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select block" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-white/20">
                    <SelectItem value="A" className="text-white hover:bg-white/10">Block A</SelectItem>
                    <SelectItem value="B" className="text-white hover:bg-white/10">Block B</SelectItem>
                    <SelectItem value="C" className="text-white hover:bg-white/10">Block C</SelectItem>
                    <SelectItem value="D" className="text-white hover:bg-white/10">Block D</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="floor" className="text-blue-200">Floor *</Label>
                <Select required>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select floor" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-white/20">
                    <SelectItem value="1" className="text-white hover:bg-white/10">Floor 1</SelectItem>
                    <SelectItem value="2" className="text-white hover:bg-white/10">Floor 2</SelectItem>
                    <SelectItem value="3" className="text-white hover:bg-white/10">Floor 3</SelectItem>
                    <SelectItem value="4" className="text-white hover:bg-white/10">Floor 4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="roomType" className="text-blue-200">Room Type *</Label>
                <Select required>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single Occupancy</SelectItem>
                    <SelectItem value="double">Double Occupancy</SelectItem>
                    <SelectItem value="triple">Triple Occupancy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bedCount">Number of Beds *</Label>
                <Select required onValueChange={(value) => setBedCount(Number.parseInt(value))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select beds" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Bed</SelectItem>
                    <SelectItem value="2">2 Beds</SelectItem>
                    <SelectItem value="3">3 Beds</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rent">Monthly Rent (₹) *</Label>
                <Input id="rent" type="number" placeholder="e.g., 8500" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Room Description</Label>
              <Textarea id="description" placeholder="Additional details about the room..." />
            </div>
          </CardContent>
        </Card>

        {/* Room Features */}
        <Card className="bg-white/10 backdrop-blur-md border border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Room Features & Amenities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="area">Room Area (sq ft)</Label>
                <Input id="area" type="number" placeholder="e.g., 120" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="windows">Number of Windows</Label>
                <Input id="windows" type="number" placeholder="e.g., 2" />
              </div>
            </div>

            <div className="space-y-3">
              <Label>Amenities</Label>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="ac" />
                  <Label htmlFor="ac" className="text-sm">
                    Air Conditioning
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="fan" />
                  <Label htmlFor="fan" className="text-sm">
                    Ceiling Fan
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="attached-bathroom" />
                  <Label htmlFor="attached-bathroom" className="text-sm">
                    Attached Bathroom
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="balcony" />
                  <Label htmlFor="balcony" className="text-sm">
                    Balcony
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="study-table" />
                  <Label htmlFor="study-table" className="text-sm">
                    Study Table
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="wardrobe" />
                  <Label htmlFor="wardrobe" className="text-sm">
                    Wardrobe
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="wifi" />
                  <Label htmlFor="wifi" className="text-sm">
                    WiFi Access
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="power-backup" />
                  <Label htmlFor="power-backup" className="text-sm">
                    Power Backup
                  </Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bed Configuration */}
      <Card className="bg-white/10 backdrop-blur-md border border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Bed Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: bedCount }, (_, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-3">
              <h4 className="font-medium">Bed {index + 1}</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`bed-${index}-type`}>Bed Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single Bed</SelectItem>
                      <SelectItem value="bunk">Bunk Bed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`bed-${index}-position`}>Position</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="left">Left Side</SelectItem>
                      <SelectItem value="right">Right Side</SelectItem>
                      <SelectItem value="center">Center</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`bed-${index}-status`}>Initial Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Submit Buttons */}
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Adding Room..." : "Add Room"}
        </Button>
      </div>
    </form>
  )
}
