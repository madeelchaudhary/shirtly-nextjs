import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import prisma from "@/lib/db";
import Stripe from "stripe";
import Image from "next/image";
import Link from "next/link";

const OrdersPage = async () => {
  const session = await getServerSession(authOptions);

  const orders = await prisma.order.findMany({
    where: {
      user: {
        email: session!.user!.email,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2022-11-15",
  });

  const getOrdersData = async () => {
    const details = orders.map(async (order) => {
      const data = await stripe.checkout.sessions.retrieve(order.session_id, {
        expand: ["line_items"],
      });

      const lineItems = await stripe.checkout.sessions.listLineItems(
        order.session_id,
        {
          expand: ["data.price.product"],
        }
      );

      const products = lineItems.data.map((item: any) => {
        return {
          id: item.id,
          name: item.description,
          quantity: item.quantity,
          price: item.amount_total! / 100,
          image:
            item.price.product?.metadata.image || item.price?.product.images[0],
          productId: item.price.product?.metadata.productId,
        };
      });

      return {
        id: order.id,
        total: data.amount_total! / 100,
        status: order.status,
        createdAt: order.createdAt,
        products,
      };
    });

    return Promise.all(details);
  };

  const ordersData = await getOrdersData();

  return (
    <>
      {ordersData.length === 0 && (
        <main className="py-24">
          <div className="max-w-7xl mx-auto sm:px-2 lg:px-8">
            <div className="max-w-2xl mx-auto px-4 lg:max-w-4xl lg:px-0">
              <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                No orders found
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                It looks like you haven&apos;t placed any orders yet
              </p>
            </div>
          </div>
        </main>
      )}

      {ordersData.length > 0 && (
        <main className="py-24">
          <div className="max-w-7xl mx-auto sm:px-2 lg:px-8">
            <div className="max-w-2xl mx-auto px-4 lg:max-w-4xl lg:px-0">
              <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                Order history
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                Check the status of recent orders, manage returns, and discover
                similar products.
              </p>
            </div>
          </div>

          <section aria-labelledby="recent-heading" className="mt-16">
            <h2 id="recent-heading" className="sr-only">
              Recent orders
            </h2>
            <div className="max-w-7xl mx-auto sm:px-2 lg:px-8">
              <div className="max-w-2xl mx-auto space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
                {ordersData.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white border-t border-b border-gray-200 shadow-sm sm:rounded-lg sm:border"
                  >
                    <h3 className="sr-only">
                      Order placed on{" "}
                      <time dateTime={order.createdAt.toDateString()}>
                        {order.createdAt.toLocaleDateString()}
                      </time>
                    </h3>

                    <div className="flex items-center p-4 border-b border-gray-200 sm:p-6 sm:grid sm:grid-cols-5 sm:gap-x-6">
                      <dl className="flex-1 flex justify-between w-full max-[320px]:flex-col sm:grid gap-6 text-sm sm:col-span-5 sm:grid-cols-4 lg:col-span-3">
                        <div className="sm:col-span-2">
                          <dt className="font-medium text-gray-900">
                            Order number
                          </dt>
                          <dd className="mt-1 text-gray-500 text-sm">
                            {order.id}
                          </dd>
                        </div>
                        <div className="hidden sm:block">
                          <dt className="font-medium text-gray-900">
                            Date placed
                          </dt>
                          <dd className="mt-1 text-gray-500">
                            <time dateTime={order.createdAt.toDateString()}>
                              {order.createdAt.toLocaleDateString()}
                            </time>
                          </dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-900">
                            Total amount
                          </dt>
                          <dd className="mt-1 font-medium text-gray-900">
                            {order.total}
                          </dd>
                        </div>
                      </dl>

                      <div className="hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4">
                        <a
                          href="#"
                          className="flex items-center justify-center bg-white py-2 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          <span>View Order</span>
                        </a>
                        <a
                          href="#"
                          className="flex items-center justify-center bg-white py-2 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          <span>View Invoice</span>
                        </a>
                      </div>
                    </div>
                    {/* Order Status */}
                    <div className="flex items-center p-4 border-b border-gray-200 sm:p-6">
                      <p className="text-sm font-medium">
                        <span className="text-gray-900">Order Status: </span>
                        <span className="capitalize">
                          {order.status === "open" ? "Pending" : order.status}
                        </span>
                      </p>
                    </div>
                    {/* Products */}
                    <h4 className="sr-only">Items</h4>
                    <ul role="list" className="divide-y divide-gray-200">
                      {order.products.map((product) => (
                        <li key={product.id} className="p-4 sm:p-6">
                          <div className="flex items-center sm:items-start">
                            <div className="flex-shrink-0 w-28 h-28 bg-gray-200 rounded-lg overflow-hidden sm:w-36 sm:h-36">
                              <Image
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-center object-cover"
                                width={150}
                                height={150}
                              />
                            </div>
                            <div className="flex-1 ml-6 text-sm">
                              <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                                <div>
                                  <h5>{product.name}</h5>
                                  <p className="mt-2">
                                    Quantity: {product.quantity}
                                  </p>
                                </div>
                                <p className="mt-2 sm:mt-0 text-2xl text-gray-700">
                                  ${product.price}
                                </p>
                              </div>
                              <div className="mt-6 border-t border-gray-200 pt-4 flex items-center justify-between sm:justify-normal sm:gap-x-3 space-x-4 divide-x divide-gray-200 text-sm font-medium  sm:border-none sm:pt-0 sm:w-52">
                                <div className="flex-1 flex">
                                  <Link
                                    href={`/shop/${(product.name as string)
                                      .toLowerCase()
                                      .replace(/ /g, "-")}`}
                                    className="text-indigo-600 whitespace-nowrap hover:text-indigo-500"
                                  >
                                    View product
                                  </Link>
                                </div>
                                <div className="flex-1 flex justify-end sm:pl-6">
                                  <a
                                    href="#"
                                    className="text-indigo-600 whitespace-nowrap hover:text-indigo-500"
                                  >
                                    Buy again
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* <div className="flex items-center">
                              <CheckCircleIcon
                                className="w-5 h-5 text-green-500"
                                aria-hidden="true"
                              />
                              <p className="ml-2 text-sm font-medium text-gray-500">
                                Delivered on{" "}
                                <time dateTime={order.deliveredDatetime}>
                                  {order.deliveredDate}
                                </time>
                              </p>
                            </div> */}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      )}
    </>
  );
};

export default OrdersPage;
