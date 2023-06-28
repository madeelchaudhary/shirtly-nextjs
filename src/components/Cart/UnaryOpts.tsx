import React from "react";

interface Props {
  increment: () => void;
  decrement: () => void;
  qty: number;
  loading: boolean;
}

const UnaryOpts = ({ increment, decrement, qty, loading }: Props) => {
  return (
    <div className="mx-auto flex h-8 items-stretch text-gray-600">
      <button
        onClick={() => decrement()}
        disabled={loading || qty === 1}
        className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white disabled:opacity-80"
      >
        -
      </button>
      <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
        {qty}
      </div>
      <button
        onClick={() => increment()}
        disabled={loading || qty === 5}
        className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white disabled:opacity-80"
      >
        +
      </button>
    </div>
  );
};

export default UnaryOpts;
