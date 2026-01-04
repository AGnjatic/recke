import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { ArrowLeft, ChevronDown } from "lucide-react";

export const metadata = {
  title: "FAQ - Frequently Asked Questions | RECKE",
  description:
    "Find answers to common questions about RECKE, the LinkedIn puzzle score tracker.",
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative">
                <Image
                  src="/logo.svg"
                  alt="RECKE Logo"
                  width={36}
                  height={36}
                  className="transition-transform group-hover:scale-105"
                />
              </div>
              <span className="text-xl font-semibold tracking-tight text-gray-900">
                RECKE
              </span>
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

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 mb-12">
            Everything you need to know about RECKE.
          </p>

          <div className="space-y-6">
            {/* General */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">General</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    What is RECKE?
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    RECKE is a score tracking platform for LinkedIn's daily
                    puzzle games (Zip and Queens). It allows you to compete with
                    colleagues, track your progress over time, and see real-time
                    leaderboards.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Is RECKE free?
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Yes! RECKE is completely free to use. There are no
                    subscription fees, no premium tiers, and no hidden costs.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Do I need a LinkedIn account?
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Yes, RECKE uses LinkedIn OAuth for secure authentication.
                    You'll sign in with your existing LinkedIn account, no
                    separate password needed.
                  </p>
                </div>
              </div>
            </div>

            {/* Getting Started */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Getting Started
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    How do I create a group?
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    After signing in, click "Create Group" on your dashboard.
                    Give your group a name, then invite members by entering
                    their email addresses. They'll receive an invitation to
                    join.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    How do I join a group?
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    When someone invites you to a group, you'll see an
                    invitation on your dashboard after signing in. Simply click
                    "Accept" to join the group.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    How do I add scores?
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    On any group page, you'll see an "Add Score" button. Click
                    it, select the game type (Zip or Queens), enter the score,
                    and save. You can also use the quick +/- buttons on the
                    leaderboard for faster entry.
                  </p>
                </div>
              </div>
            </div>

            {/* Scoring & Competition */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Scoring & Competition
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    How are scores calculated?
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    The leaderboard shows total points across all games. Zip and
                    Queens scores are tracked separately, but combined for the
                    overall ranking. Lower scores are better (it's golf
                    scoring).
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Can I be in multiple groups?
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Absolutely! You can join as many groups as you want. Your
                    scores are tracked separately in each group, so you can
                    compete with different teams simultaneously.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    What is the global leaderboard?
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    The global leaderboard is an opt-in feature that lets you
                    compete against all RECKE users worldwide. You can enable it
                    in your group settings if you want to see how you rank
                    globally.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Can I edit or delete scores?
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Currently, scores cannot be edited or deleted once submitted
                    to maintain competition integrity. If you made a mistake,
                    please contact us for assistance.
                  </p>
                </div>
              </div>
            </div>

            {/* Privacy & Security */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Privacy & Security
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Is my data secure?
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Yes. We use enterprise-grade security with OAuth 2.0
                    authentication. Your LinkedIn credentials never touch our
                    servers. All data is encrypted and stored securely.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Are my groups private?
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Yes, by default all groups are private. Only invited members
                    can see the group and its scores. You can opt into the
                    global leaderboard separately if you choose.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    What data do you collect?
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    We only collect what's necessary: your LinkedIn profile
                    information (name, email, profile picture), your puzzle
                    scores, and group memberships. See our{" "}
                    <Link
                      href="/privacy"
                      className="text-blue-600 hover:underline"
                    >
                      Privacy Policy
                    </Link>{" "}
                    for full details.
                  </p>
                </div>
              </div>
            </div>

            {/* Troubleshooting */}
            <div className="pb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Troubleshooting
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    I can't sign in with LinkedIn
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Make sure you're allowing pop-ups from RECKE in your
                    browser. If issues persist, try clearing your browser cache
                    or using a different browser. Contact us if the problem
                    continues.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    I didn't receive a group invitation
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Check your spam folder. Invitations appear on your dashboard
                    after you sign in, so make sure you've logged into RECKE. If
                    you still don't see it, ask the group creator to resend the
                    invitation.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    The leaderboard isn't updating
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Try refreshing the page. Leaderboards update in real-time,
                    but occasionally your browser cache might need a refresh. If
                    the issue persists, please contact support.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Still have questions? */}
          <div className="mt-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Still have questions?
            </h2>
            <p className="text-gray-600 mb-6">
              We're here to help. Reach out to our support team.
            </p>
            <Link href="/contact">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
