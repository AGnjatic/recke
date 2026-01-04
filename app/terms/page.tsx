import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/Footer"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Terms of Service | RECKE",
  description: "Read the terms and conditions for using RECKE.",
}

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p className="text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <div className="space-y-8 text-gray-600">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Agreement to Terms</h2>
              <p className="leading-relaxed">
                By accessing or using RECKE ("Service", "Platform", "we", "us", or "our"), you agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Description of Service</h2>
              <p className="leading-relaxed mb-3">
                RECKE is a web-based platform that allows users to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Track scores for LinkedIn's daily puzzle games (Zip and Queens)</li>
                <li>Create and join competitive groups with other users</li>
                <li>View leaderboards and performance analytics</li>
                <li>Compete in optional global rankings</li>
              </ul>
              <p className="leading-relaxed mt-4">
                The Service is provided free of charge and is intended for personal, non-commercial use.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">User Accounts</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Account Creation</h3>
              <p className="leading-relaxed mb-4">
                To use RECKE, you must authenticate using your LinkedIn account via OAuth 2.0. 
                By creating an account, you represent that you are at least 18 years old and have the legal capacity to enter into these terms.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Account Security</h3>
              <p className="leading-relaxed mb-4">
                You are responsible for maintaining the security of your LinkedIn account. 
                Any activity that occurs through your account is your responsibility. 
                Notify us immediately if you suspect unauthorized access.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Account Termination</h3>
              <p className="leading-relaxed">
                You may delete your account at any time through the platform settings. 
                We reserve the right to suspend or terminate accounts that violate these terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceptable Use</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">You agree NOT to:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Submit false, inaccurate, or fraudulent scores</li>
                <li>Manipulate or cheat the leaderboard system</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Use the Service for any illegal or unauthorized purpose</li>
                <li>Attempt to gain unauthorized access to the platform or other users' accounts</li>
                <li>Reverse engineer, decompile, or disassemble any part of the Service</li>
                <li>Use automated scripts, bots, or scrapers to access the Service</li>
                <li>Interfere with or disrupt the Service's operation</li>
                <li>Impersonate another person or entity</li>
                <li>Transmit viruses, malware, or any harmful code</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">User Content and Conduct</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Your Content</h3>
              <p className="leading-relaxed mb-4">
                You retain ownership of any scores, group names, and other content you submit. 
                By submitting content, you grant us a license to use, display, and process it as necessary to provide the Service.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Score Integrity</h3>
              <p className="leading-relaxed mb-4">
                RECKE is built on trust and fair competition. You agree to submit accurate scores from legitimate gameplay. 
                We reserve the right to remove scores or ban users who violate this principle.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Group Management</h3>
              <p className="leading-relaxed">
                Group creators are responsible for managing their groups appropriately. 
                We are not responsible for disputes between group members or the content shared within groups.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property</h2>
              <p className="leading-relaxed mb-3">
                The Service, including its design, code, branding, and content, is owned by RECKE and protected by intellectual property laws. 
                You may not:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Copy, modify, or create derivative works of the Service</li>
                <li>Use our trademarks, logos, or branding without permission</li>
                <li>Remove or alter any copyright or proprietary notices</li>
              </ul>
              <p className="leading-relaxed mt-4">
                Note: LinkedIn, Zip, and Queens are trademarks of LinkedIn Corporation. RECKE is an independent platform and is not affiliated with, endorsed by, or sponsored by LinkedIn.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy</h2>
              <p className="leading-relaxed">
                Your use of the Service is also governed by our <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>, 
                which explains how we collect, use, and protect your data. By using RECKE, you consent to our data practices as described in the Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Disclaimer of Warranties</h2>
              <p className="leading-relaxed mb-3">
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Warranties of merchantability, fitness for a particular purpose, or non-infringement</li>
                <li>Accuracy, reliability, or availability of the Service</li>
                <li>Freedom from errors, bugs, or interruptions</li>
              </ul>
              <p className="leading-relaxed mt-4">
                We do not guarantee that the Service will meet your requirements or be uninterrupted, secure, or error-free.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
              <p className="leading-relaxed">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, RECKE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, 
                OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR GOODWILL, ARISING FROM YOUR USE OF THE SERVICE.
              </p>
              <p className="leading-relaxed mt-4">
                Our total liability to you for any claims arising from your use of the Service shall not exceed $100 USD.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Indemnification</h2>
              <p className="leading-relaxed">
                You agree to indemnify and hold harmless RECKE, its affiliates, officers, directors, employees, and agents from any claims, 
                damages, losses, liabilities, and expenses (including legal fees) arising from:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Your use of the Service</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any rights of another party</li>
                <li>Content you submit through the Service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Service</h2>
              <p className="leading-relaxed">
                We reserve the right to modify, suspend, or discontinue the Service (or any part of it) at any time, 
                with or without notice. We are not liable to you or any third party for any such changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
              <p className="leading-relaxed">
                We may update these Terms of Service from time to time. We will notify you of material changes by posting the updated terms on this page 
                and updating the "Last updated" date. Your continued use of the Service after changes constitutes acceptance of the updated terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
              <p className="leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which RECKE operates, 
                without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Dispute Resolution</h2>
              <p className="leading-relaxed">
                Any disputes arising from these Terms or your use of the Service shall be resolved through binding arbitration, 
                except where prohibited by law. You waive your right to participate in class-action lawsuits.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Severability</h2>
              <p className="leading-relaxed">
                If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, 
                and the remaining provisions shall remain in full force and effect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Entire Agreement</h2>
              <p className="leading-relaxed">
                These Terms, together with our Privacy Policy, constitute the entire agreement between you and RECKE regarding your use of the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="leading-relaxed mb-3">
                If you have questions about these Terms of Service, please contact us:
              </p>
              <ul className="list-none space-y-2">
                <li><strong>Email:</strong> support@recke.io</li>
                <li><strong>Contact Form:</strong> <Link href="/contact" className="text-blue-600 hover:underline">recke.io/contact</Link></li>
              </ul>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

