"use client";
import React, { useState, useEffect } from "react";
import { FaTimes, FaTrashAlt, FaPlus, FaMinus } from "react-icons/fa";

const CartModal = ({ cartItems, onClose, onRemoveItem, onQuantityChange }) => {
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [error, setError] = useState("");
  const [quantityErrors, setQuantityErrors] = useState({});
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const [animateTotal, setAnimateTotal] = useState(false);

  const MAX_QUANTITY = 10;

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
      setAnimateTotal(true);
    } else if (code === "PERCENT10") {
      setAppliedDiscount({ type: "percentage", value: 10 });
      setAnimateTotal(true);
    } else {
      setError("Invalid discount code. Please enter 'FIXED10' or 'PERCENT10'.");
    }
  };

  const handleClearDiscount = () => {
    setAppliedDiscount(null);
    setDiscountCode("");
    setError("");
    setAnimateTotal(true);
  };

  const handleCheckout = () => {
    if (!discountCode) {
      setError("Please enter a discount code before proceeding to checkout.");
      return;
    }
    setCheckoutMessage("Successfully added to cart. ");
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity > MAX_QUANTITY) {
      setQuantityErrors((prevErrors) => ({
        ...prevErrors,
        [id]: `Maximum quantity for this item is ${MAX_QUANTITY}.`,
      }));
    } else {
      setQuantityErrors((prevErrors) => {
        const { [id]: removedError, ...restErrors } = prevErrors;
        return restErrors;
      });

      onQuantityChange(id, newQuantity);
    }
  };

  useEffect(() => {
    if (animateTotal) {
      const timer = setTimeout(() => setAnimateTotal(false), 500);
      return () => clearTimeout(timer);
    }
  }, [animateTotal]);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-4 sm:p-6">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg relative max-h-[90vh] overflow-y-auto shadow-lg">
        {/* Close Button */}
        <button
          aria-label="Close cart"
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-900 transition-colors duration-200"
          onClick={onClose}
        >
          <FaTimes size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">Shopping Cart</h2>

        <div className="overflow-y-auto max-h-[400px] mb-4">
          <ul className="space-y-4">
            {cartItems.length === 0 ? (
              <li className="text-gray-500 text-center">Your cart is empty.</li>
            ) : (
              cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between p-2 border-b border-gray-200"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg shadow-sm"
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
                      <div className="flex items-center mt-2 space-x-2">
                        <button
                          aria-label="Decrease quantity"
                          className="p-1 border border-gray-300 rounded-lg hover:bg-gray-200 transition duration-200"
                          onClick={() =>
                            handleQuantityChange(
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
                            handleQuantityChange(
                              item.id,
                              Math.max(1, Number(e.target.value))
                            )
                          }
                          className="w-12 text-center border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
                          aria-label={`Quantity for ${item.name}`}
                        />
                        <button
                          aria-label="Increase quantity"
                          className="p-1 border border-gray-300 rounded-lg hover:bg-gray-200 transition duration-200"
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                        >
                          <FaPlus size={16} />
                        </button>
                        <button
                          aria-label="Remove item"
                          className="ml-4 text-red-500 hover:underline"
                          onClick={() => onRemoveItem(item.id)}
                        >
                          <FaTrashAlt size={16} />
                        </button>
                      </div>
                      {quantityErrors[item.id] && (
                        <p className="text-red-500 text-sm mt-2">
                          {quantityErrors[item.id]}
                        </p>
                      )}
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
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-500"
            placeholder="Discount code"
            aria-label="Discount code input"
          />
          <button
            className="mt-4 w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-200"
            onClick={() => handleDiscount(discountCode)}
          >
            Apply Discount
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <p className="mt-4 text-gray-600">Valid codes: FIXED10, PERCENT10</p>
          {appliedDiscount && (
            <button
              className="mt-2 text-blue-500 hover:underline"
              onClick={handleClearDiscount}
              aria-label="Clear discount"
            >
              Clear Discount
            </button>
          )}
        </div>

        <div className="mt-4 border-t border-gray-200 pt-4">
          <div className="flex justify-between text-lg font-semibold">
            <span>Subtotal:</span>
            <span>${calculateSubtotal().toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-semibold mt-2">
            <span>Total:</span>
            <span
              className={`total-price ${
                animateTotal ? "price-change-animation" : ""
              }`}
            >
              ${calculateTotal().toFixed(2)}
            </span>
          </div>
        </div>

        <button
          className="mt-4 w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-200"
          onClick={handleCheckout}
        >
          Checkout
        </button>
        {checkoutMessage && (
          <p className="mt-4 text-green-600 text-center">{checkoutMessage}</p>
        )}
      </div>
    </div>
  );
};

export default CartModal;
