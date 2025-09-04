"use client";
import React, { useState } from "react";
import ColorPicker from "./ColorPicker";

export default function Colors() {
  const [colorPickerOptions] = useState(["blue", "green", "orange", "red", "pink"]);
  const [initialSelectedColor] = useState(" "); //"blue"

  return (
    <div>
      <ColorPicker
        colorPickerOptions={colorPickerOptions}
        initialSelectedColor={initialSelectedColor}
      />
    </div>
  );
}
