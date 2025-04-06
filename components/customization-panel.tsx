"use client"

interface CustomizationPanelProps {
  colorTheme: string
  setColorTheme: (theme: string) => void
  removeAfterSpin: boolean
  setRemoveAfterSpin: (remove: boolean) => void
}

export function CustomizationPanel({
  colorTheme,
  setColorTheme,
  removeAfterSpin,
  setRemoveAfterSpin,
}: CustomizationPanelProps) {
  const colorThemes = [
    { id: "random", name: "Random Colors" },
    { id: "pastel", name: "Pastel Colors" },
    { id: "bright", name: "Bright Colors" },
    { id: "dark", name: "Dark Colors" },
    { id: "rainbow", name: "Rainbow" },
    { id: "brand", name: "Brand Colors" },
  ]

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="font-bold text-lg mb-3">Customize Wheel</h3>

      <div className="mb-4">
        <label className="block font-medium text-gray-700 mb-2">Color Theme:</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {colorThemes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setColorTheme(theme.id)}
              className={`px-3 py-2 rounded-md text-sm transition-colors ${
                colorTheme === theme.id
                  ? "bg-blue-100 border-2 border-blue-500"
                  : "bg-gray-100 hover:bg-gray-200 border-2 border-transparent"
              }`}
            >
              {theme.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center">
        <label htmlFor="remove-toggle" className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              id="remove-toggle"
              type="checkbox"
              className="sr-only"
              checked={removeAfterSpin}
              onChange={() => setRemoveAfterSpin(!removeAfterSpin)}
            />
            <div
              className={`block w-10 h-6 rounded-full transition-colors ${
                removeAfterSpin ? "bg-blue-500" : "bg-gray-300"
              }`}
            ></div>
            <div
              className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                removeAfterSpin ? "transform translate-x-4" : ""
              }`}
            ></div>
          </div>
          <div className="ml-3 text-gray-700">Remove selected option after spin</div>
        </label>
      </div>
    </div>
  )
}

