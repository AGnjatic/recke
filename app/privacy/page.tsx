import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/Footer"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Privacy Policy | RECKE",
  description: "Learn how RECKE collects, uses, and protects your data.",
}

export default function PrivacyPage() {
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

        <div className="max-w-3xl mx-auto prose prose-gray">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <div className="space-y-8 text-gray-600">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
              <p className="leading-relaxed">
                Welcome to RECKE. We respect your privacy and are committed to protecting your personal data. 
                This privacy policy explains how we collect, use, and safeguard your information when you use our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Information from LinkedIn</h3>
              <p className="leading-relaxed mb-3">
                When you sign in with LinkedIn, we collect:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Your name</li>
                <li>Your email address</li>
                <li>Your profile picture</li>
                <li>Your LinkedIn profile URL</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Information You Provide</h3>
              <p className="leading-relaxed mb-3">
                When you use RECKE, we collect:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Puzzle scores (Zip and Queens)</li>
                <li>Group names and memberships</li>
                <li>Invitation emails sent through the platform</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Automatically Collected Information</h3>
              <p className="leading-relaxed mb-3">
                We automatically collect:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Device information (browser type, operating system)</li>
                <li>Usage data (pages visited, features used)</li>
                <li>IP address and location data</li>
                <li>Timestamps of actions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
              <p className="leading-relaxed mb-3">
                We use your information to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide and maintain our service</li>
                <li>Authenticate your account via LinkedIn OAuth</li>
                <li>Display leaderboards and score tracking</li>
                <li>Send group invitations on your behalf</li>
                <li>Improve and optimize the platform</li>
                <li>Communicate important updates or changes</li>
                <li>Ensure security and prevent fraud</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Sharing and Disclosure</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Within Groups</h3>
              <p className="leading-relaxed mb-4">
                Your name, profile picture, and scores are visible to other members of groups you join. 
                This is essential for the competitive nature of the platform.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Global Leaderboard</h3>
              <p className="leading-relaxed mb-4">
                If you opt into the global leaderboard feature, your name and scores will be visible to all RECKE users. 
                This is entirely optional and can be disabled at any time.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Third Parties</h3>
              <p className="leading-relaxed mb-3">
                We do not sell your personal data. We may share data with:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>LinkedIn:</strong> For authentication purposes via OAuth 2.0</li>
                <li><strong>Service providers:</strong> Hosting, analytics, and infrastructure providers bound by confidentiality agreements</li>
                <li><strong>Legal requirements:</strong> If required by law or to protect our rights</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
              <p className="leading-relaxed mb-3">
                We implement industry-standard security measures to protect your data:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Encryption in transit (HTTPS/TLS)</li>
                <li>Encryption at rest for sensitive data</li>
                <li>OAuth 2.0 authentication (your LinkedIn password never touches our servers)</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and monitoring</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights and Choices</h2>
              <p className="leading-relaxed mb-3">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your account and data</li>
                <li><strong>Export:</strong> Download your data in a portable format</li>
                <li><strong>Opt-out:</strong> Disable the global leaderboard feature</li>
                <li><strong>Object:</strong> Object to certain processing activities</li>
              </ul>
              <p className="leading-relaxed mt-4">
                To exercise these rights, please contact us at the email provided below.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Retention</h2>
              <p className="leading-relaxed">
                We retain your data for as long as your account is active. If you delete your account, 
                we will delete your personal information within 30 days, except where we are required to retain 
                it for legal compliance or legitimate business purposes (e.g., resolving disputes).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking</h2>
              <p className="leading-relaxed mb-3">
                We use cookies and similar technologies for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Authentication and session management</li>
                <li>Remembering your preferences</li>
                <li>Analytics and performance monitoring</li>
                <li>Security and fraud prevention</li>
              </ul>
              <p className="leading-relaxed mt-4">
                You can control cookies through your browser settings, but some features may not work properly if cookies are disabled.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
              <p className="leading-relaxed">
                RECKE is not intended for users under 18 years of age. We do not knowingly collect data from children. 
                If we become aware that we have collected data from a child, we will take steps to delete it promptly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">International Data Transfers</h2>
              <p className="leading-relaxed">
                Your data may be transferred to and processed in countries other than your country of residence. 
                We ensure appropriate safeguards are in place to protect your data in accordance with this privacy policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
              <p className="leading-relaxed">
                We may update this privacy policy from time to time. We will notify you of any material changes by 
                posting the new policy on this page and updating the "Last updated" date. Your continued use of RECKE 
                after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="leading-relaxed mb-3">
                If you have questions about this privacy policy or our data practices, please contact us:
              </p>
              <ul className="list-none space-y-2">
                <li><strong>Email:</strong> privacy@recke.app</li>
                <li><strong>Contact Form:</strong> <Link href="/contact" className="text-blue-600 hover:underline">recke.app/contact</Link></li>
              </ul>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

