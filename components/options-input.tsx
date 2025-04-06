"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { X, Plus } from "lucide-react"

interface OptionsInputProps {
  options: string[]
  onChange: (options: string[]) => void
}

export function OptionsInput({ options, onChange }: OptionsInputProps) {
  const [inputValue, setInputValue] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus the input field when the component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleAddOption = () => {
    if (inputValue.trim() === "") return

    // Add the new option to the list
    const newOptions = [...options, inputValue.trim()]
    onChange(newOptions)

    // Clear the input field
    setInputValue("")

    // Focus back on the input field
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddOption()
    }
  }

  const handleRemoveOption = (index: number) => {
    const newOptions = [...options]
    newOptions.splice(index, 1)
    onChange(newOptions)
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <label htmlFor="option-input" className="block font-medium text-gray-700 mb-2">
        Add options to the wheel:
      </label>

      <div className="flex gap-2 mb-4">
        <input
          ref={inputRef}
          id="option-input"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type an option and press Enter..."
          className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          maxLength={50}
        />
        <button
          onClick={handleAddOption}
          disabled={inputValue.trim() === ""}
          className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
          aria-label="Add option"
        >
          <Plus size={20} />
        </button>
      </div>

      {options.length > 0 ? (
        <div>
          <div className="text-sm text-gray-500 mb-2">
            {options.length} option{options.length !== 1 ? "s" : ""} added:
          </div>
          <div className="max-h-60 overflow-y-auto">
            <ul className="space-y-1">
              {options.map((option, index) => (
                <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md group">
                  <span className="truncate">{option}</span>
                  <button
                    onClick={() => handleRemoveOption(index)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-gray-100"
                    aria-label={`Remove ${option}`}
                  >
                    <X size={16} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="text-gray-500 text-sm italic">
          No options added yet. Add at least one option to spin the wheel.
        </div>
      )}
    </div>
  )
}

