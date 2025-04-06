"use client"

import { useState } from "react"
import { presets } from "@/lib/presets"

interface PresetSelectorProps {
  onSelect: (presetKey: string) => void
}

export function PresetSelector({ onSelect }: PresetSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (presetKey: string) => {
    onSelect(presetKey)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-50 transition-colors"
      >
        <span>🎲 Presets</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-56 bg-white rounded-lg shadow-lg py-1 border border-gray-200">
          {Object.keys(presets).map((key) => (
            <button
              key={key}
              onClick={() => handleSelect(key)}
              className="w-full text-left px-4 py-2 hover:bg-purple-50 transition-colors"
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

