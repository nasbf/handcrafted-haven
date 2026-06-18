"use client";

import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";

type Product = {
  id: number;
  name: string;
  description: string;
  image: string;
};

export default function ProductBrowser({
  products,
}: {
  products: Product[];
}) {
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return products;
    }

    return products.filter((product) =>
      `${product.name} ${product.description}`
        .toLowerCase()
        .includes(query)
    );
  }, [products, search]);

  return (
    <section className="max-w-6xl mx-auto px-6 pb-10">
      <div className="max-w-xl mx-auto mb-8">
        <label htmlFor="product-search" className="sr-only">
          Search products
        </label>
        <input
          id="product-search"
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search products"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base outline-none focus:border-[#53483c] focus:ring-2 focus:ring-[#d3c8bb]"
        />
      </div>

      {filteredProducts.length ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-600">
            No products found.
          </p>
        </div>
      )}
    </section>
  );
}
