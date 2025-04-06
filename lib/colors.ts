// Color palette definitions
const colorPalettes: Record<string, string[]> = {
  random: [
    "#FF6B6B",
    "#4ECDC4",
    "#FFD166",
    "#06D6A0",
    "#118AB2",
    "#EF476F",
    "#FFC43D",
    "#1B9AAA",
    "#6A0572",
    "#AB83A1",
    "#F15BB5",
    "#9B5DE5",
    "#00BBF9",
    "#00F5D4",
    "#FEE440",
  ],
  pastel: [
    "#FADDE1",
    "#FFC4D6",
    "#FFA6C1",
    "#FF87AB",
    "#FFC09F",
    "#FFEE93",
    "#FCF5C7",
    "#A0E7E5",
    "#B4F8C8",
    "#D0F4DE",
  ],
  bright: [
    "#FF595E",
    "#FFCA3A",
    "#8AC926",
    "#1982C4",
    "#6A4C93",
    "#FF70A6",
    "#FF9770",
    "#FFD670",
    "#E9FF70",
    "#70D6FF",
  ],
  dark: ["#1A535C", "#4ECDC4", "#F7FFF7", "#FF6B6B", "#FFE66D", "#2E294E", "#541388", "#F1E9DA", "#FFD400", "#D90368"],
  rainbow: ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF", "#4B0082", "#9400D3", "#FF1493", "#FF00FF"],
  // New brand colors palette
  brand: ["#3B82F6", "#60A5FA", "#93C5FD", "#FACC15", "#FDE68A", "#FEF3C7", "#3B82F6", "#FACC15"],
}

// Generate colors for wheel segments
export function generateColors(count: number, theme = "random"): string[] {
  if (count <= 0) return []

  // Get the color palette for the selected theme
  const palette = colorPalettes[theme] || colorPalettes.random

  // Ensure we have a valid palette
  if (!palette || !Array.isArray(palette) || palette.length === 0) {
    // Fallback to a simple array of colors if palette is invalid
    return Array(count).fill("#3B82F6") // Use brand blue as fallback
  }

  if ((theme === "rainbow" || theme === "brand") && count <= palette.length) {
    // For rainbow and brand themes with fewer segments than colors, use sequential colors
    return palette.slice(0, count)
  }

  const colors: string[] = []

  // Generate colors based on the palette
  for (let i = 0; i < count; i++) {
    if (theme === "rainbow" || theme === "brand") {
      // For rainbow and brand, cycle through the palette
      colors.push(palette[i % palette.length])
    } else {
      // For other themes, pick random colors from the palette
      const randomIndex = Math.floor(Math.random() * palette.length)
      colors.push(palette[randomIndex])
    }
  }

  return colors
}

