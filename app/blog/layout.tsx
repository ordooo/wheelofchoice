import type React from "react"
import { SiteNav } from "@/components/site-nav"
import Link from "next/link"

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-yellow-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <SiteNav />

        <main className="bg-white rounded-lg shadow-md p-6 md:p-8">{children}</main>

        <footer className="mt-16 text-center text-gray-500 text-sm border-t border-gray-200 pt-8">
          <p>
            © {new Date().getFullYear()} <span className="font-medium">wheelofchoice.io</span>. All rights reserved.
          </p>
          <div className="mt-2 flex justify-center space-x-4">
            <Link href="/" className="hover:text-blue-500 transition-colors">
              Home
            </Link>
            <Link href="/blog" className="hover:text-blue-500 transition-colors">
              Blog
            </Link>
          </div>
          <div className="mt-4">
            <Link href="/" className="text-blue-600 hover:text-blue-800 transition-colors font-medium">
              Try the Wheel of Choice now
            </Link>
          </div>
        </footer>
      </div>
    </div>
  )
}

