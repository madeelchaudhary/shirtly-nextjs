import ProductList from "@/components/Products/ProductList";
import { fetchProducts } from "@/lib/data";
import React from "react";

export const revalidate = 600;

const ShopPage = async () => {
  const prods = await fetchProducts();

  return (
    <>
      <section>
        <div className="bg-gray-50 py-24 mb-16">
          <h2 className="text-center text-4xl xl:text-5xl text-gray-800">
            Our Shop
          </h2>
        </div>
        <div className="mb-20 max-w-screen-xl mx-auto">
          <ProductList items={prods} />
        </div>
      </section>
    </>
  );
};

export default ShopPage;
