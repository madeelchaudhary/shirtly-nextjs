"use client";

import { getCartItemsDetails } from "@/lib/data";
import { getMemoizedCartItems } from "@/store/cartSlice";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Cart from "./Cart";
import { useAppSelector } from "@/store/hooks";

const CartRoot = () => {
  const cartItems = useAppSelector(getMemoizedCartItems);
  const [loading, setLoading] = useState(false);
  const [cartItemsDetails, setCartItemsDetails] = useState(null as any);

  useEffect(() => {
    const cartItemsIds = Object.keys(cartItems);
    if (cartItemsIds.length === 0) {
      setCartItemsDetails([]);
      return;
    }

    setLoading(true);
    getCartItemsDetails(cartItemsIds)
      .then((res) => {
        if (!res) throw new Error("Something went wrong");
        setCartItemsDetails(res);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Error fetching cart items");
        console.log(err);
      });
  }, [cartItems]);

  return (
    <>
      {loading && (
        <div className="spinner-wrapper">
          <div className="spinner"></div>;
        </div>
      )}
      {!loading && cartItemsDetails && cartItemsDetails.length > 0 && (
        <Cart cart={cartItems} items={cartItemsDetails || []} />
      )}

      {!loading && cartItemsDetails && cartItemsDetails.length === 0 && (
        <div className="flex justify-center items-center h-96">
          <h1 className="text-2xl">Cart is Empty</h1>
        </div>
      )}
    </>
  );
};

export default CartRoot;
