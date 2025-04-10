import { Suspense } from "react"
import { WheelContainer } from "@/components/wheel-container"
import { SeoContentSection } from "@/components/seo-content-section"
import { DecisionParalysisSection } from "@/components/decision-paralysis-section"
import Image from "next/image"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-yellow-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex justify-center mb-4">
           </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-yellow-500 mb-2">
            Wheel of Choice 🎡
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-2">Spin to Decide: Making Choices Fun and Fair!</p>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Enter your options, spin the wheel, and let fate decide! Perfect for making decisions, picking winners, or
            just having fun.
          </p>
        </header>

        <Suspense fallback={<WheelContainerSkeleton />}>
          <WheelContainer />
        </Suspense>

        {/* SEO Content Section */}
        <SeoContentSection />

        {/* Decision Paralysis Section */}
        <DecisionParalysisSection />

        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>
            © {new Date().getFullYear()} <span className="font-medium">wheelofchoice.io</span>. All rights reserved.
          </p>
          <div className="mt-2">
            <a href="/blog" className="text-blue-500 hover:underline">
              Read Our Blog
            </a>
          </div>
        </footer>
      </div>
    </main>
  )
}

function WheelContainerSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
        <div className="h-40 bg-gray-200 rounded-lg animate-pulse"></div>
        <div className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
        <div className="h-40 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
      <div className="w-full lg:w-1/2 flex flex-col items-center gap-6">
        <div className="w-[280px] h-[280px] md:w-[350px] md:h-[350px] rounded-full bg-gray-200 animate-pulse"></div>
        <div className="h-14 w-32 bg-gray-200 rounded-full animate-pulse"></div>
      </div>
    </div>
  )
}

