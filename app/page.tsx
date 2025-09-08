import Link from "next/link"
import { Building2, Users, Shield, Star, Zap, Lock, BarChart3, ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Modern geometric background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/20 via-indigo-600/10 to-transparent"></div>
        <div className="absolute w-64 h-64 rounded-full top-1/4 left-1/4 bg-blue-500/20 blur-3xl animate-pulse"></div>
        <div className="absolute delay-1000 rounded-full bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500/20 blur-3xl animate-pulse"></div>
        <div className="absolute rounded-full top-3/4 left-1/2 w-96 h-96 bg-purple-500/10 blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      {/* Navigation */}
      <nav className="relative z-10 p-6">
        <div className="flex items-center justify-between mx-auto max-w-7xl">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-12 h-12 shadow-xl bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
              <Building2 className="text-white h-7 w-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">InMate</h1>
              <p className="text-sm text-blue-200">Smart Hostel Management</p>
            </div>
          </div>
          <div className="items-center hidden space-x-8 md:flex">
            <Link href="#features" className="font-medium text-blue-100 transition-colors hover:text-white">Features</Link>
            <Link href="#pricing" className="font-medium text-blue-100 transition-colors hover:text-white">Pricing</Link>
            <Link href="#contact" className="font-medium text-blue-100 transition-colors hover:text-white">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 pt-20 pb-32">
        <div className="px-6 mx-auto text-center max-w-7xl">
          <div className="mb-12">
            <div className="inline-flex items-center px-4 py-2 mb-8 text-sm font-medium text-blue-200 border rounded-full bg-blue-500/20 backdrop-blur-sm border-blue-400/30">
              <Star className="w-4 h-4 mr-2 text-yellow-400" />
              Trusted by 500+ Institutions
            </div>
            <h1 className="mb-6 text-5xl font-bold leading-tight text-white md:text-7xl">
              Smart Hostel
              <span className="block text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text">
                Management System
              </span>
            </h1>
            <p className="max-w-3xl mx-auto text-xl leading-relaxed text-blue-100 md:text-2xl">
              Revolutionize your hostel operations with AI-powered management, 
              seamless integrations, and real-time analytics.
            </p>
          </div>
          
          <div className="flex flex-col items-center justify-center gap-6 mb-16 sm:flex-row">
            <Link
              href="/auth/admin"
              className="relative flex items-center px-8 py-4 space-x-3 text-lg font-semibold text-white transition-all duration-300 transform shadow-2xl group bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl hover:shadow-blue-500/30 hover:scale-105"
            >
              <Shield className="w-6 h-6 transition-transform group-hover:rotate-12" />
              <span>Admin Portal</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/auth/student"
              className="relative flex items-center px-8 py-4 space-x-3 text-lg font-semibold text-white transition-all duration-300 transform border group bg-white/10 backdrop-blur-sm rounded-2xl border-white/20 hover:bg-white/20 hover:scale-105"
            >
              <Users className="w-6 h-6 transition-transform group-hover:scale-110" />
              <span>Student Portal</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Feature Highlights */}
          <div className="grid max-w-4xl gap-6 mx-auto md:grid-cols-3">
            <div className="p-6 transition-all duration-300 border bg-white/10 backdrop-blur-sm rounded-2xl border-white/20 hover:bg-white/20">
              <div className="flex items-center justify-center w-12 h-12 mb-4 bg-blue-500/20 rounded-xl">
                <Zap className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">Lightning Fast</h3>
              <p className="text-blue-100">Process bookings and manage rooms in seconds with our optimized system.</p>
            </div>
            <div className="p-6 transition-all duration-300 border bg-white/10 backdrop-blur-sm rounded-2xl border-white/20 hover:bg-white/20">
              <div className="flex items-center justify-center w-12 h-12 mb-4 bg-indigo-500/20 rounded-xl">
                <Lock className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">Secure & Reliable</h3>
              <p className="text-blue-100">Bank-grade security with 99.9% uptime guarantee for peace of mind.</p>
            </div>
            <div className="p-6 transition-all duration-300 border bg-white/10 backdrop-blur-sm rounded-2xl border-white/20 hover:bg-white/20">
              <div className="flex items-center justify-center w-12 h-12 mb-4 bg-purple-500/20 rounded-xl">
                <BarChart3 className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">Smart Analytics</h3>
              <p className="text-blue-100">Get insights with real-time dashboards and automated reporting.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t bg-slate-800/50 backdrop-blur-sm border-white/10">
        <div className="px-6 py-12 mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center mb-4 space-x-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">InMate</span>
              </div>
              <p className="text-sm leading-relaxed text-blue-200">
                Revolutionizing hostel management with smart technology and seamless user experiences.
              </p>
            </div>
            <div>
              <h3 className="mb-4 font-semibold text-white">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-blue-200 transition-colors hover:text-white">Features</Link></li>
                <li><Link href="#" className="text-blue-200 transition-colors hover:text-white">Pricing</Link></li>
                <li><Link href="#" className="text-blue-200 transition-colors hover:text-white">API</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold text-white">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-blue-200 transition-colors hover:text-white">About</Link></li>
                <li><Link href="#" className="text-blue-200 transition-colors hover:text-white">Blog</Link></li>
                <li><Link href="#" className="text-blue-200 transition-colors hover:text-white">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold text-white">Support</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-blue-200 transition-colors hover:text-white">Help Center</Link></li>
                <li><Link href="#" className="text-blue-200 transition-colors hover:text-white">Contact</Link></li>
                <li><Link href="#" className="text-blue-200 transition-colors hover:text-white">Status</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 mt-8 text-center border-t border-white/10">
            <p className="text-sm text-blue-200">© 2025 InMate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
