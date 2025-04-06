import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Random Picker Wheel | Spin the Wheel to Decide",
  description:
    "Use our free random picker wheel to make decisions quickly and fairly. Enter your options, spin the wheel, and let chance decide!",
  metadataBase: new URL("https://wheelofchoice.io"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Random Picker Wheel | Spin the Wheel to Decide",
    description:
      "Use our free random picker wheel to make decisions quickly and fairly. Enter your options, spin the wheel, and let chance decide!",
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
    title: "Random Picker Wheel | Spin the Wheel to Decide",
    description:
      "Use our free random picker wheel to make decisions quickly and fairly. Enter your options, spin the wheel, and let chance decide!",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Wheel of Choice",
              url: "https://wheelofchoice.io",
              description:
                "An interactive random picker wheel for making decisions quickly and fairly. Enter your options, spin the wheel, and let chance decide!",
              applicationCategory: "UtilityApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              screenshot: {
                "@type": "ImageObject",
                url: "https://wheelofchoice.io/og-image.png",
                width: "1200",
                height: "630",
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

