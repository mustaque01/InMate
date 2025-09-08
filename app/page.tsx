import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, Shield, Sparkles, ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/50 to-purple-50/30 relative overflow-hidden">
      {/* Professional animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-indigo-500/5 to-purple-500/5"></div>
      <div className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl animate-float-delayed"></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      
      {/* Mesh gradient overlay for premium look */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-10 animate-gradient"></div>
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-6xl w-full">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="flex items-center justify-center mb-8 group">
              <div className="relative">
                <Building2 className="h-20 w-20 text-indigo-600 mr-4 group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 h-20 w-20 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-full blur-xl group-hover:from-indigo-500/40 group-hover:to-purple-500/40 transition-all duration-500"></div>
                <div className="absolute inset-0 h-20 w-20 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-2xl animate-pulse"></div>
              </div>
              <h1 className="text-7xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-slide-in tracking-tight">
                InMate
              </h1>
              <div className="relative ml-3">
                <Sparkles className="h-10 w-10 text-purple-500 animate-bounce-in animate-delay-500" />
                <div className="absolute inset-0 h-10 w-10 bg-purple-500/30 rounded-full blur-lg animate-pulse"></div>
              </div>
            </div>
            <p className="text-2xl text-slate-700 max-w-4xl mx-auto leading-relaxed animate-slide-in animate-delay-200 font-medium">
              Transform your hostel management with our{' '}
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent font-bold">revolutionary</span>,{' '}
              <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent font-bold">intelligent</span>, and{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent font-bold">comprehensive</span> platform
            </p>
            <div className="mt-8 text-center animate-fade-in animate-delay-500">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full text-sm font-medium text-indigo-800 border border-indigo-200/50">
                <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mr-2 animate-pulse"></div>
                Trusted by 500+ Educational Institutions
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto mb-20">
            <Card className="glass-card border-0 shadow-2xl animate-slide-in animate-delay-300 group hover:shadow-indigo-500/20 transition-all duration-500 backdrop-blur-xl">
              <CardHeader className="text-center pb-8">
                <div className="relative mx-auto mb-8 w-fit">
                  <div className="relative">
                    <Shield className="h-20 w-20 text-indigo-600 group-hover:text-indigo-700 transition-colors duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-full blur-xl group-hover:from-indigo-500/40 group-hover:to-purple-500/40 transition-all duration-500"></div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full animate-pulse"></div>
                </div>
                <CardTitle className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent mb-3">
                  Admin Command Center
                </CardTitle>
                <CardDescription className="text-lg text-slate-600 leading-relaxed">
                  Advanced administrative dashboard with real-time analytics, automated workflows, and comprehensive management tools
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid grid-cols-2 gap-6 text-sm">
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100">
                    <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse"></div>
                    <span className="font-medium text-slate-700">AI-Powered Student Management</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100">
                    <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse animate-delay-100"></div>
                    <span className="font-medium text-slate-700">Smart Room Allocation</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
                    <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse animate-delay-200"></div>
                    <span className="font-medium text-slate-700">Automated Rent Collection</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100">
                    <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse animate-delay-300"></div>
                    <span className="font-medium text-slate-700">Advanced Analytics</span>
                  </div>
                </div>
                <Link href="/auth/admin" className="block">
                  <Button className="w-full h-14 text-lg font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-700 hover:via-purple-700 hover:to-indigo-800 text-white shadow-2xl hover:shadow-indigo-500/30 transition-all duration-500 group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <span className="relative z-10 flex items-center justify-center">
                      Enter Admin Portal
                      <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
                    </span>
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="glass-card border-0 shadow-2xl animate-slide-in animate-delay-500 group hover:shadow-purple-500/20 transition-all duration-500 backdrop-blur-xl">
              <CardHeader className="text-center pb-8">
                <div className="relative mx-auto mb-8 w-fit">
                  <div className="relative">
                    <Users className="h-20 w-20 text-purple-600 group-hover:text-purple-700 transition-colors duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-full blur-xl group-hover:from-purple-500/40 group-hover:to-blue-500/40 transition-all duration-500"></div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse animate-delay-200"></div>
                </div>
                <CardTitle className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 bg-clip-text text-transparent mb-3">
                  Student Experience Hub
                </CardTitle>
                <CardDescription className="text-lg text-slate-600 leading-relaxed">
                  Personalized student dashboard with instant notifications, seamless communication, and comprehensive hostel services
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid grid-cols-2 gap-6 text-sm">
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100">
                    <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse"></div>
                    <span className="font-medium text-slate-700">Interactive Room Dashboard</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
                    <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse animate-delay-100"></div>
                    <span className="font-medium text-slate-700">Real-time Rent Tracking</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100">
                    <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse animate-delay-200"></div>
                    <span className="font-medium text-slate-700">Smart Notifications</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100">
                    <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse animate-delay-300"></div>
                    <span className="font-medium text-slate-700">Digital Profile Management</span>
                  </div>
                </div>
                <Link href="/auth/student" className="block">
                  <Button 
                    variant="outline" 
                    className="w-full h-14 text-lg font-bold border-2 border-purple-500 text-purple-700 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 hover:text-white hover:border-transparent transition-all duration-500 shadow-2xl hover:shadow-purple-500/30 group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <span className="relative z-10 flex items-center justify-center">
                      Access Student Portal
                      <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
                    </span>
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Features Grid */}
          <div className="max-w-6xl mx-auto mb-20 animate-fade-in animate-delay-700">
            <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Why Leading Institutions Choose InMate?
            </h2>
            <p className="text-center text-slate-600 mb-16 text-lg max-w-3xl mx-auto">
              Join thousands of satisfied institutions who have transformed their hostel management with our cutting-edge technology
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="text-center p-8 rounded-2xl glass hover:bg-gradient-to-br hover:from-indigo-50/50 hover:to-purple-50/50 transition-all duration-500 group backdrop-blur-xl border border-white/20">
                <div className="relative mb-8 mx-auto w-fit">
                  <div className="w-20 h-20 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 relative">
                    <Shield className="h-10 w-10 text-indigo-600" />
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse"></div>
                </div>
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Enterprise Security</h3>
                <p className="text-slate-600 leading-relaxed">Military-grade encryption, secure data handling, and compliance with international privacy standards</p>
                <div className="mt-6 flex justify-center">
                  <div className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full text-sm font-medium text-indigo-700">
                    ✓ ISO 27001 Certified
                  </div>
                </div>
              </div>
              
              <div className="text-center p-8 rounded-2xl glass hover:bg-gradient-to-br hover:from-purple-50/50 hover:to-blue-50/50 transition-all duration-500 group backdrop-blur-xl border border-white/20">
                <div className="relative mb-8 mx-auto w-fit">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 relative">
                    <Sparkles className="h-10 w-10 text-purple-600" />
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse animate-delay-200"></div>
                </div>
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">AI-Powered Intelligence</h3>
                <p className="text-slate-600 leading-relaxed">Smart automation, predictive analytics, and machine learning algorithms for optimal hostel operations</p>
                <div className="mt-6 flex justify-center">
                  <div className="px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full text-sm font-medium text-purple-700">
                    ✓ 99.9% Accuracy Rate
                  </div>
                </div>
              </div>
              
              <div className="text-center p-8 rounded-2xl glass hover:bg-gradient-to-br hover:from-blue-50/50 hover:to-indigo-50/50 transition-all duration-500 group backdrop-blur-xl border border-white/20">
                <div className="relative mb-8 mx-auto w-fit">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 relative">
                    <Users className="h-10 w-10 text-blue-600" />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse animate-delay-300"></div>
                </div>
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Exceptional Experience</h3>
                <p className="text-slate-600 leading-relaxed">Intuitive design, seamless workflows, and 24/7 premium support for administrators and students</p>
                <div className="mt-6 flex justify-center">
                  <div className="px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full text-sm font-medium text-blue-700">
                    ✓ 4.9/5 Satisfaction
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center animate-fade-in animate-delay-1000">
            <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-50/80 via-purple-50/80 to-blue-50/80 rounded-2xl backdrop-blur-xl border border-white/30 shadow-2xl">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-sm animate-ping"></div>
                </div>
                <span className="text-slate-700 font-semibold text-lg">System Online</span>
                <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                <span className="text-slate-600 font-medium">Enterprise Secure</span>
                <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                <span className="text-slate-600 font-medium">99.9% Uptime</span>
              </div>
            </div>
            <div className="mt-6 flex justify-center space-x-8 text-sm text-slate-500">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>500+ Institutions</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>50,000+ Students</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>4.9★ Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
