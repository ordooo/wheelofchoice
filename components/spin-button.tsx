"use client"

interface SpinButtonProps {
  onClick: () => void
  disabled: boolean
  isSpinning: boolean
}

export function SpinButton({ onClick, disabled, isSpinning }: SpinButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative overflow-hidden
        px-8 py-4 rounded-full text-xl font-bold uppercase
        transition-all duration-300
        ${
          isSpinning
            ? "bg-yellow-500 text-white cursor-not-allowed animate-pulse" // Spinning state
            : disabled
              ? "bg-gray-300 text-gray-500 cursor-not-allowed" // Regular disabled state
              : "bg-gradient-to-r from-blue-600 to-yellow-500 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
        }
      `}
    >
      {!disabled && !isSpinning && (
        <span className="absolute inset-0 bg-white/20 animate-pulse-slow rounded-full"></span>
      )}
      {isSpinning ? "SPINNING..." : "SPIN"}
    </button>
  )
}

