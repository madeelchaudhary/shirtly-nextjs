import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/lib/db";
import { getCartItemsDetails } from "@/lib/data";
import { getDiscountedPrice } from "@/lib/calcDiscount";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

export const POST = async (req: NextRequest) => {
  const userSession = await getServerSession(authOptions);

  if (!userSession) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const { user } = userSession;

  if (!user || !user.email) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 403,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const cart = await prisma.cart
      .findFirst({ where: { user: { email: user.email } } })
      .items();

    if (!cart) {
      return new NextResponse(JSON.stringify({ error: "Cart not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    if (cart.length === 0) {
      return new NextResponse(JSON.stringify({ error: "Cart is empty" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    const cartItemsIds = cart.map((item) => item.productId);
    const cartItemsDetails = await getCartItemsDetails(cartItemsIds);

    const lineItems = cart.map((item) => {
      const product = cartItemsDetails.find(
        (prod) => prod.id.toString() === item.productId
      );
      if (product) {
        const discount = product.attributes.discountPercentage;
        const discountedPrice = discount
          ? getDiscountedPrice(product.attributes.price, discount)
          : 0;

        const productPrice =
          discountedPrice > 0 ? discountedPrice : product.attributes.price;
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.attributes.title,
              images: [product.attributes.image.data.attributes.url],
              metadata: {
                productId: product.id,
                image: product.attributes.image.data.attributes.url,
              },
            },
            unit_amount: (productPrice * 100).toFixed(0),
          },
          quantity: item.quantity,
        };
      }
      return null;
    });

    const filteredLineItems: any = lineItems.filter((item) => item != null);

    const session = await stripe.checkout.sessions.create({
      customer_email: user.email,
      client_reference_id: cart[0].cartId,
      currency: "usd",
      mode: "payment",
      expand: ["line_items"],
      line_items: filteredLineItems,
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB"],
      },
      shipping_options: [{ shipping_rate: "shr_1NAAV3CxOnBDKKh9QaEd3JNp" }],
      success_url:
        process.env.NEXT_PUBLIC_URL +
        "/results?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: process.env.NEXT_PUBLIC_URL + "/cart",
    });

    const newOrder = await prisma.order.create({
      data: {
        status: session.status || "pending",
        user: { connect: { email: user.email } },
        session_id: session.id,
        items: {
          createMany: {
            data: cart.map((item) => ({
              discount: cartItemsDetails.find(
                (prod) => prod.id.toString() === item.productId
              )?.attributes.discountPercentage,
              productId: item.productId,
              quantity: item.quantity,
            })),
          },
        },
      },
    });

    await prisma.cartItem.deleteMany({
      where: { cartId: cart[0].cartId },
    });

    return new NextResponse(
      JSON.stringify({ id: session.id, sessionUrl: session.url }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log(error, "error");
    return new NextResponse(
      JSON.stringify({
        error: (error as Error).message || "Something went wrong!",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};

export const GET = async (req: NextRequest) => {
  const userSession = await getServerSession(authOptions);

  if (!userSession) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const { user } = userSession;

  if (!user || !user.email) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 403,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const orders = await prisma.order.findMany({
      where: { user: { email: user.email } },
      include: { items: true },
    });

    return new NextResponse(JSON.stringify(orders), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error, "error");
    return new NextResponse(
      JSON.stringify({
        error: (error as Error).message || "Something went wrong!",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
