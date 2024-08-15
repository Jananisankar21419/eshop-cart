"use client";

import React, { useState, useMemo, Suspense, lazy } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Product from "../../components/Product/Product";
import ProductSkeleton from "../../components/Product/ProductSkeleton";
import dummyProducts from "../../components/Data";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartModal = lazy(() => import("../../components/Modal/CartModal"));

export default function EShop() {
  const [filter, setFilter] = useState({ sort: "none" });
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sortedProducts = useMemo(() => {
    return [...dummyProducts].sort((a, b) => {
      switch (filter.sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
  }, [filter.sort]);

  const handleAddToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    toast.success(`${product.name} has been added to the cart!`, {
      position: "top-right",
      autoClose: 1000, // Adjust the duration here if needed
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleCartIconClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleRemoveItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id, quantity) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Navbar
        cartItemsCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        onCartIconClick={handleCartIconClick}
      />

      <div className="flex items-center justify-between border-b border-gray-200 pb-4 pt-2 mb-4">
        <h1 className="text-xl font-bold tracking-tight text-gray-900">
          High Quality Collections
        </h1>
        <div className="flex items-center space-x-4">
          <select
            value={filter.sort}
            onChange={(e) => setFilter({ sort: e.target.value })}
            className="border border-gray-300 rounded-md p-2 text-gray-700"
            aria-label="Sort Products"
          >
            <option value="none">Sort By</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>
        </div>
      </div>

      <section className="pb-24 pt-6">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          <div className="hidden lg:block">
            <ul className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
              <li>
                <button className="text-gray-900 hover:text-gray-300">
                  T-shirts
                </button>
              </li>
              <li>
                <button className="text-gray-500 hover:text-gray-800">
                  Hoodies
                </button>
              </li>
              <li>
                <button className="text-gray-500 hover:text-gray-800">
                  Sweatshirts
                </button>
              </li>
              <li>
                <button className="text-gray-500 hover:text-gray-800">
                  Accessories
                </button>
              </li>
            </ul>
          </div>

          <ul className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {sortedProducts.length
              ? sortedProducts.map((product) => (
                  <Product
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))
              : new Array(12)
                  .fill(null)
                  .map((_, i) => <ProductSkeleton key={i} />)}
          </ul>
        </div>
      </section>

      {isModalOpen && (
        <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
          <CartModal
            cartItems={cart}
            onClose={handleCloseModal}
            onRemoveItem={handleRemoveItem}
            onQuantityChange={handleQuantityChange}
          />
        </Suspense>
      )}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </main>
  );
}
