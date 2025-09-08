import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, Shield, Sparkles, ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100/50 to-sky-100/30 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-grid opacity-30"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl animate-float-delayed"></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-6xl w-full">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="flex items-center justify-center mb-8 group">
              <div className="relative">
                <Building2 className="h-16 w-16 text-blue-600 mr-4 group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 h-16 w-16 bg-blue-500/30 rounded-full blur-xl group-hover:bg-blue-500/40 transition-colors"></div>
              </div>
              <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-sky-600 bg-clip-text text-transparent animate-slide-in">
                InMate
              </h1>
              <Sparkles className="h-8 w-8 text-sky-500 ml-2 animate-bounce-in animate-delay-500" />
            </div>
            <p className="text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed animate-slide-in animate-delay-200">
              Experience the future of hostel management with our{' '}
              <span className="bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent font-semibold">intelligent</span>,{' '}
              <span className="bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent font-semibold">secure</span>, and{' '}
              <span className="bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent font-semibold">intuitive</span> platform
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            <Card className="glass-card card-hover border-0 animate-slide-in animate-delay-300 group">
              <CardHeader className="text-center pb-6">
                <div className="relative mx-auto mb-6 w-fit">
                  <Shield className="h-16 w-16 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
                  <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl group-hover:bg-blue-500/30 transition-colors"></div>
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Admin Command Center</CardTitle>
                <CardDescription className="text-lg text-slate-600">
                  Advanced administrative tools with powerful analytics and real-time insights
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span>Smart Student Management</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse animate-delay-100"></div>
                    <span>Dynamic Room Allocation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-sky-500 rounded-full animate-pulse animate-delay-200"></div>
                    <span>Automated Rent Collection</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-700 rounded-full animate-pulse animate-delay-300"></div>
                    <span>Advanced Analytics</span>
                  </div>
                </div>
                <Link href="/auth/admin" className="block">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <span>Enter Admin Portal</span>
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="glass-card card-hover border-0 animate-slide-in animate-delay-500 group">
              <CardHeader className="text-center pb-6">
                <div className="relative mx-auto mb-6 w-fit">
                  <Users className="h-16 w-16 text-sky-600 group-hover:text-sky-700 transition-colors duration-300" />
                  <div className="absolute inset-0 bg-sky-500/20 rounded-full blur-xl group-hover:bg-sky-500/30 transition-colors"></div>
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-blue-700 bg-clip-text text-transparent">Student Hub</CardTitle>
                <CardDescription className="text-lg text-slate-600">
                  Personalized dashboard with instant access to all your hostel information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-sky-500 rounded-full animate-pulse"></div>
                    <span>Room & Bed Details</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse animate-delay-100"></div>
                    <span>Real-time Rent Status</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-sky-600 rounded-full animate-pulse animate-delay-200"></div>
                    <span>Instant Notifications</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse animate-delay-300"></div>
                    <span>Profile Management</span>
                  </div>
                </div>
                <Link href="/auth/student" className="block">
                  <Button 
                    variant="outline" 
                    className="w-full border-2 border-sky-600 text-sky-700 hover:bg-sky-600 hover:text-white transition-all duration-300 text-lg font-semibold py-6 group shadow-lg hover:shadow-xl"
                  >
                    <span>Access Student Portal</span>
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Features Grid */}
          <div className="max-w-5xl mx-auto mb-16 animate-fade-in animate-delay-700">
            <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">Why Choose InMate?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-xl glass hover:bg-blue-500/5 transition-all duration-300 group">
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-blue-900">Bank-Grade Security</h3>
                <p className="text-slate-600">Advanced encryption and secure data handling</p>
              </div>
              <div className="text-center p-6 rounded-xl glass hover:bg-sky-500/5 transition-all duration-300 group">
                <div className="w-16 h-16 bg-sky-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Sparkles className="h-8 w-8 text-sky-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-sky-900">Smart Automation</h3>
                <p className="text-slate-600">AI-powered insights and automated workflows</p>
              </div>
              <div className="text-center p-6 rounded-xl glass hover:bg-blue-600/5 transition-all duration-300 group">
                <div className="w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Users className="h-8 w-8 text-blue-700" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-blue-900">User-Centric Design</h3>
                <p className="text-slate-600">Intuitive interface designed for all users</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center animate-fade-in animate-delay-1000">
            <div className="inline-flex items-center px-6 py-3 bg-blue-50/80 rounded-full backdrop-blur-sm border border-blue-200/50">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
              <span className="text-blue-700">System Online • Secure • Reliable</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
