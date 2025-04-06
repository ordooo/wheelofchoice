import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Wheel of Choice | Interactive Decision-Making Spinner Tool",
  description:
    "Wheel of Choice is an interactive spinner tool designed to help you make quick and fair decisions. Ideal for educators, teams, and party games.",
  metadataBase: new URL("https://wheelofchoice.io"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Wheel of Choice | Interactive Decision-Making Spinner Tool",
    description:
      "Wheel of Choice is an interactive spinner tool designed to help you make quick and fair decisions. Ideal for educators, teams, and party games.",
    url: "https://wheelofchoice.io",
    siteName: "Wheel of Choice",
    images: [
      {
        url: "https://wheelofchoice.io/og-image.png",
        width: 1200,
        height: 630,
        alt: "Wheel of Choice - Interactive Decision-Making Spinner Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wheel of Choice | Interactive Decision-Making Spinner Tool",
    description:
      "Wheel of Choice is an interactive spinner tool designed to help you make quick and fair decisions. Ideal for educators, teams, and party games.",
    images: ["https://wheelofchoice.io/og-image.png"],
    creator: "@wheelofchoice",
  },
  themeColor: "#3B82F6",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://wheelofchoice.io" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}



import './globals.css'