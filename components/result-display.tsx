"use client"

import { useEffect, useState } from "react"
import { ShareButton } from "./share-button"

interface ResultDisplayProps {
  result: string | null
  options: string[]
}

export function ResultDisplay({ result, options }: ResultDisplayProps) {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    if (result) {
      setAnimate(true)
      const timer = setTimeout(() => setAnimate(false), 1000)
      return () => clearTimeout(timer)
    }
  }, [result])

  if (!result) return null

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full">
      <div className="text-center mb-4">
        <h3 className="text-gray-600 font-medium mb-1">Result:</h3>
        <div
          className={`text-3xl font-bold ${animate ? "animate-bounce" : ""}`}
          style={{
            background: "linear-gradient(to right, #3B82F6, #FACC15)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            padding: "0.5rem",
            borderRadius: "0.5rem",
            boxShadow: "0 0 10px rgba(250, 204, 21, 0.3)",
          }}
        >
          🎉 Winner: {result} 🎉
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <ShareButton options={options} result={result} />
      </div>
    </div>
  )
}

