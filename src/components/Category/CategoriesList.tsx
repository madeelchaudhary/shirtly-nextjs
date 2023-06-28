import React from "react";
import { Category } from "./Category";

const CategoriesList = ({ items }: { items: Category[] }) => {
  return (
    <div className="grid fluid justify-items-center gap-4 sm:gap-6 lg:gap-8 ">
      {items.map((item) => (
        <Category data={item.attributes} key={item.id} />
      ))}
    </div>
  );
};

export default CategoriesList;
