// ColorPicker.tsx
"use client";
import React, { useState } from "react";

interface ColorPickerProps {
  colorPickerOptions: string[];
  initialSelectedColor?: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  colorPickerOptions,
  initialSelectedColor = "",
}) => {
  const [selectedColor, setSelectedColor] = useState<string>(initialSelectedColor);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <div className="flex justify-center p-8">
      <div className="rounded-lg shadow-lg p-6 bg-white w-full max-w-md">
        {/* Preview Canvas */}
        <div
          className="h-24 flex items-center justify-center rounded-md mb-6 border"
          data-testid="selectedColor"
          style={{ backgroundColor: selectedColor || "transparent" }}
        >
          <p className="text-center font-medium">
            {selectedColor || "No color selected"}
          </p>
        </div>

        {/* Color Options */}
        <div
          className="flex justify-center flex-wrap gap-4"
          data-testid="colorPickerOptions"
        >
          {colorPickerOptions.map((color) => {
            const isSelected = selectedColor === color;
            return (
              <button
                key={color}
                type="button"
                aria-label={`Select ${color}`}
                aria-pressed={isSelected}
                className={`w-10 h-10 rounded-full border-2 focus:outline-none focus:ring-2 transition
                  ${isSelected ? "ring-4 ring-black" : "hover:opacity-80"}`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorSelect(color)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleColorSelect(color);
                  }
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
