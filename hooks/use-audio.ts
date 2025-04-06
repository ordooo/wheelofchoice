"use client"

import { useRef, useCallback, useEffect } from "react"

export function useAudio(enabled = true) {
  const tickSoundRef = useRef<HTMLAudioElement | null>(null)
  const winSoundRef = useRef<HTMLAudioElement | null>(null)
  const tickIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize audio elements
  useEffect(() => {
    if (typeof window !== "undefined") {
      tickSoundRef.current = new Audio("/sounds/tick.mp3")
      winSoundRef.current = new Audio("/sounds/win.mp3")

      // Configure audio
      if (tickSoundRef.current) {
        tickSoundRef.current.volume = 0.5
      }

      if (winSoundRef.current) {
        winSoundRef.current.volume = 0.7
      }
    }

    return () => {
      stopTickSound()
    }
  }, [])

  const playTickSound = useCallback(
    (initialRate = 100) => {
      if (!enabled || !tickSoundRef.current) return

      // Clear any existing interval
      if (tickIntervalRef.current) {
        clearInterval(tickIntervalRef.current)
      }

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
      tickIntervalRef.current = setInterval(playTick, initialRate)
    },
    [enabled],
  )

  const updateTickRate = useCallback(
    (newRate: number) => {
      if (!enabled || !tickIntervalRef.current) return

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

      tickIntervalRef.current = setInterval(playTick, newRate)
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

