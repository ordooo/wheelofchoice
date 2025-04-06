"use client"

import { useRef, useEffect } from "react"

interface WheelProps {
  options: string[]
  colors: string[]
  isSpinning: boolean
  winningIndex: number
}

// Helper functions for text rendering
function prepareText(text: string, radius: number, totalOptions: number): string {
  // Calculate maximum characters based on radius and number of options
  const maxLength = Math.min(
    Math.floor(radius / 7), // Base on radius
    Math.max(10, 35 - totalOptions), // Reduce max length as options increase, but keep more characters
  )

  if (text.length <= maxLength) return text

  // Truncate and add ellipsis
  return text.substring(0, maxLength - 1) + "…"
}

function calculateFontSize(text: string, totalOptions: number, radius: number): number {
  // Significantly increased base size for better readability
  const baseSize = Math.min(24, Math.max(14, radius / 10))

  // Adjust based on number of options, but maintain larger minimum
  const optionsFactor = Math.max(0.65, 1 - totalOptions / 60)

  // Adjust based on text length, but maintain larger minimum
  const lengthFactor = Math.max(0.8, 1 - text.length / 40)

  return Math.floor(baseSize * optionsFactor * lengthFactor)
}

export function Wheel({ options, colors, isSpinning, winningIndex }: WheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rotationRef = useRef(0)
  const targetRotationRef = useRef(0)
  const animationFrameRef = useRef<number | null>(null)
  const winnerGlowRef = useRef(0) // For winner glow animation
  const winnerGlowIncreasing = useRef(true) // Direction of glow animation
  const spinStartedRef = useRef(false) // Track if spin has started

  // Draw the wheel on canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - 10

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (options.length === 0) {
      // Draw empty wheel with message
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
      ctx.fillStyle = "#f3f4f6"
      ctx.fill()
      ctx.strokeStyle = "#d1d5db"
      ctx.lineWidth = 2
      ctx.stroke()

      ctx.fillStyle = "#6b7280"
      ctx.font = "16px sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText("Add options to spin the wheel", centerX, centerY)
      return
    }

    // Draw wheel segments
    const sliceAngle = (2 * Math.PI) / options.length

    for (let i = 0; i < options.length; i++) {
      const startAngle = i * sliceAngle + rotationRef.current
      const endAngle = (i + 1) * sliceAngle + rotationRef.current

      // Draw segment
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, endAngle)
      ctx.closePath()

      // Fill with color
      ctx.fillStyle = colors[i % colors.length]
      ctx.fill()

      // Add stroke
      ctx.strokeStyle = "#ffffff"
      ctx.lineWidth = 2
      ctx.stroke()

      // Enhanced highlight for winning segment
      if (winningIndex === i && !isSpinning) {
        // Add a gold/yellow background to the winning segment
        ctx.save()
        ctx.globalAlpha = 0.3
        ctx.fillStyle = "#FACC15" // Gold/yellow color
        ctx.fill()
        ctx.restore()

        // Add pulsing glow effect
        ctx.save()
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.arc(centerX, centerY, radius, startAngle, endAngle)
        ctx.closePath()
        ctx.lineWidth = 4 + winnerGlowRef.current
        ctx.strokeStyle = "#FACC15" // Gold/yellow for highlight
        ctx.stroke()

        // Add a second inner glow
        ctx.lineWidth = 2
        ctx.strokeStyle = "#FEF08A" // Lighter yellow
        ctx.stroke()
        ctx.restore()

        // Slightly enlarge the winning segment (subtle effect)
        const midAngle = (startAngle + endAngle) / 2
        const enlargeAmount = 5

        ctx.save()
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.arc(centerX, centerY, radius + enlargeAmount, startAngle, endAngle)
        ctx.closePath()
        ctx.lineWidth = 2
        ctx.strokeStyle = "#FACC15"
        ctx.stroke()
        ctx.restore()
      }

      // Add text
      ctx.save()
      ctx.translate(centerX, centerY)

      // Calculate the middle angle of the slice for text positioning
      const textAngle = startAngle + sliceAngle / 2

      // Determine text properties based on segment size and text length
      const displayText = prepareText(options[i], radius, options.length)
      const fontSize = calculateFontSize(displayText, options.length, radius)

      // Make winning text larger and bolder
      const isWinner = winningIndex === i && !isSpinning
      const fontWeight = isWinner ? "bold" : "bold"
      const fontSizeAdjusted = isWinner ? fontSize * 1.2 : fontSize

      // Set font properties with bold for better readability
      ctx.font = `${fontWeight} ${fontSizeAdjusted}px sans-serif`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      // Determine text color based on background brightness
      const color = colors[i % colors.length]
      const isValidHex = color && typeof color === "string" && color.startsWith("#") && color.length >= 7
      let brightness = 200 // Default to a high brightness (dark text)

      if (isValidHex) {
        const r = Number.parseInt(color.slice(1, 3), 16)
        const g = Number.parseInt(color.slice(3, 5), 16)
        const b = Number.parseInt(color.slice(5, 7), 16)
        brightness = (r * 299 + g * 587 + b * 114) / 1000
      }

      // For winning segment, ensure text is black for better contrast with gold background
      ctx.fillStyle = isWinner ? "#000000" : brightness > 128 ? "#000000" : "#ffffff"

      // Calculate optimal distance from center based on text length and wheel size
      // Moved slightly closer to the edge for better visibility
      const textDistance = radius * 0.7

      // Position and rotate for text rendering
      ctx.rotate(textAngle)
      ctx.translate(textDistance, 0)
      ctx.rotate(Math.PI / 2) // Rotate text to be perpendicular to the radius

      // Draw the text
      ctx.fillText(displayText, 0, 0)

      // Add text shadow for winner
      if (isWinner) {
        ctx.shadowColor = "rgba(0, 0, 0, 0.3)"
        ctx.shadowBlur = 4
        ctx.fillText(displayText, 0, 0)
        ctx.shadowBlur = 0
      }

      ctx.restore()
    }

    // Draw center circle
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius * 0.1, 0, 2 * Math.PI)
    ctx.fillStyle = "#ffffff"
    ctx.fill()
    ctx.strokeStyle = "#3B82F6" // Use brand blue for center circle
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw outer ring for more visual appeal
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius + 5, 0, 2 * Math.PI)
    ctx.strokeStyle = "#3B82F6"
    ctx.lineWidth = 3
    ctx.stroke()

    // Add small markers around the wheel for visual spinning feedback
    if (options.length > 0) {
      const markerCount = Math.min(options.length * 2, 36)
      const markerAngle = (2 * Math.PI) / markerCount

      for (let i = 0; i < markerCount; i++) {
        const angle = i * markerAngle + rotationRef.current

        ctx.save()
        ctx.translate(centerX, centerY)
        ctx.rotate(angle)

        ctx.beginPath()
        ctx.moveTo(radius + 2, 0)
        ctx.lineTo(radius + 8, 0)
        ctx.strokeStyle = i % 2 === 0 ? "#3B82F6" : "#FACC15"
        ctx.lineWidth = 2
        ctx.stroke()

        ctx.restore()
      }
    }

    // Animate the winner glow when not spinning
    if (winningIndex !== -1 && !isSpinning) {
      if (winnerGlowIncreasing.current) {
        winnerGlowRef.current += 0.1
        if (winnerGlowRef.current > 3) {
          winnerGlowIncreasing.current = false
        }
      } else {
        winnerGlowRef.current -= 0.1
        if (winnerGlowRef.current < 0) {
          winnerGlowIncreasing.current = true
        }
      }

      // Request animation frame to continue the glow effect
      requestAnimationFrame(() => {
        // This will trigger a re-render with the updated glow value
        if (canvasRef.current) {
          const ctx = canvasRef.current.getContext("2d")
          if (ctx) {
            // Force a redraw
            ctx.clearRect(0, 0, 1, 1)
          }
        }
      })
    }
  }, [options, colors, rotationRef.current, isSpinning, winningIndex, winnerGlowRef.current])

  // Handle spinning animation with perfect alignment
  useEffect(() => {
    // Only start a new spin if isSpinning changes from false to true
    if (isSpinning && !spinStartedRef.current && winningIndex >= 0 && options.length > 0) {
      spinStartedRef.current = true

      // Reset winner glow animation
      winnerGlowRef.current = 0

      // Calculate the angle that centers the winning slice directly under the top triangle
      const sliceAngle = (2 * Math.PI) / options.length

      // In canvas coordinates, 0 is at 3 o'clock, and we want the top (12 o'clock) which is at -π/2 or 3π/2
      // This is the position of the triangle pointer
      const pointerPosition = (3 * Math.PI) / 2 // 270 degrees, which is the top position (12 o'clock)

      // Calculate the current position of the center of the winning slice
      const winningSliceCenter = winningIndex * sliceAngle + sliceAngle / 2

      // Calculate how much we need to rotate to align the winning slice with the pointer
      // We need to rotate so that winningSliceCenter + rotation = pointerPosition
      let requiredRotation = pointerPosition - winningSliceCenter

      // Normalize the rotation to be between 0 and 2π
      while (requiredRotation < 0) {
        requiredRotation += 2 * Math.PI
      }

      // Add extra full spins (e.g., 5 full spins = 10π radians) for animation
      const extraRotations = 5 + Math.random() * 2 // 5-7 full rotations
      requiredRotation += 2 * Math.PI * extraRotations

      // Set the target rotation
      const startRotation = rotationRef.current
      targetRotationRef.current = startRotation + requiredRotation

      // Spin the wheel to that precise angle using a smooth animation
      // Match the duration to the sound effect timing (4-5 seconds)
      const startTime = performance.now()
      const duration = 4000 + Math.random() * 1000 // 4-5 seconds

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)

        // Easing function for a more realistic spin (fast start, slow end)
        // This is a cubic ease-out function
        const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

        // Calculate current rotation based on progress
        rotationRef.current = startRotation + requiredRotation * easeOut(progress)

        if (progress < 1) {
          // Continue animation
          animationFrameRef.current = requestAnimationFrame(animate)
        } else {
          // Ensure we end at exactly the target rotation
          rotationRef.current = targetRotationRef.current
          animationFrameRef.current = null
        }
      }

      // Start the animation
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      animationFrameRef.current = requestAnimationFrame(animate)
    } else if (!isSpinning) {
      // Reset the spin started flag when spinning stops
      spinStartedRef.current = false
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
    }
  }, [isSpinning, winningIndex, options.length])

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        className={`w-[280px] h-[280px] md:w-[350px] md:h-[350px] rounded-full shadow-lg`}
      />
    </div>
  )
}

