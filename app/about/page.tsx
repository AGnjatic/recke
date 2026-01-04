import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Target, Heart, Shield, Sparkles } from "lucide-react";

export const metadata = {
  title: "About RECKE | LinkedIn Puzzle Score Tracker",
  description:
    "Learn about RECKE and why we built the best LinkedIn puzzle score tracking platform.",
};

export default function AboutPage() {
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

        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-6">
              <Sparkles className="h-3.5 w-3.5 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">
                About RECKE
              </span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Making puzzle competition fun, fair, and friction-free
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              RECKE brings friendly competition to LinkedIn's daily puzzles. No
              spreadsheets, no group chats, no confusion. Just pure, simple
              score tracking.
            </p>
          </div>

          {/* Origin Story */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">The Story</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                It started with a simple problem: our office started competing
                on LinkedIn's Zip and Queens puzzles, but tracking scores in a
                group chat was chaos. Messages got buried, scores were lost, and
                nobody could remember who was actually winning.
              </p>
              <p>
                Someone created a spreadsheet. That helped, for about a week.
                Then it became a mess of typos, missing dates, and endless
                confusion about who was supposed to update it.
              </p>
              <p>
                We thought: there has to be a better way. So we built RECKE.
              </p>
              <p>
                No clutter. No confusion. Just a clean, simple platform where
                you can track scores, see real-time leaderboards, and actually
                enjoy the competition without the hassle.
              </p>
            </div>

            {/* Name Origin */}
            <div className="mt-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
              <p className="text-gray-700 leading-relaxed">
                <span className="font-semibold text-gray-900">
                  Why "RECKE"?
                </span>{" "}
                The name comes from the Serbian word for "tally marks", those
                simple lines you'd draw to keep score. It felt perfect for what
                we're doing: keeping track of scores in the most straightforward
                way possible.
              </p>
            </div>
          </section>

          {/* Mission & Values */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              What We Stand For
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-8">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Simplicity First
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  No learning curves. No complicated features you'll never use.
                  RECKE does one thing really well: tracking puzzle scores.
                  That's it.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl p-8">
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Built for Fun
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Competition should be enjoyable. We're not changing the world,
                  we're making your daily puzzle ritual more fun with friends
                  and colleagues.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-2xl p-8">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Privacy Matters
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Your groups are private by default. We collect only what's
                  necessary. No selling data, no shady practices, no surprises.
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-2xl p-8">
                <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Always Free
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  RECKE is free. No premium tiers, no paywalls, no "upgrade to
                  unlock" nonsense. We built this because we needed it, not to
                  get rich.
                </p>
              </div>
            </div>
          </section>

          {/* Why We Built This */}
          <section className="mb-16">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 lg:p-12 text-white">
              <h2 className="text-3xl font-bold mb-6">Why We Built This</h2>
              <div className="space-y-4 text-gray-200 leading-relaxed">
                <p>
                  We're software engineers who love solving problems. When our
                  own team struggled with tracking puzzle scores, we saw an
                  opportunity to build something useful.
                </p>
                <p>
                  LinkedIn's puzzles are brilliant, they're quick mental breaks
                  that bring people together. But there was no good way to
                  compete over time. We wanted to see trends, compare
                  performance, and have a little friendly trash talk without the
                  hassle of managing spreadsheets.
                </p>
                <p>
                  So we built RECKE for ourselves. Then we realized others might
                  want it too.
                </p>
                <p className="pt-4 text-white font-medium">
                  That's it. No grand mission. No disruption. Just a useful tool
                  for people who enjoy puzzles and friendly competition.
                </p>
              </div>
            </div>
          </section>

          {/* Technical Details */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              How We Built It
            </h2>
            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <p className="text-gray-600 leading-relaxed mb-6">
                RECKE is built with modern web technologies for speed, security,
                and reliability:
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold text-lg">⚡</span>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Lightning Fast
                    </p>
                    <p className="text-gray-600">
                      Built with Next.js and React for instant page loads
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-purple-600 font-bold text-lg">🔒</span>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Secure by Default
                    </p>
                    <p className="text-gray-600">
                      OAuth 2.0, encrypted data, regular security audits
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-lg">📊</span>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Real-time Updates
                    </p>
                    <p className="text-gray-600">
                      Leaderboards update instantly when scores are added
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-orange-600 font-bold text-lg">📱</span>
                  <div>
                    <p className="font-semibold text-gray-900">Mobile-First</p>
                    <p className="text-gray-600">
                      Works perfectly on phones, tablets, and desktops
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Not Affiliated */}
          <section className="mb-16">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
              <p className="text-sm text-gray-600">
                <strong className="text-gray-900">Note:</strong> RECKE is an
                independent platform and is not affiliated with, endorsed by, or
                sponsored by LinkedIn Corporation. LinkedIn, Zip, and Queens are
                trademarks of LinkedIn Corporation.
              </p>
            </div>
          </section>

          {/* CTA */}
          <div className="text-center bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to start tracking?
            </h2>
            <p className="text-blue-100 mb-8 text-lg">
              Join teams already using RECKE to make puzzle competition more
              fun.
            </p>
            <Link href="/auth/signin">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 text-base px-8 h-12"
              >
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
