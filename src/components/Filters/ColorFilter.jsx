import React from "react";

export default function ColorFilter({ selectedColors, onColorChange }) {
  const colors = ["blue", "white", "green", "beige"];

  const handleColorChange = (color) => {
    if (selectedColors.includes(color)) {
      onColorChange(selectedColors.filter((c) => c !== color));
    } else {
      onColorChange([...selectedColors, color]);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-900" id="color-filter-label">
        Filter by Color
      </h3>
      <ul className="space-y-2" aria-labelledby="color-filter-label">
        {colors.map((color) => (
          <li key={color}>
            <label className="flex items-center" htmlFor={`color-${color}`}>
              <input
                id={`color-${color}`}
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                checked={selectedColors.includes(color)}
                onChange={() => handleColorChange(color)}
                aria-label={`Filter by color ${color}`}
              />
              <span className="ml-2 capitalize text-gray-700 text-sm font-medium">
                {color}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
