import React from "react";
import CartItem from "./CartItem";
import { useState } from "react";
import { toast } from "react-toastify";
import getStripe from "@/lib/get-stripe";
import { getDiscountedPrice } from "@/lib/calcDiscount";

const Cart = ({
  items,
  cart,
}: {
  items: Product[];
  cart: {
    [key: string]: {
      quantity: number;
    };
  };
}) => {
  const [loading, setLoading] = useState(false);

  const setIsLoading = (state: boolean) => setLoading(state);
  let realTotalPrice = 0;
  let totalPrice = 0;
  for (const item of items) {
    if (item.id in cart) {
      const discount = item.attributes.discountPercentage;
      const discountedPrice =
        discount > 0 ? getDiscountedPrice(item.attributes.price, discount) : 0;

      const itemPrice = discount ? discountedPrice : item.attributes.price;
      totalPrice += itemPrice * cart[item.id].quantity;
      realTotalPrice += item.attributes.price * cart[item.id].quantity;
    }
  }

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const stripe = await getStripe();
      const response = await fetch("/api/checkout", {
        method: "POST",
      });
      if (response.status === 401 || response.status === 403)
        throw new Error("You must be logged in to checkout");

      if (response.status === 404) throw new Error("No items in cart");

      if (response.status !== 200)
        throw new Error("Error creating checkout session");

      const session = await response.json();
      const result = await stripe?.redirectToCheckout({
        sessionId: session.id,
      });
      if (result?.error) {
        console.log(result.error.message);
      }
      setLoading(false);
    } catch (err) {
      if (toast.isActive("error")) {
        toast.update("error", {
          render: (err as Error).message || "Something went wrong",
        });
      } else {
        toast.error((err as Error).message || "Something went wrong", {
          toastId: "error",
        });
      }
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <h1 className="text-2xl font-semibold text-gray-900">Your Cart</h1>
        </div>

        <div className="mx-auto mt-8 max-w-2xl md:mt-12">
          <div className="bg-white shadow">
            <div className="px-4 py-6 sm:px-8 sm:py-10">
              <div className="flow-root max-h-[420px] overflow-y-auto py-5 pr-4">
                <ul className="-my-8">
                  {items.map((item) => {
                    if (!(item.id in cart)) return null;
                    const updatedProduct = {
                      ...item.attributes,
                      quantity: cart[item.id].quantity,
                    };

                    return (
                      <CartItem
                        setIsLoading={setIsLoading}
                        loading={loading}
                        productId={item.id}
                        key={item.id}
                        product={updatedProduct}
                      />
                    );
                  })}
                </ul>
              </div>

              <div className="mt-6 border-t border-b py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">Subtotal</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {realTotalPrice !== totalPrice && (
                      <span className="text-xs font-normal text-gray-400 line-through mr-2">
                        ${realTotalPrice.toFixed(2)}
                      </span>
                    )}
                    ${totalPrice.toFixed(2)}{" "}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">Shipping</p>
                  <p className="text-lg font-semibold text-gray-900">$2.00</p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Total</p>
                <p className="text-2xl font-semibold text-gray-900">
                  <span className="text-xs font-normal text-gray-400">USD</span>{" "}
                  {(totalPrice + 2).toFixed(2)}
                </p>
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  type="button"
                  className="group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  Checkout
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
