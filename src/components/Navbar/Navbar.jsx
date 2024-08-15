"use client";

import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useRouter } from "next/navigation";

const Navbar = ({ cartItemsCount, onCartIconClick }) => {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <nav className="bg-white shadow-sm mb-4 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-wide ">
            E-shop
          </h1>

          <div className="flex items-center space-x-8">
            <button
              className="relative"
              onClick={onCartIconClick}
              aria-label={`Cart (${cartItemsCount} items)`}
            >
              <FiShoppingCart size={24} className="text-gray-900" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-blue-500 rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </button>
            <button
              className="text-black hover:text-blue-500 transition-colors duration-150 font-semibold"
              onClick={handleLogout}
              aria-label="Logout"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
