"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Wheel } from "./wheel"
import { OptionsInput } from "./options-input"
import { PresetSelector } from "./preset-selector"
import { CustomizationPanel } from "./customization-panel"
import { ResultDisplay } from "./result-display"
import { SpinButton } from "./spin-button"
import { useAudio } from "@/hooks/use-audio"
import { useMobile } from "@/hooks/use-mobile"
import { presets } from "@/lib/presets"
import { generateColors } from "@/lib/colors"
import confetti from "canvas-confetti"
import { useSearchParams } from "next/navigation"
import { Volume2, VolumeX } from "lucide-react"

export function WheelContainer() {
  const searchParams = useSearchParams()

  const [options, setOptions] = useState<string[]>([])
  const [colors, setColors] = useState<string[]>([])
  const [isSpinning, setIsSpinning] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [colorTheme, setColorTheme] = useState<string>("brand") // Set default to brand
  const [removeAfterSpin, setRemoveAfterSpin] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null)
  const isMobile = useMobile()
  const initializedRef = useRef(false)
  const [winningIndex, setWinningIndex] = useState<number>(-1)
  const spinTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const currentWinningIndexRef = useRef<number>(-1)


  const { playTickSound, updateTickRate, stopTickSound, playWinSound } = useAudio(soundEnabled)

  // Initialize options from URL params or default preset
  useEffect(() => {
    if (initializedRef.current) return

    const choicesParam = searchParams?.get("choices") || ""
    const presetParam = searchParams?.get("preset") || ""

    if (choicesParam) {
      const parsedOptions = choicesParam
        .split(",")
        .map((opt) => decodeURIComponent(opt.trim()))
        .filter(Boolean)
      if (parsedOptions.length > 0) {
        setOptions(parsedOptions)
        initializedRef.current = true
        return
      }
    }

    if (presetParam && presets[presetParam]) {
      setOptions(presets[presetParam])
      initializedRef.current = true
      return
    }

    // Default to decisions preset if no params
    setOptions(presets["decisions"])
    initializedRef.current = true
  }, [searchParams])

  // Generate colors when options or theme changes
  useEffect(() => {
    if (options && options.length > 0) {
      setColors(generateColors(options.length, colorTheme))
    } else {
      setColors([]) // Set empty array when no options
    }
  }, [options, colorTheme])

  // Clean up any timeouts on unmount
  useEffect(() => {
    return () => {
      if (spinTimeoutRef.current) {
        clearTimeout(spinTimeoutRef.current)
      }
    }
  }, [])

  const handleSpin = () => {
    if (isSpinning || options.length === 0) return

    // Pick a random winning index
    const randomIndex = Math.floor(Math.random() * options.length)
<<<<<<< HEAD

    // Store the winning index in both state and ref
    setWinningIndex(randomIndex)
    currentWinningIndexRef.current = randomIndex

=======
    setWinningIndex(randomIndex)

>>>>>>> f0356d9 (Updated code and configuration)
    // Start spinning
    setIsSpinning(true)
    setResult(null)

    // Play the initial tick sound with a fast rate
    if (soundEnabled) {
      playTickSound(80) // Start with a fast tick rate (80ms)
    }

    // Gradually slow down the tick rate to match the wheel deceleration
    const tickRateUpdates = [
      { time: 1000, rate: 100 }, // After 1 second, slow to 100ms
      { time: 2000, rate: 150 }, // After 2 seconds, slow to 150ms
      { time: 3000, rate: 200 }, // After 3 seconds, slow to 200ms
      { time: 3500, rate: 300 }, // After 3.5 seconds, slow to 300ms
    ]

    // Schedule the tick rate updates
    tickRateUpdates.forEach((update) => {
      setTimeout(() => {
        if (soundEnabled && isSpinning) {
          updateTickRate(update.rate)
        }
      }, update.time)
    })

    // Set the spin duration (4-5 seconds)
    const spinDuration = 4000 + Math.random() * 1000

    // Schedule the end of the spin
    spinTimeoutRef.current = setTimeout(() => {
      // Stop the ticking sound
      stopTickSound()

      // End the spinning state
      setIsSpinning(false)

      // Set the result based on the winning index
      setResult(options[randomIndex])

      // Play the winning sound
      if (soundEnabled) {
        playWinSound()
      }

      // Trigger confetti
      if (confettiCanvasRef.current) {
        confetti.create(confettiCanvasRef.current)({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#3B82F6", "#FACC15", "#60A5FA"], // Use brand colors for confetti
        })
      }

      // Remove the selected option if enabled
      if (removeAfterSpin && options.length > 1) {
<<<<<<< HEAD
        const winIndex = currentWinningIndexRef.current
        setOptions((prevOptions) => {
          const newOptions = prevOptions.filter((_, index) => index !== winIndex)
          // Reset winning index after removing the option
          setWinningIndex(-1)
          currentWinningIndexRef.current = -1
          return newOptions
        })
=======
        setOptions((prevOptions) => prevOptions.filter((_, index) => index !== randomIndex))
>>>>>>> f0356d9 (Updated code and configuration)
      }

      // Clear the timeout reference
      spinTimeoutRef.current = null
    }, spinDuration)
  }

  const handleOptionsChange = (newOptions: string[]) => {
    // Limit to 30 options as requested
    const limitedOptions = newOptions.slice(0, 30)
    setOptions(limitedOptions)
    setResult(null)
    setWinningIndex(-1)
<<<<<<< HEAD
    currentWinningIndexRef.current = -1
=======
>>>>>>> f0356d9 (Updated code and configuration)
  }

  const handlePresetChange = useCallback((presetKey: string) => {
    setOptions(presets[presetKey])
    setResult(null)
    setWinningIndex(-1)
<<<<<<< HEAD
    currentWinningIndexRef.current = -1
=======
>>>>>>> f0356d9 (Updated code and configuration)

    // Update URL with preset parameter
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href)
      url.searchParams.set("preset", presetKey)
      url.searchParams.delete("choices") // Remove choices param when using preset
      window.history.pushState({}, "", url)
    }
  }, [])

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled)

    // If turning off sound while spinning, stop any playing sounds
    if (soundEnabled && isSpinning) {
      stopTickSound()
    }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
      <canvas
        ref={confettiCanvasRef}
        className="fixed inset-0 pointer-events-none z-50"
        style={{ width: "100%", height: "100%" }}
        aria-hidden="true"
      />

      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <PresetSelector onSelect={handlePresetChange} />
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={toggleSound}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label={soundEnabled ? "Mute sound effects" : "Enable sound effects"}
            >
              {soundEnabled ? <Volume2 size={20} aria-hidden="true" /> : <VolumeX size={20} aria-hidden="true" />}
            </button>
          </div>
        </div>

        <OptionsInput options={options} onChange={handleOptionsChange} />

        <CustomizationPanel
          colorTheme={colorTheme}
          setColorTheme={setColorTheme}
          removeAfterSpin={removeAfterSpin}
          setRemoveAfterSpin={setRemoveAfterSpin}
        />

        {!isMobile && (
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-2">How to use:</h3>
            <ol className="list-decimal pl-5 space-y-1 text-gray-700">
              <li>Add options using the input field or select a preset</li>
              <li>Customize the wheel colors if you want</li>
              <li>Click the SPIN button and wait for the result</li>
              <li>Use the toggle to remove selected options after each spin</li>
              <li>Share your result with friends</li>
            </ol>
          </div>
        )}
      </div>

      <div className="w-full lg:w-1/2 flex flex-col items-center gap-6">
        <div className="relative">
          {/* Spinning indicator */}
          {isSpinning && (
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
              <div className="bg-blue-600/80 text-white px-4 py-2 rounded-full text-lg font-bold animate-pulse">
                Spinning...
              </div>
            </div>
          )}

          <Wheel options={options} colors={colors} isSpinning={isSpinning} winningIndex={winningIndex} />

          <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-2" aria-hidden="true">
            <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-t-[20px] border-l-transparent border-r-transparent border-t-yellow-500" />
          </div>
        </div>

        <SpinButton onClick={handleSpin} disabled={isSpinning || options.length === 0} isSpinning={isSpinning} />

        <ResultDisplay result={result} options={options} />
      </div>
    </div>
  )
}

