import React from "react";
import ProductElement from "./Product";

const ProductList = ({ items }: { items: Product[] }) => {
  return (
    <div className="grid fluid gap-4 gap-y-8 md:gap-6 lg:gap-8 justify-items-center">
      {items.map((item) => (
        <ProductElement key={item.id} prodId={item.id} prod={item.attributes} />
      ))}
    </div>
  );
};

export default ProductList;
