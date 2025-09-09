"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/contexts/auth-context"
import { 
  Home, 
  CreditCard, 
  FileText, 
  User, 
  LogOut, 
  Menu, 
  Bell, 
  Building2,
  MessageSquare,
  Calendar,
  Star,
  Users,
  CalendarDays
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/student/dashboard", icon: Home },
  { name: "Room Details", href: "/student/room", icon: Building2 },
  { name: "Rent Status", href: "/student/rent", icon: CreditCard },
  { name: "Complaints", href: "/student/complaints", icon: MessageSquare },
  { name: "Leave Applications", href: "/student/leave", icon: Calendar },
  { name: "Feedback", href: "/student/feedback", icon: Star },
  { name: "Roommate Finder", href: "/student/roommate", icon: Users },
  { name: "Events", href: "/student/events", icon: CalendarDays },
  { name: "Notices", href: "/student/notices", icon: FileText },
  { name: "Profile", href: "/student/profile", icon: User },
]

interface StudentLayoutProps {
  children: React.ReactNode
}

export function StudentLayout({ children }: StudentLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout } = useAuth()
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Mobile sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0 bg-slate-900/95 backdrop-blur-md border-white/10">
          <SidebarContent pathname={pathname} />
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <SidebarContent pathname={pathname} />
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-white/10 bg-slate-900/80 backdrop-blur-md px-4 shadow-xl sm:gap-x-6 sm:px-6 lg:px-8">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="lg:hidden text-blue-200 hover:text-white hover:bg-white/10" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
          </Sheet>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1"></div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <Button variant="ghost" size="sm" className="text-blue-200 hover:text-white hover:bg-white/10">
                <Bell className="h-5 w-5" />
              </Button>

              <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-white/20" />

              <div className="flex items-center gap-x-2">
                <div className="hidden lg:flex lg:flex-col lg:text-right lg:text-sm">
                  <span className="font-semibold text-white">{user?.name}</span>
                  <span className="text-blue-200">Student</span>
                </div>
                <Button variant="ghost" size="sm" onClick={logout} className="text-blue-200 hover:text-white hover:bg-white/10">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-6">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  )
}

function SidebarContent({ pathname }: { pathname: string }) {
  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-slate-900/95 backdrop-blur-md px-6 pb-2 border-r border-white/10">
      <div className="flex h-16 shrink-0 items-center">
        <Building2 className="h-8 w-8 text-green-400" />
        <span className="ml-2 text-xl font-bold text-white">HostelHub</span>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      pathname === item.href
                        ? "bg-green-600/20 text-green-400 border-r-2 border-green-400"
                        : "text-blue-200 hover:text-white hover:bg-white/10",
                      "group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold transition-all duration-300",
                    )}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  )
}
