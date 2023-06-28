import React from "react";
import { notFound } from "next/navigation";
import Stripe from "stripe";
import prisma from "@/lib/db";
import Link from "next/link";

export const dynamic = "force-dynamic";

const SuccessPage = async ({ searchParams }: any) => {
  const sessionId = searchParams.session_id;

  if (!sessionId) return notFound();

  const order = await prisma.order.findUnique({
    where: {
      session_id: sessionId,
    },
  });

  if (!order) return notFound();

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2022-11-15",
  });

  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.status === "complete" && order.status !== "complete") {
    await prisma.order.update({
      where: {
        session_id: sessionId,
      },
      data: {
        status: "complete",
      },
    });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          {session.payment_status === "paid" && order.status === "complete"
            ? "Payment Successful!"
            : session.status?.toString() === "pending"
            ? "Payment Pending"
            : "Payment Failed"}
        </h1>
        <p className="mt-3 text-2xl">
          {session.payment_status === "paid"
            ? "Congratulations! Your order has been placed"
            : session.status?.toString() === "pending"
            ? "Your order is being processed"
            : "Sorry! Your order has not been placed"}
        </p>
        <p className="mt-3 text-xl">Order ID: {order.id}</p>
        <p className="mt-3 text-2xl">
          Order Total: ${session.amount_total! / 100}
        </p>
        <p className="mt-3 text-2xl">
          <Link
            href="/orders"
            className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-80"
          >
            View Orders
          </Link>
        </p>
      </main>
    </div>
  );
};

export default SuccessPage;
