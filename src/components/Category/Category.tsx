import Image from "next/image";
import React from "react";

export const Category = ({
  data: { name, image },
}: {
  data: Category["attributes"];
}) => {
  return (
    <div className="flex flex-col justify-center w-full">
      <div className="rounded-lg overflow-hidden  max-h-60 mb-6">
        <Image
          src={image.data.attributes.url}
          className="w-full shadow-sm"
          height={200}
          width={250}
          alt=""
        />
      </div>
      <div className="text-center">
        <h3 className="text-2xl text-gray-800 font-bold mb-1">{name}</h3>
        <p className="text-gray-600  font-semibold">12 Products Available</p>
      </div>
    </div>
  );
};
