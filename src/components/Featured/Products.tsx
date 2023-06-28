import React from "react";
import ProductList from "../Products/ProductList";
import Brands from "./Brands";

const FeaturedProducts = ({ items }: { items: Product[] }) => {
  return (
    <>
      <section>
        <div className="max-w-screen-xl mx-auto px-4 py-24 lg:px-8 ">
          <div className="mx-auto max-w-lg text-center mb-10">
            <h2 className="text-3xl text-gray-800 font-bold sm:text-4xl lg:text-5xl mb-4">
              You may also like
            </h2>
            <hr className="block max-w-[100px] mx-auto border-indigo-500 border-2 mb-4" />
            <p>
              There are many variations of passages of Lorem Ipsum available but
              the majority have suffered alteration in some form.
            </p>
          </div>

          <div className="mb-24">
            <ProductList items={items} />
          </div>
          <Brands />
        </div>
      </section>
    </>
  );
};

export default FeaturedProducts;
