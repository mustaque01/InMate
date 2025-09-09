"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/contexts/auth-context"
import {
  LayoutDashboard,
  Users,
  Building2,
  Calendar,
  CreditCard,
  FileText,
  User,
  LogOut,
  Menu,
  Bell,
  BarChart3,
  AlertTriangle,
  RefreshCw,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Students", href: "/admin/students", icon: Users },
  { name: "Rooms & Beds", href: "/admin/rooms", icon: Building2 },
  { name: "Bookings", href: "/admin/bookings", icon: Calendar },
  { name: "Rent Collection", href: "/admin/rent", icon: CreditCard },
  { name: "Payment Analytics", href: "/admin/payments/analytics", icon: BarChart3 },
  { name: "Payment Reminders", href: "/admin/payments/reminders", icon: AlertTriangle },
  { name: "Refund Requests", href: "/admin/payments/refunds", icon: RefreshCw },
  { name: "Reports", href: "/admin/reports", icon: FileText },
  { name: "Profile", href: "/admin/profile", icon: User },
]

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
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
        <div className="sticky top-0 z-40 flex items-center h-16 px-4 border-b shadow-xl shrink-0 gap-x-4 border-white/10 bg-slate-900/80 backdrop-blur-md sm:gap-x-6 sm:px-6 lg:px-8">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="text-blue-200 lg:hidden hover:text-white hover:bg-white/10" onClick={() => setSidebarOpen(true)}>
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
          </Sheet>

          <div className="flex self-stretch flex-1 gap-x-4 lg:gap-x-6">
            <div className="flex flex-1"></div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <Button variant="ghost" size="sm" className="text-blue-200 hover:text-white hover:bg-white/10">
                <Bell className="w-5 h-5" />
              </Button>

              <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-white/20" />

              <div className="flex items-center gap-x-2">
                <div className="hidden lg:flex lg:flex-col lg:text-right lg:text-sm">
                  <span className="font-semibold text-white">{user?.name}</span>
                  <span className="text-blue-200">Administrator</span>
                </div>
                <Button variant="ghost" size="sm" onClick={logout} className="text-blue-200 hover:text-white hover:bg-white/10">
                  <LogOut className="w-4 h-4" />
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
    <div className="flex flex-col px-6 pb-2 overflow-y-auto border-r grow gap-y-5 bg-slate-900/95 backdrop-blur-md border-white/10">
      <div className="flex items-center h-16 shrink-0">
        <Building2 className="w-8 h-8 text-blue-400" />
        <span className="ml-2 text-xl font-bold text-white">HostelHub</span>
      </div>
      <nav className="flex flex-col flex-1">
        <ul role="list" className="flex flex-col flex-1 gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      pathname === item.href
                        ? "bg-blue-600/20 text-blue-400 border-r-2 border-blue-400"
                        : "text-blue-200 hover:text-white hover:bg-white/10",
                      "group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold transition-all duration-300",
                    )}
                  >
                    <item.icon className="w-5 h-5 shrink-0" />
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
