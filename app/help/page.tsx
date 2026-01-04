import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/Footer"
import { ArrowLeft, BookOpen, MessageSquare, Mail } from "lucide-react"

export const metadata = {
  title: "Help Center | RECKE",
  description: "Get help with using RECKE to track your LinkedIn puzzle scores.",
}

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-white">
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
              <Button variant="outline" className="border-gray-300 hover:border-blue-500 hover:text-blue-600 transition-colors">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Help Center
          </h1>
          <p className="text-lg text-gray-600 mb-12">
            Everything you need to know about using RECKE.
          </p>

          {/* Quick Links */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Link href="/faq" className="group">
              <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all">
                <BookOpen className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  FAQ
                </h3>
                <p className="text-sm text-gray-600">
                  Find answers to frequently asked questions
                </p>
              </div>
            </Link>

            <Link href="/contact" className="group">
              <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-purple-200 hover:shadow-lg transition-all">
                <MessageSquare className="h-8 w-8 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  Contact Support
                </h3>
                <p className="text-sm text-gray-600">
                  Get in touch with our support team
                </p>
              </div>
            </Link>

            <a href="mailto:help@recke.app" className="group">
              <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-green-200 hover:shadow-lg transition-all">
                <Mail className="h-8 w-8 text-green-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                  Email Us
                </h3>
                <p className="text-sm text-gray-600">
                  help@recke.app
                </p>
              </div>
            </a>
          </div>

          {/* Getting Started Guide */}
          <div className="space-y-12">
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Getting Started Guide</h2>
              
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-semibold">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">Create Your Account</h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        Click "Sign In" in the top right corner and authenticate with your LinkedIn account. 
                        It's completely secure using OAuth 2.0 - we never see your LinkedIn password.
                      </p>
                      <Link href="/auth/signin">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Sign In with LinkedIn
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-semibold">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">Create or Join a Group</h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        After signing in, you'll land on your dashboard. Click "Create Group" to start your own leaderboard, 
                        or accept any pending invitations to join existing groups. You can be in multiple groups at once!
                      </p>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-900">Creating a group:</p>
                        <ul className="text-sm text-gray-700 space-y-1 ml-4 list-disc">
                          <li>Give your group a name (e.g., "Office Squad" or "Friday Puzzlers")</li>
                          <li>Invite members by entering their email addresses</li>
                          <li>They'll receive an invitation and can join after signing in</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-2xl p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-green-600 text-white flex items-center justify-center font-semibold">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">Add Your Scores</h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        After playing LinkedIn's Zip or Queens puzzle, add your score to RECKE. Click "Add Score" on your group page, 
                        select the game type, enter your score, and save. The leaderboard updates instantly!
                      </p>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-900">Quick tips:</p>
                        <ul className="text-sm text-gray-700 space-y-1 ml-4 list-disc">
                          <li>Use the +/- buttons for quick score entry</li>
                          <li>Lower scores are better (golf scoring)</li>
                          <li>Add scores for other group members if needed</li>
                          <li>Check the trend chart to see your progress over 30 days</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Common Tasks */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Common Tasks</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Invite Members to Your Group</h3>
                  <ol className="text-sm text-gray-600 space-y-2 list-decimal ml-4">
                    <li>Go to your group page</li>
                    <li>Click "Invite User"</li>
                    <li>Enter email addresses (one per line)</li>
                    <li>Click "Send Invitations"</li>
                    <li>Members will see the invite after signing in</li>
                  </ol>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">View Your Performance Trends</h3>
                  <ol className="text-sm text-gray-600 space-y-2 list-decimal ml-4">
                    <li>Navigate to any group page</li>
                    <li>Scroll to the "Trends" section</li>
                    <li>View the 30-day chart showing all members' scores</li>
                    <li>See how you're improving over time</li>
                    <li>Identify patterns in your gameplay</li>
                  </ol>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Enable Global Leaderboard</h3>
                  <ol className="text-sm text-gray-600 space-y-2 list-decimal ml-4">
                    <li>Go to your group page</li>
                    <li>Look for the "Global Leaderboard" option</li>
                    <li>Click to opt in (this is optional)</li>
                    <li>Your scores will be visible to all RECKE users</li>
                    <li>You can opt out at any time</li>
                  </ol>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Leave a Group</h3>
                  <ol className="text-sm text-gray-600 space-y-2 list-decimal ml-4">
                    <li>Go to the group you want to leave</li>
                    <li>Click on the group settings</li>
                    <li>Select "Leave Group"</li>
                    <li>Confirm your decision</li>
                    <li>Your scores will be archived but no longer visible</li>
                  </ol>
                </div>
              </div>
            </section>

            {/* Tips & Best Practices */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Tips & Best Practices</h2>
              
              <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl p-8">
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <span className="text-blue-600 font-bold">💡</span>
                    <p className="text-gray-700">
                      <strong>Log scores daily:</strong> Make it a habit to add your scores right after playing. 
                      Fresh scores = accurate scores!
                    </p>
                  </div>
                  
                  <div className="flex gap-3">
                    <span className="text-purple-600 font-bold">📊</span>
                    <p className="text-gray-700">
                      <strong>Check trends weekly:</strong> Review your 30-day chart to spot patterns. 
                      Are you improving? Plateauing? Use the data to get better!
                    </p>
                  </div>
                  
                  <div className="flex gap-3">
                    <span className="text-green-600 font-bold">👥</span>
                    <p className="text-gray-700">
                      <strong>Invite the right people:</strong> Groups work best with 4-10 active members. 
                      Too few = boring, too many = overwhelming.
                    </p>
                  </div>
                  
                  <div className="flex gap-3">
                    <span className="text-orange-600 font-bold">🏆</span>
                    <p className="text-gray-700">
                      <strong>Keep it friendly:</strong> RECKE is about fun competition. Celebrate wins, 
                      laugh at losses, and enjoy the camaraderie!
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Still need help? */}
          <div className="mt-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-2">
              Still need help?
            </h2>
            <p className="text-blue-100 mb-6">
              Our support team is here to help you get the most out of RECKE.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/faq">
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  Read the FAQ
                </Button>
              </Link>
              <Link href="/contact">
                <Button className="bg-white text-blue-600 hover:bg-gray-100">
                  Contact Support
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

