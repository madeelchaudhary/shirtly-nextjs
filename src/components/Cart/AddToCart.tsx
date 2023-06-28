"use client";
import React, { useState } from "react";
import QtyComponent from "./QtyComponent";
import { AddBtn } from "./AddBtn";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCartByQty } from "@/store/cartSlice";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

export async function addToCart(prodId: number | string, qty: number) {
  try {
    const res = await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: prodId, quantity: qty }),
    });

    if (res.status === 401 || res.status === 403) {
      throw new Error("You must be logged in to add to cart");
    }

    if (res.status === 404) {
      throw new Error("Product not found");
    }

    if (res.status === 400) {
      throw new Error("Invalid Data Provided");
    }

    if (res.status === 422) {
      const data = await res.json();
      throw new Error(data.message || "Invalid Data Provided");
    }

    if (!res.ok) throw new Error("Something went wrong");
    return await res.json();
  } catch (err) {
    console.log(err);
    throw new Error((err as Error).message || "Something went wrong");
  }
}

const AddToCart = ({ prodId }: { prodId: number | string }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const prods = useAppSelector((state) => state.cart.items);
  const prod = prods[prodId];
  const { status } = useSession();

  const maxQty = prod ? 5 - prod.quantity : 5;

  const [qty, setQty] = useState(1);

  if (qty > maxQty) setQty(maxQty);

  const increment = () => {
    if (qty < maxQty) setQty(qty + 1);
  };

  const decrement = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      if (status === "unauthenticated")
        throw new Error("You must be logged in to add to cart");
      await addToCart(prodId, qty);
      dispatch(addToCartByQty({ id: prodId.toString(), qty }));
      toast.success("Added to cart");
    } catch (error) {
      if (toast.isActive("error"))
        toast.update("error", {
          render: (error as Error).message || "Something went wrong",
        });
      else {
        toast.error((error as Error).message || "Something went wrong", {
          toastId: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-wrap mb-4">
        <div className="w-full sm:w-auto mb-4 sm:mb-0 sm:mr-4">
          <span className="block text-sm font-black mb-2">Amount</span>
          <QtyComponent qty={qty} increment={increment} decrement={decrement} />
        </div>
      </div>
      <div className="flex flex-wrap sm:flex-nowrap items-center -mx-2 mb-6">
        <div className="flex-grow-1 w-full px-2 mb-4">
          <AddBtn
            loading={loading}
            disabled={maxQty === 0}
            onClick={handleAddToCart}
          />
        </div>
        <div className="w-auto px-2 mb-4">
          <a
            className="inline-flex items-center justify-center w-12 h-12 text-black hover:text-indigo-500 border-2 border-black hover:border-indigo-500 rounded-md transition duration-200"
            href="#"
          >
            <svg
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.44 0.0999756C12.63 0.0999756 11.01 0.979976 10 2.32998C8.99 0.979976 7.37 0.0999756 5.56 0.0999756C2.49 0.0999756 0 2.59998 0 5.68998C0 6.87998 0.19 7.97998 0.52 8.99998C2.1 14 6.97 16.99 9.38 17.81C9.72 17.93 10.28 17.93 10.62 17.81C13.03 16.99 17.9 14 19.48 8.99998C19.81 7.97998 20 6.87998 20 5.68998C20 2.59998 17.51 0.0999756 14.44 0.0999756Z"
                fill="currentColor"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </>
  );
};

export default AddToCart;
