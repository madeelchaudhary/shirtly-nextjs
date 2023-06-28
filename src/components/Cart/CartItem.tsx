import Image from "next/image";
import React from "react";
import UnaryOpts from "./UnaryOpts";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/store/hooks";
import {
  decrementQty,
  incrementQty,
  removeFromCart as removeFromCartAction,
} from "@/store/cartSlice";
import { getDiscountedPrice } from "@/lib/calcDiscount";
import Link from "next/link";

async function removeFromCart(prodId: number | string) {
  try {
    const res = await fetch("/api/cart?productId=" + prodId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 401 || res.status === 403) {
      throw new Error("You must be logged in to remove from cart");
    }

    if (res.status === 404) {
      throw new Error("Product not found");
    }

    if (res.status === 400) {
      throw new Error("Invalid Data Provided");
    }

    if (res.status === 422) {
      const data = await res.json();
      throw new Error(data.error || "Invalid Data Provided");
    }

    if (!res.ok) throw new Error("Something went wrong");
    return await res.json();
  } catch (err) {
    throw new Error((err as Error).message || "Something went wrong");
  }
}

async function addToCart(prodId: number | string, type: "inc" | "dec" = "inc") {
  try {
    const res = await fetch("/api/cart", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: prodId, type }),
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
      throw new Error(data.error || "Invalid Data Provided");
    }

    if (!res.ok) throw new Error("Something went wrong");
    return await res.json();
  } catch (err) {
    console.log(err);
    throw new Error((err as Error).message || "Something went wrong");
  }
}

type Props = {
  product: ProductType & { quantity: number };
  productId: string | number;
  loading: boolean;
  setIsLoading: (state: boolean) => void;
};

const CartItem = ({ product, productId, loading, setIsLoading }: Props) => {
  const dispatch = useAppDispatch();
  const discount = product.discountPercentage;
  const discountedPrice = discount
    ? getDiscountedPrice(product.price, discount)
    : 0;

  return (
    <li className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
      <div className="shrink-0">
        <Link href={`/shop/${product.slug}`}>
          <Image
            className="h-24 w-24 max-w-full rounded-lg object-cover"
            src={product.image.data.attributes.url}
            width={96}
            height={96}
            alt={product.title}
          />
        </Link>
      </div>

      <div className="relative flex flex-1 flex-col justify-between">
        <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
          <div className="pr-8 sm:pr-5">
            <p className="text-base font-semibold text-gray-900 max-w-[100px] whitespace-nowrap overflow-hidden text-ellipsis">
              {product.title}
            </p>
            <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">
              Quantity: {product.quantity}
            </p>
          </div>

          <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
            <p className="shrink-0 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
              {discount ? (
                <>
                  ${discountedPrice.toFixed(2)} -{" "}
                  <span className="text-sm text-gray-400 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                </>
              ) : (
                `$${product.price.toFixed(2)}`
              )}
            </p>

            <div className="sm:order-1">
              <UnaryOpts
                loading={loading}
                increment={async () => {
                  setIsLoading(true);
                  try {
                    await addToCart(productId, "inc");
                    setIsLoading(false);
                    dispatch(incrementQty({ id: productId.toString() }));
                    toast.success("Cart updated successfully");
                  } catch (error) {
                    toast.error(
                      (error as Error).message || "Something went wrong"
                    );
                    setIsLoading(false);
                  }
                }}
                decrement={async () => {
                  setIsLoading(true);
                  try {
                    await addToCart(productId, "dec");
                    setIsLoading(false);
                    dispatch(decrementQty({ id: productId.toString() }));
                    toast.success("Cart updated successfully");
                  } catch (error) {
                    toast.error(
                      (error as Error).message || "Something went wrong"
                    );
                    setIsLoading(false);
                  }
                }}
                qty={product.quantity}
              />
            </div>
          </div>
        </div>

        <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
          <button
            onClick={async () => {
              setIsLoading(true);
              try {
                await removeFromCart(productId);
                setIsLoading(false);
                dispatch(removeFromCartAction({ id: productId.toString() }));
                toast.success("Cart updated successfully");
              } catch (error) {
                toast.error((error as Error).message || "Something went wrong");
                setIsLoading(false);
              }
            }}
            disabled={loading}
            type="button"
            className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900 disabled:opacity-80"
          >
            <svg
              className="block h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
                className=""
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
