// only works in production mode where the domain is verified

import Cors from "micro-cors";
import { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "micro";
import Stripe from "stripe";
import prisma from "@/lib/db";

export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors({
  allowMethods: ["POST", "HEAD", "OPTIONS"],
});

// stripe webhook handler function for successful payment
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("webhook called");
  console.log(req, "req in webhook");
  console.log(res, "res in webhook");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method not allowed" });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2022-11-15",
  });
  const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!;

  const sig = req.headers["stripe-signature"]!;
  const buf = await buffer(req);

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err) {
    return new Response("Webhook Error: " + (err as Error).message, {
      status: 400,
    });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const order = await prisma.order.findUnique({
      where: { session_id: session.id },
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    await prisma.order.update({
      where: { id: order.id },
      data: {
        status: session.status || "complete",
      },
    });
  }

  if (event.type === "checkout.session.expired") {
    const session = event.data.object as Stripe.Checkout.Session;

    const order = await prisma.order.findUnique({
      where: { session_id: session.id },
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    await prisma.order.update({
      where: { id: order.id },
      data: {
        status: session.status || "cancel",
      },
    });
  }

  return res.status(200).json({ received: true });
};

export default cors(handler as any);
