"use client"

import { useRef, useCallback, useEffect } from "react"

export function useAudio(enabled = true) {
  const tickSoundRef = useRef<HTMLAudioElement | null>(null)
  const winSoundRef = useRef<HTMLAudioElement | null>(null)
  const tickIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const tickRateRef = useRef<number>(100) // Initial tick rate in ms

  // Initialize audio elements
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Preload audio files
      tickSoundRef.current = new Audio("/sounds/tick.mp3")
      winSoundRef.current = new Audio("/sounds/win.mp3")

      // Configure audio
      if (tickSoundRef.current) {
        tickSoundRef.current.volume = 0.5
        tickSoundRef.current.preload = "auto"
      }

      if (winSoundRef.current) {
        winSoundRef.current.volume = 0.7
        winSoundRef.current.preload = "auto"
      }
    }

    return () => {
      stopTickSound()
    }
  }, [])

  const playTickSound = useCallback(
    (initialSpeed = 100) => {
      if (!enabled || !tickSoundRef.current) return

      // Clear any existing interval
      if (tickIntervalRef.current) {
        clearInterval(tickIntervalRef.current)
      }

      // Set initial tick rate
      tickRateRef.current = initialSpeed

      // Play tick sound repeatedly
      const playTick = () => {
        if (tickSoundRef.current) {
          tickSoundRef.current.currentTime = 0
          tickSoundRef.current.play().catch(() => {
            // Ignore autoplay errors
          })
        }
      }

      // Initial play
      playTick()

      // Set up interval for repeated playing
      tickIntervalRef.current = setInterval(playTick, tickRateRef.current)
    },
    [enabled],
  )

  const updateTickRate = useCallback(
    (newRate: number) => {
      if (!enabled || !tickIntervalRef.current) return

      // Update the tick rate
      tickRateRef.current = newRate

      // Clear existing interval and create a new one with the updated rate
      clearInterval(tickIntervalRef.current)

      const playTick = () => {
        if (tickSoundRef.current) {
          tickSoundRef.current.currentTime = 0
          tickSoundRef.current.play().catch(() => {
            // Ignore autoplay errors
          })
        }
      }

      tickIntervalRef.current = setInterval(playTick, tickRateRef.current)
    },
    [enabled],
  )

  const stopTickSound = useCallback(() => {
    if (tickIntervalRef.current) {
      clearInterval(tickIntervalRef.current)
      tickIntervalRef.current = null
    }

    if (tickSoundRef.current) {
      tickSoundRef.current.pause()
      tickSoundRef.current.currentTime = 0
    }
  }, [])

  const playWinSound = useCallback(() => {
    if (!enabled || !winSoundRef.current) return

    winSoundRef.current.currentTime = 0
    winSoundRef.current.play().catch(() => {
      // Ignore autoplay errors
    })
  }, [enabled])

  return {
    playTickSound,
    updateTickRate,
    stopTickSound,
    playWinSound,
  }
}

