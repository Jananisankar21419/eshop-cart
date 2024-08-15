import React from "react";

const ProductSkeleton = () => {
  return (
    <div
      className="relative animate-pulse bg-white border border-gray-200 rounded-lg shadow-sm"
      aria-hidden="true"
    >
      <div className="w-full h-48 bg-gray-200"></div>

      <div className="p-4 space-y-4">
        <div className="bg-gray-300 h-6 w-3/4 rounded"></div>
        <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
        <div className="bg-gray-300 h-4 w-2/3 rounded"></div>
        <div className="flex justify-between items-center mt-4">
          <div className="bg-gray-300 h-6 w-1/3 rounded"></div>
          <div className="bg-gray-300 h-8 w-1/3 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
