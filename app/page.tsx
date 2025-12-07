import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Trophy, Users, TrendingUp, Lock, Zap, BarChart3, Crown, Gamepad2 } from "lucide-react"
import Image from "next/image"

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.svg" alt="RECKE Logo" width={50} height={50} />
            <span className="text-2xl font-bold text-blue-600">RECKE</span>
          </div>
          <Link href="/auth/signin">
            <Button variant="outline">Sign In</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block mb-4">
            <Image src="/logo.svg" alt="RECKE Logo" width={120} height={120} className="mx-auto" />
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Track Your LinkedIn Puzzle Scores Like a Pro
          </h1>
          <p className="text-2xl text-gray-600 mb-8">
            The ultimate score tracker for LinkedIn's Zip and Queens puzzles. 
            Compete with colleagues, visualize trends, and become the puzzle champion!
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/auth/signin">
              <Button size="lg" className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                Get Started Free
              </Button>
            </Link>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            No credit card required • Sign in with LinkedIn in seconds
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-16 bg-white rounded-2xl shadow-lg my-16">
        <h2 className="text-4xl font-bold text-center mb-12">How RECKE Works</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl font-bold text-blue-600">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Sign In with LinkedIn</h3>
            <p className="text-gray-600">
              Quick and secure authentication using your LinkedIn account. No passwords to remember!
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl font-bold text-purple-600">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Create Groups</h3>
            <p className="text-gray-600">
              Invite colleagues to compete. Create multiple groups for different teams or friends.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl font-bold text-green-600">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Track & Compete</h3>
            <p className="text-gray-600">
              Add your Zip & Queens scores daily, see real-time leaderboards, and watch the trends!
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Why Teams Love RECKE</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center mb-4">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Separate Game Tracking</h3>
            <p className="text-gray-600">
              Track Zip and Queens scores independently with combined total leaderboards.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Multiple Groups</h3>
            <p className="text-gray-600">
              Compete in different groups simultaneously. Work team, friend group, family - all separate!
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Trend Visualization</h3>
            <p className="text-gray-600">
              Beautiful charts showing 30-day score progression and lead changes over time.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Quick Entry</h3>
            <p className="text-gray-600">
              Intuitive +/- buttons for instant score entry. Add all players' scores in seconds!
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-lg flex items-center justify-center mb-4">
              <Crown className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-time Leader</h3>
            <p className="text-gray-600">
              See who's winning instantly with visual indicators and winner banners.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Global Leaderboard</h3>
            <p className="text-gray-600">
              Opt-in to compete worldwide. See how you rank against all RECKE users!
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-lg flex items-center justify-center mb-4">
              <Lock className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Private & Secure</h3>
            <p className="text-gray-600">
              Your groups are private by default. Enterprise-grade security with OAuth 2.0.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg flex items-center justify-center mb-4">
              <Gamepad2 className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">History Tracking</h3>
            <p className="text-gray-600">
              Full score history with date tracking. Never lose track of your puzzle journey!
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="container mx-auto px-4 py-16 my-16">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <h2 className="text-4xl font-bold text-center mb-12">Perfect For</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-6xl mb-4">💼</div>
              <h3 className="text-2xl font-semibold mb-2">Office Teams</h3>
              <p className="text-blue-100">
                Build team camaraderie with friendly puzzle competitions during breaks.
              </p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">👥</div>
              <h3 className="text-2xl font-semibold mb-2">Friend Groups</h3>
              <p className="text-blue-100">
                Stay connected with friends through daily puzzle challenges.
              </p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">🏆</div>
              <h3 className="text-2xl font-semibold mb-2">Competitive Players</h3>
              <p className="text-blue-100">
                Track your progress, analyze trends, and prove you're the best!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-5xl font-bold mb-6">
            Ready to Become the Puzzle Champion?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join RECKE today and start tracking your LinkedIn puzzle scores. 
            It's free, fast, and fun!
          </p>
          <Link href="/auth/signin">
            <Button size="lg" className="text-lg px-12 py-6 bg-blue-600 hover:bg-blue-700">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Start Tracking Now - It's Free!
            </Button>
          </Link>
          <p className="text-sm text-gray-500 mt-4">
            🔒 Secure LinkedIn OAuth • 🚀 No setup required • 💯 100% Free
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Image src="/logo.svg" alt="RECKE Logo" width={30} height={30} />
              <span className="font-semibold text-gray-700">RECKE</span>
            </div>
            <p className="text-sm text-gray-600">
              © 2024 RECKE. Track your LinkedIn puzzle scores with style.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
