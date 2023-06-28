"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart as addToCartAction } from "@/store/cartSlice";
import { AddBtn } from "../Cart/AddBtn";
import { addToCart } from "../Cart/AddToCart";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { getDiscountedPrice } from "@/lib/calcDiscount";

const Product = ({
  prod: { title, price, slug, discountPercentage, image },
  prodId,
}: {
  prod: ProductType;
  prodId: number;
}) => {
  const [loading, setLoading] = useState(false);
  const discountedPrice = discountPercentage
    ? getDiscountedPrice(price, discountPercentage)
    : 0;
  const dispatch = useAppDispatch();
  const prods = useAppSelector((state) => state.cart.items);
  const prod = prods[prodId];
  const { status } = useSession();

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      if (status === "unauthenticated")
        throw new Error("You must be logged in to add to cart");
      await addToCart(prodId, 1);
      dispatch(addToCartAction({ id: prodId.toString() }));
      if (toast.isActive("error")) toast.dismiss("error");
      if (toast.isActive("success")) {
        toast.update("success", {
          render: "Added to cart",
        });
      } else {
        toast.success("Added to cart", {
          toastId: "success",
        });
      }
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
    <div className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      <Link
        className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
        href={"/shop/" + slug}
      >
        <Image
          className="object-cover"
          src={image.data.attributes.url}
          width={300}
          height={180}
          alt=""
        />
        {discountPercentage && (
          <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
            {discountPercentage}% OFF
          </span>
        )}
      </Link>
      <div className="mt-4 px-5 pb-5">
        <Link href={"/shop/" + slug}>
          <h3 className="text-xl tracking-tight text-slate-900">{title}</h3>
        </Link>
        <div className="mt-2 mb-5 flex justify-between items-center">
          <p>
            {discountPercentage ? (
              <>
                <span className="text-3xl font-bold text-slate-900 mr-2">
                  ${discountedPrice.toFixed(2)}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  ${price}
                </span>
              </>
            ) : (
              <>
                <span className="text-3xl font-bold text-slate-900">
                  ${price}
                </span>
              </>
            )}
          </p>
          <div className="flex items-center ">
            <svg
              aria-hidden="true"
              className="h-5 w-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
              5.0
            </span>
          </div>
        </div>
        <AddBtn
          text={prod ? prod.quantity + " in Cart" : "Add to Cart"}
          onClick={handleAddToCart}
          loading={loading}
          disabled={prod && prod.quantity === 5}
        />
      </div>
    </div>
  );
};

export default Product;
