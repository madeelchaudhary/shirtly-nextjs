import React from "react";
import CategoriesList from "./CategoriesList";

const Categories = ({ items }: { items: Category[] }) => {
  return (
    <section className="bg-gray-50">
      <div className="max-w-screen-xl mx-auto py-28">
        <div className="mb-10 max-w-lg mx-auto text-center">
          <h2 className="text-3xl text-gray-900 font-bold md:text-4xl mb-4">
            Shop By Category
          </h2>
          <p className="text-gray-600 text-sm font-semibold">
            There are many variations of passages of Lorem Ipsum available but
            the majority have suffered alteration in some form.
          </p>
        </div>
        <CategoriesList items={items} />
      </div>
    </section>
  );
};

export default Categories;
