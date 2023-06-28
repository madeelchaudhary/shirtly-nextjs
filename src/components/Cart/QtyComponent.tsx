"use client";

import React, { useState } from "react";

// quantity component for the cart page styled with tailwind
const QtyComponent = ({
  qty,
  increment,
  decrement,
}: {
  qty: number;
  increment: () => void;
  decrement: () => void;
}) => {
  return (
    <>
      <div className="flex h-12 w-20 px-2 items-center justify-between border-2 border-black rounded-md">
        <button
          onClick={decrement}
          className="flex w-3.5 h-3.5 px-px items-center justify-center bg-black hover:bg-indigo-500 rounded transition duration-100"
        >
          <div className="h-px mx-px w-full bg-white"></div>
        </button>
        <input
          className="w-8 text-center text-sm font-bold placeholder-black text-black outline-none"
          type="text"
          readOnly
          value={qty}
        />
        <button
          onClick={increment}
          className="relative flex w-3.5 h-3.5 px-px py-px items-center justify-center bg-black hover:bg-indigo-500 rounded transition duration-100"
        >
          <div className="relative h-full w-full py-px">
            <div className="absolute top-1/2 left-0 h-px w-full bg-white"></div>
            <div className="inline-block max-w-max mx-auto h-full bg-white">
              <div className="inline-block px-px"></div>
            </div>
          </div>
        </button>
      </div>
    </>
  );
};

export default QtyComponent;
