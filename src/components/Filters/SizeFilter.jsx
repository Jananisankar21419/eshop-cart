import React from "react";

const SizeFilter = ({ selectedSizes, onSizeChange }) => {
  const sizes = ["S", "M", "L", "XL"];

  const handleSizeChange = (size) => {
    if (selectedSizes.includes(size)) {
      onSizeChange(selectedSizes.filter((s) => s !== size));
    } else {
      onSizeChange([...selectedSizes, size]);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-900" id="size-filter-label">
        Filter by Size
      </h3>
      <ul className="space-y-2" aria-labelledby="size-filter-label">
        {sizes.map((size) => (
          <li key={size}>
            <label className="flex items-center" htmlFor={`size-${size}`}>
              <input
                id={`size-${size}`}
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                checked={selectedSizes.includes(size)}
                onChange={() => handleSizeChange(size)}
                aria-label={`Filter by size ${size}`}
              />
              <span className="ml-2 text-gray-700 text-sm font-medium">
                {size}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SizeFilter;
