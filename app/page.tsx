import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Trophy, Users, TrendingUp, Lock, Zap, BarChart3, Crown, Gamepad2, ArrowRight, Sparkles } from "lucide-react"
import Image from "next/image"

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Subtle gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 -z-10" />
      
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative">
                <Image src="/logo.svg" alt="RECKE Logo" width={36} height={36} className="transition-transform group-hover:scale-105" />
              </div>
              <span className="text-xl font-semibold tracking-tight text-gray-900">RECKE</span>
            </Link>
            <Link href="/auth/signin">
              <Button 
                variant="outline" 
                className="border-gray-300 hover:border-blue-500 hover:text-blue-600 transition-colors"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section - Modern asymmetric layout */}
      <section className="container mx-auto px-4 lg:px-8 pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-6">
              <Sparkles className="h-3.5 w-3.5 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">LinkedIn Puzzle Tracker</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-6 leading-[1.1] tracking-tight">
              Track puzzles.
              <br />
              <span className="text-blue-600">Win bragging rights.</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed">
              The elegant way to track LinkedIn Zip and Queens scores with your team. 
              See who's winning, spot trends, and settle the office debate once and for all.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth/signin">
                <Button 
                  size="lg" 
                  className="text-base px-8 h-12 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 transition-all group"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            
            <p className="text-sm text-gray-500 mt-6 flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5" />
                Secure OAuth
              </span>
              <span className="text-gray-300">•</span>
              <span>No credit card needed</span>
              <span className="text-gray-300">•</span>
              <span>Free forever</span>
            </p>
          </div>
          
          {/* Visual element */}
          <div className="relative lg:block hidden">
            <div className="relative aspect-square max-w-lg ml-auto">
              {/* Decorative background elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl rotate-6" />
              <div className="absolute inset-4 bg-white rounded-2xl shadow-2xl -rotate-3 border border-gray-100 flex items-center justify-center">
                <Image src="/logo.svg" alt="RECKE" width={200} height={200} className="opacity-90" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features - Bento Grid Style */}
      <section id="features" className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Everything you need to track scores
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Built for teams who take their daily puzzles seriously.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="group relative bg-white p-8 rounded-2xl border border-gray-200 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/50 transition-all">
            <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Trophy className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Dual Game Tracking</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Track Zip and Queens separately. Combined leaderboards show the full picture.
            </p>
          </div>

          <div className="group relative bg-white p-8 rounded-2xl border border-gray-200 hover:border-purple-200 hover:shadow-lg hover:shadow-purple-100/50 transition-all">
            <div className="w-11 h-11 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Users className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Multiple Groups</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Work team, friend group, family. Compete in as many groups as you want.
            </p>
          </div>

          <div className="group relative bg-white p-8 rounded-2xl border border-gray-200 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/50 transition-all">
            <div className="w-11 h-11 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Trend Analytics</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              30-day charts reveal patterns. See who's improving and who's slipping.
            </p>
          </div>

          <div className="group relative bg-white p-8 rounded-2xl border border-gray-200 hover:border-green-200 hover:shadow-lg hover:shadow-green-100/50 transition-all">
            <div className="w-11 h-11 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Quick Entry</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Log all scores in seconds with intuitive +/- controls. No friction.
            </p>
          </div>

          <div className="group relative bg-white p-8 rounded-2xl border border-gray-200 hover:border-pink-200 hover:shadow-lg hover:shadow-pink-100/50 transition-all">
            <div className="w-11 h-11 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Crown className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Live Rankings</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Real-time leaderboards update instantly. Know who's on top right now.
            </p>
          </div>

          <div className="group relative bg-white p-8 rounded-2xl border border-gray-200 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100/50 transition-all">
            <div className="w-11 h-11 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Global Rankings</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Opt in to compete worldwide. See how you stack up against everyone.
            </p>
          </div>

          <div className="group relative bg-white p-8 rounded-2xl border border-gray-200 hover:border-red-200 hover:shadow-lg hover:shadow-red-100/50 transition-all">
            <div className="w-11 h-11 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Lock className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Private & Secure</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Your groups stay private. Enterprise-grade security with OAuth 2.0.
            </p>
          </div>

          <div className="group relative bg-white p-8 rounded-2xl border border-gray-200 hover:border-cyan-200 hover:shadow-lg hover:shadow-cyan-100/50 transition-all">
            <div className="w-11 h-11 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Gamepad2 className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Full History</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Every score, every date, forever. Your complete puzzle journey.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works - Cleaner design */}
      <section id="how-it-works" className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16 text-gray-900">
            Get started in three steps
          </h2>
          
          <div className="space-y-12">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-semibold text-lg">
                1
              </div>
              <div className="pt-1">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Sign in with LinkedIn</h3>
                <p className="text-gray-600 leading-relaxed">
                  One click. No passwords. Your existing LinkedIn account gets you in instantly.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-600 text-white flex items-center justify-center font-semibold text-lg">
                2
              </div>
              <div className="pt-1">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Create or join a group</h3>
                <p className="text-gray-600 leading-relaxed">
                  Start your own leaderboard or join your team's existing group. Invite colleagues via email.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-green-600 text-white flex items-center justify-center font-semibold text-lg">
                3
              </div>
              <div className="pt-1">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Log scores and compete</h3>
                <p className="text-gray-600 leading-relaxed">
                  Add your daily Zip and Queens scores. Watch the leaderboard update in real-time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Use Cases */}
      <section className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 p-12 lg:p-16">
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '32px 32px'
            }} />
          </div>
          
          <div className="relative">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12 text-white">
              Who uses RECKE?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Office Teams</h3>
                <p className="text-blue-100 leading-relaxed">
                  Turn daily puzzles into team bonding. Friendly competition that brings people together.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Friend Circles</h3>
                <p className="text-blue-100 leading-relaxed">
                  Keep the group chat alive. Daily scores give you something to talk about.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20">
                  <Trophy className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Puzzle Enthusiasts</h3>
                <p className="text-blue-100 leading-relaxed">
                  Track every detail. Analyze your performance. Become objectively better.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-4 lg:px-8 py-24 lg:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 leading-tight">
            Start tracking scores today
          </h2>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            Sign in with LinkedIn and be up and running in under a minute.
            <br />
            No credit card. No setup hassle. Just clean, simple score tracking.
          </p>
          
          <Link href="/auth/signin">
            <Button 
              size="lg" 
              className="text-base px-10 h-14 bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-600/20 hover:shadow-2xl hover:shadow-blue-600/30 transition-all group"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Get Started Free
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50/50">
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <Image src="/logo.svg" alt="RECKE Logo" width={32} height={32} />
                <span className="font-semibold text-gray-900 text-lg">RECKE</span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Track your LinkedIn puzzle scores with style. Built for teams who love competition.
              </p>
            </div>

            {/* Product */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/#features" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/#how-it-works" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/auth/signin" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    Sign In
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/faq" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-600">
                © {new Date().getFullYear()} RECKE. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
