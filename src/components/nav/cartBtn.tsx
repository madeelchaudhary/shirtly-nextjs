import Link from "next/link";
import React, { useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  CartState,
  getMemoizedCartItemsQty,
  receiveCart,
} from "@/store/cartSlice";
import { useSession } from "next-auth/react";
import { Cart, CartItem } from "@prisma/client";

function fetchCart() {
  return fetch("/api/cart", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// navbar cart button component styled with tailwind
const CartBtn = ({ onClick }: { onClick?: () => void }) => {
  const totalQuantity = useAppSelector(getMemoizedCartItemsQty);
  const { status } = useSession();
  const dispatch = useAppDispatch();

  const cartBtnRef = useRef(null as null | HTMLAnchorElement);

  // a bupm in the cart button when a product is added to the cart
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cartBtnRef.current) {
      cartBtnRef.current.dataset.animate = "animate-bounce";
      timer = setTimeout(() => {
        cartBtnRef.current!.dataset.animate = "";
      }, 1000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [totalQuantity]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchCart()
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((data: Cart & { items: CartItem[] }) => {
          const cartItems: CartState = { items: {} };
          for (const item of data.items) {
            cartItems.items[item.productId] = {
              quantity: item.quantity,
            };
          }
          dispatch(receiveCart(cartItems));
        });
    }
  }, [status, dispatch]);

  return (
    <Link
      onClick={onClick}
      ref={cartBtnRef}
      href={"/cart"}
      className="flex items-center justify-center data-[animate='animate-bounce']:animate-bounce"
    >
      <p className="flex items-center justify-center bg-gray-800 text-white rounded-full p-2 px-4 hover:bg-gray-900 focus:outline-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>{" "}
        {totalQuantity && totalQuantity}
      </p>
    </Link>
  );
};

export default CartBtn;
