"use client";
import React, { useState } from "react";
import Product from "./Product";
import CartModal from "./CartModal";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (product, quantity) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity }];
      }
    });
    setIsCartOpen(true);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  return (
    <div>
      {/* Example of a product listing */}
      <Product
        product={{ id: 1, name: "Product 1", price: 100, image: "/image1.png" }}
        onAddToCart={handleAddToCart}
      />
      {/* Add more products here */}

      {isCartOpen && (
        <CartModal
          cartItems={cartItems}
          onClose={() => setIsCartOpen(false)}
          onRemoveItem={handleRemoveItem}
          onQuantityChange={handleQuantityChange}
        />
      )}
    </div>
  );
};

export default ShoppingCart;
