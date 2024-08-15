"use client";
import React, { useState } from "react";
import { FaTimes, FaTrashAlt, FaPlus, FaMinus } from "react-icons/fa";

const CartModal = ({ cartItems, onClose, onRemoveItem, onQuantityChange }) => {
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [error, setError] = useState("");
  const [checkoutMessage, setCheckoutMessage] = useState("");

  const calculateSubtotal = () =>
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    if (appliedDiscount) {
      if (appliedDiscount.type === "fixed") {
        return Math.max(subtotal - appliedDiscount.value, 0);
      } else if (appliedDiscount.type === "percentage") {
        return subtotal * (1 - appliedDiscount.value / 100);
      }
    }
    return subtotal;
  };

  const handleDiscount = (code) => {
    setError("");
    if (code === "FIXED10") {
      setAppliedDiscount({ type: "fixed", value: 10 });
    } else if (code === "PERCENT10") {
      setAppliedDiscount({ type: "percentage", value: 10 });
    } else {
      setError("Invalid discount code. Please enter 'FIXED10' or 'PERCENT10'.");
    }
  };

  const handleCheckout = () => {
    setCheckoutMessage("Successfully added to cart. Proceeding to checkout.");
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-900"
          onClick={onClose}
        >
          <FaTimes size={24} />
        </button>
        <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>

        <div className="overflow-y-auto max-h-[400px] mb-4">
          <ul className="space-y-4">
            {cartItems.length === 0 ? (
              <li className="text-gray-500">Your cart is empty.</li>
            ) : (
              cartItems.map((item) => (
                <li key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex flex-col">
                      <h3 className="text-sm font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        ${item.price.toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500">Size: {item.size}</p>
                      <p className="text-xs text-gray-500">
                        Color: {item.color}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.description}
                      </p>
                      <div className="flex items-center mt-2 space-x-2">
                        <button
                          className="p-1 border border-gray-300 rounded"
                          onClick={() =>
                            onQuantityChange(
                              item.id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                        >
                          <FaMinus size={16} />
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            onQuantityChange(
                              item.id,
                              Math.max(1, Number(e.target.value))
                            )
                          }
                          className="w-12 text-center border border-gray-300 rounded"
                        />
                        <button
                          className="p-1 border border-gray-300 rounded"
                          onClick={() =>
                            onQuantityChange(item.id, item.quantity + 1)
                          }
                        >
                          <FaPlus size={16} />
                        </button>
                        <button
                          className="ml-4 text-red-500 hover:underline"
                          onClick={() => onRemoveItem(item.id)}
                        >
                          <FaTrashAlt size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>

        <div className="mt-6">
          <input
            type="text"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
            placeholder="Discount code"
          />
          <button
            className="mt-4 bg-black text-white px-4 py-2 rounded"
            onClick={() => handleDiscount(discountCode)}
          >
            Apply Discount
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <p className="mt-4 text-gray-600">Valid codes: FIXED10, PERCENT10</p>
        </div>

        <div className="mt-4">
          <p className="text-lg font-semibold">
            Subtotal: ${calculateSubtotal().toFixed(2)}
          </p>
          <p className="text-lg font-semibold">
            Total: ${calculateTotal().toFixed(2)}
          </p>
        </div>

        <button
          className="mt-4 bg-black text-white px-4 py-2 rounded"
          onClick={handleCheckout}
        >
          Checkout
        </button>
        {checkoutMessage && (
          <p className="mt-4 text-black">{checkoutMessage}</p>
        )}
      </div>
    </div>
  );
};

export default CartModal;
