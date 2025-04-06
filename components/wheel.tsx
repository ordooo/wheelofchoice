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
  const maxLength = Math.min(Math.floor(radius / 7), Math.max(10, 35 - totalOptions))
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength - 1) + "…"
}

function calculateFontSize(text: string, totalOptions: number, radius: number): number {
  const baseSize = Math.min(24, Math.max(14, radius / 10))
  const optionsFactor = Math.max(0.65, 1 - totalOptions / 60)
  const lengthFactor = Math.max(0.8, 1 - text.length / 40)
  return Math.floor(baseSize * optionsFactor * lengthFactor)
}

export function Wheel({ options, colors, isSpinning, winningIndex }: WheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rotationRef = useRef(0)
  const animationRef = useRef<number | null>(null)
  const winnerGlowRef = useRef(0)
  const winnerGlowIncreasing = useRef(true)
  const spinningRef = useRef(false)
  const targetRotationRef = useRef(0)
  const finalRotationRef = useRef(0)

  // Handle the wheel spinning animation
  useEffect(() => {
    // Start spinning when isSpinning becomes true
    if (isSpinning && !spinningRef.current && winningIndex >= 0) {
      spinningRef.current = true

      // Calculate the final rotation to align the winning slice with the pointer
      const sliceAngle = (2 * Math.PI) / options.length

      // The pointer is at the top (270 degrees or 3π/2)
      const pointerAngle = (3 * Math.PI) / 2

      // Calculate the center of the winning slice
      const winningSliceCenter = winningIndex * sliceAngle + sliceAngle / 2

      // Calculate the rotation needed to align the winning slice with the pointer
      // We need to rotate so that winningSliceCenter + rotation = pointerAngle
      let targetRotation = pointerAngle - winningSliceCenter

      // Normalize to positive angle
      while (targetRotation < 0) targetRotation += 2 * Math.PI

      // Add extra rotations (5-7 full rotations)
      targetRotation += 2 * Math.PI * (5 + Math.random() * 2)

      // Starting rotation and duration
      const startRotation = rotationRef.current
      finalRotationRef.current = startRotation + targetRotation
      targetRotationRef.current = targetRotation
      const duration = 4000 + Math.random() * 1000
      const startTime = performance.now()

      // Animation function
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)

        // Easing function for realistic deceleration
        const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

        // Calculate current rotation
        rotationRef.current = startRotation + targetRotation * easeOut(progress)

        // Continue animation if not complete
        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate)
        } else {
          // Ensure we end at exactly the target rotation
          rotationRef.current = finalRotationRef.current

          // Force a final redraw to ensure perfect alignment
          drawWheel()

          animationRef.current = null
        }

        // Redraw the wheel
        drawWheel()
      }

      // Start the animation
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      animationRef.current = requestAnimationFrame(animate)
    }
    // Reset when spinning stops
    else if (!isSpinning && spinningRef.current) {
      spinningRef.current = false

      // When spinning stops, ensure the wheel is at the correct final position
      if (winningIndex >= 0) {
        // Calculate the exact position for perfect alignment
        const sliceAngle = (2 * Math.PI) / options.length
        const pointerAngle = (3 * Math.PI) / 2
        const winningSliceCenter = winningIndex * sliceAngle + sliceAngle / 2

        // Calculate the exact rotation needed
        let exactRotation = pointerAngle - winningSliceCenter

        // Normalize to positive angle
        while (exactRotation < 0) exactRotation += 2 * Math.PI

        // Adjust the rotation to ensure perfect alignment
        rotationRef.current = exactRotation

        // Force a redraw with the exact alignment
        drawWheel()
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
    }
  }, [isSpinning, winningIndex, options.length])

  // Function to draw the wheel
  const drawWheel = () => {
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

    // Draw a line from center to top to visualize the pointer position (for debugging)
    if (!isSpinning && winningIndex >= 0) {
      ctx.save()
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(centerX, centerY - radius - 10)
      ctx.strokeStyle = "rgba(255, 0, 0, 0.5)"
      ctx.lineWidth = 1
      ctx.stroke()
      ctx.restore()
    }
  }

  // Draw the wheel initially and when props change
  useEffect(() => {
    drawWheel()

    // Animate the winner glow when not spinning
    if (winningIndex !== -1 && !isSpinning) {
      const animateGlow = () => {
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

        drawWheel()
        return requestAnimationFrame(animateGlow)
      }

      const glowAnimation = animateGlow()

      return () => {
        cancelAnimationFrame(glowAnimation)
      }
    }
  }, [options, colors, isSpinning, winningIndex])

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

