"use client"

import { useState } from "react"
import { Share2, Copy, Check, Facebook, Twitter, Send } from "lucide-react"

interface ShareButtonProps {
  options: string[]
  result: string | null
}

export function ShareButton({ options, result }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  if (!result) return null

  const shareUrl = `https://wheelofchoice.io/?choices=${encodeURIComponent(options.join(","))}`
  const shareTitle = `I used Wheel of Choice and got: ${result}`
  const shareText = `I spun the Wheel of Choice with ${options.length} options and got: ${result}. Try it yourself!`

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const shareToFacebook = () => {
    if (typeof window !== "undefined") {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
        "_blank",
      )
    }
  }

  const shareToTwitter = () => {
    if (typeof window !== "undefined") {
      window.open(
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
        "_blank",
      )
    }
  }

  const shareToWhatsApp = () => {
    if (typeof window !== "undefined") {
      window.open(`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`, "_blank")
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        aria-label="Share this wheel result"
      >
        <Share2 size={18} aria-hidden="true" />
        <span>Share this result</span>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 border border-gray-200">
          <div className="px-4 py-2 border-b border-gray-200">
            <p className="font-medium text-gray-700">Share your result:</p>
            <p className="text-sm text-gray-500 truncate">{result}</p>
          </div>

          <button
            onClick={copyToClipboard}
            className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors"
            aria-label="Copy link to clipboard"
          >
            {copied ? (
              <Check size={18} className="text-green-500" aria-hidden="true" />
            ) : (
              <Copy size={18} aria-hidden="true" />
            )}
            <span>{copied ? "Copied!" : "Copy link"}</span>
          </button>

          <button
            onClick={shareToFacebook}
            className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors"
            aria-label="Share to Facebook"
          >
            <Facebook size={18} className="text-blue-600" aria-hidden="true" />
            <span>Share to Facebook</span>
          </button>

          <button
            onClick={shareToTwitter}
            className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors"
            aria-label="Share to Twitter"
          >
            <Twitter size={18} className="text-blue-400" aria-hidden="true" />
            <span>Share to Twitter</span>
          </button>

          <button
            onClick={shareToWhatsApp}
            className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors"
            aria-label="Share to WhatsApp"
          >
            <Send size={18} className="text-green-500" aria-hidden="true" />
            <span>Share to WhatsApp</span>
          </button>
        </div>
      )}
    </div>
  )
}

