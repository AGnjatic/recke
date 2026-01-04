import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/Footer"
import { ArrowLeft, Mail, MessageSquare, Clock } from "lucide-react"

export const metadata = {
  title: "Contact Us | RECKE",
  description: "Get in touch with the RECKE team for support, feedback, or questions.",
}

export default function ContactPage() {
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
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-gray-600">
              Have a question, feedback, or need help? We're here for you.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
              <p className="text-sm text-gray-600 mb-4">
                For general inquiries and support
              </p>
              <a href="mailto:help@recke.app" className="text-blue-600 hover:underline font-medium">
                help@recke.app
              </a>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Feedback</h3>
              <p className="text-sm text-gray-600 mb-4">
                Share your ideas and suggestions
              </p>
              <a href="mailto:feedback@recke.app" className="text-purple-600 hover:underline font-medium">
                feedback@recke.app
              </a>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Response Time</h3>
              <p className="text-sm text-gray-600 mb-4">
                We typically respond within
              </p>
              <p className="text-green-600 font-medium">
                24-48 hours
              </p>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 lg:p-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Send Us a Message
            </h2>
            
            <div className="max-w-2xl mx-auto space-y-6">
              <p className="text-gray-600 text-center mb-8">
                Choose the email address that best matches your inquiry:
              </p>

              <div className="grid gap-4">
                <a 
                  href="mailto:help@recke.app?subject=RECKE Support Request" 
                  className="group bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                        General Support & Help
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Account issues, technical problems, or general questions
                      </p>
                      <p className="text-sm font-medium text-blue-600">
                        help@recke.app →
                      </p>
                    </div>
                  </div>
                </a>

                <a 
                  href="mailto:feedback@recke.app?subject=RECKE Feedback" 
                  className="group bg-white p-6 rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
                        Feature Requests & Feedback
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Ideas for improvements, feature suggestions, or general feedback
                      </p>
                      <p className="text-sm font-medium text-purple-600">
                        feedback@recke.app →
                      </p>
                    </div>
                  </div>
                </a>

                <a 
                  href="mailto:privacy@recke.app?subject=Privacy Inquiry" 
                  className="group bg-white p-6 rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-green-600 transition-colors">
                        Privacy & Data Requests
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Data deletion, privacy concerns, or GDPR requests
                      </p>
                      <p className="text-sm font-medium text-green-600">
                        privacy@recke.app →
                      </p>
                    </div>
                  </div>
                </a>

                <a 
                  href="mailto:legal@recke.app?subject=Legal Inquiry" 
                  className="group bg-white p-6 rounded-xl border border-gray-200 hover:border-red-300 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="h-5 w-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-red-600 transition-colors">
                        Legal & Terms
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Terms of service questions or legal matters
                      </p>
                      <p className="text-sm font-medium text-red-600">
                        legal@recke.app →
                      </p>
                    </div>
                  </div>
                </a>
              </div>

              <div className="mt-8 p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3 text-center">
                  📝 Tips for Better Support
                </h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex gap-2">
                    <span className="text-blue-600">•</span>
                    Include your account email address
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600">•</span>
                    Describe the issue or question in detail
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600">•</span>
                    Attach screenshots if relevant
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600">•</span>
                    Include steps to reproduce any bugs
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* FAQ Link */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Looking for quick answers?
            </p>
            <Link href="/faq">
              <Button variant="outline" className="border-gray-300 hover:border-blue-500 hover:text-blue-600">
                Check the FAQ
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

