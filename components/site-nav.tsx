"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function SiteNav() {
  const pathname = usePathname()

  return (
    <nav className="bg-white shadow-sm rounded-lg py-3 px-4 mb-8">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-yellow-500"
        >
          Wheel of Choice
        </Link>

        <ul className="flex space-x-6">
          <li>
            <Link
              href="/"
              className={`text-gray-600 hover:text-blue-600 transition-colors ${
                pathname === "/" ? "font-medium text-blue-600" : ""
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className={`text-gray-600 hover:text-blue-600 transition-colors ${
                pathname.startsWith("/blog") ? "font-medium text-blue-600" : ""
              }`}
            >
              Blog
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

