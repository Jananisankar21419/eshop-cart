import React from "react";
import Product from "./Product";
import ProductSkeleton from "./ProductSkeleton";

const ProductList = ({ products, onAddToCart }) => {
  return (
    <ul className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.length
        ? products.map((product) => (
            <Product
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))
        : new Array(12).fill(null).map((_, i) => <ProductSkeleton key={i} />)}
    </ul>
  );
};

export default ProductList;
