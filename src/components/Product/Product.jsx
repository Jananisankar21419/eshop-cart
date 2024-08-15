import React from "react";
import Image from "next/image";

const Product = ({ product, onAddToCart }) => {
  const size =
    typeof product.size === "string" ? product.size.toUpperCase() : "Unknown";
  const color = product.color || "Unknown";

  return (
    <div className="group relative bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm transition-transform transform hover:scale-105">
      {/* Image Section */}
      <div className="relative w-full h-80 flex items-center justify-center overflow-hidden bg-gray-300">
        <Image
          src={product.image}
          alt={product.name}
          layout="fill"
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Content Section */}
      <div className="p-4">
        <div className="flex flex-col h-full justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Size: {size}, Color: {color}
            </p>
            <p className="text-sm text-gray-600 mt-2">{product.description}</p>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-lg font-semibold text-gray-900">
              ${product.price}
            </p>
            <button
              className="text-sm bg-black text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-300 transition-colors"
              onClick={() => onAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
