import { fetchProductById } from "@/lib/data";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export const POST = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const { user } = session;

  if (!user || !user.email) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 403,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const { email } = user;

  // Add to cart logic here

  const data = await req.json();
  const { productId, quantity } = data;

  if (!productId) {
    return new NextResponse(
      JSON.stringify({ error: "Product ID is required" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const prod = await fetchProductById(productId);

  if (!prod) {
    return new NextResponse(JSON.stringify({ error: "Product not found" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const qty = quantity || 1;
  const prodId = productId.toString();

  if (qty > 5) {
    return new NextResponse(
      JSON.stringify({ error: "Max quantity can be 5" }),
      {
        status: 422,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  if (qty < 1) {
    return new NextResponse(
      JSON.stringify({ error: "Min quantity can be 1" }),
      {
        status: 422,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const cart = await prisma.cart.findFirst({
    where: {
      user: {
        email,
      },
    },
  });

  if (!cart) {
    await prisma.cart.create({
      data: {
        user: {
          connect: {
            email,
          },
        },
        items: {
          create: {
            productId: prodId,
            quantity: qty,
          },
        },
      },
    });
  } else {
    const cartProduct = await prisma.cart.findFirst({
      where: {
        user: {
          email,
        },
      },
      include: {
        items: {
          where: {
            productId: prodId,
          },
        },
      },
    });

    if (!cartProduct || cartProduct.items.length === 0) {
      await prisma.cartItem.create({
        data: {
          cart: {
            connect: {
              id: cart.id,
            },
          },
          productId: prodId,
          quantity: qty,
        },
      });
    } else {
      const cartProdId = cartProduct.items[0].id;
      const prevQty = cartProduct.items[0].quantity;

      if (prevQty + qty > 5) {
        return new NextResponse(
          JSON.stringify({ error: "Max quantity can be 5" }),
          {
            status: 422,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }

      if (prevQty + qty < 1) {
        return new NextResponse(
          JSON.stringify({ error: "Min quantity can be 1" }),
          {
            status: 422,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }

      await prisma.cartItem.update({
        where: {
          id: cartProdId,
        },
        data: {
          quantity: prevQty + qty,
        },
      });
    }
  }

  return new NextResponse(JSON.stringify({ success: true }), {
    status: 201,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// Getting Cart Items
export const GET = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const { user } = session;

  if (!user || !user.email) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 403,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const { email } = user;

  const cart = await prisma.cart.findFirst({
    where: {
      user: {
        email,
      },
    },
    include: {
      items: true,
    },
  });

  if (!cart) {
    await prisma.cart.create({
      data: {
        user: {
          connect: {
            email,
          },
        },
      },
    });
  }

  return new NextResponse(JSON.stringify({ items: cart ? cart.items : [] }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const DELETE = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const { user } = session;

  if (!user || !user.email) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 403,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const { email } = user;

  const url = new URL(req.nextUrl);
  const productId = url.searchParams.get("productId");

  if (!productId) {
    return new NextResponse(
      JSON.stringify({ error: "Product ID is required" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const cart = await prisma.cart.findFirst({
    where: {
      user: {
        email,
      },
    },
    include: {
      items: {
        where: {
          productId,
        },
      },
    },
  });

  if (!cart || cart.items.length === 0) {
    return new NextResponse(JSON.stringify({ error: "Cart not found" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const cartProdId = cart.items[0].id;

  await prisma.cartItem.delete({
    where: {
      id: cartProdId,
    },
  });

  return new NextResponse(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const PUT = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const { user } = session;

  if (!user || !user.email) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 403,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const { email } = user;

  const data = await req.json();
  const { productId, type } = data;

  if (!productId || !type) {
    return new NextResponse(JSON.stringify({ error: "Invalid Data" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const prodId = productId.toString();
  const cart = await prisma.cart.findFirst({
    where: {
      user: {
        email,
      },
    },
    include: {
      items: {
        where: {
          productId: prodId,
        },
      },
    },
  });

  if (!cart || cart.items.length === 0) {
    return new NextResponse(JSON.stringify({ error: "Cart not found" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const quantity = cart.items[0].quantity + (type === "inc" ? 1 : -1);

  if (quantity === 0) {
    const cartProdId = cart.items[0].id;

    await prisma.cartItem.delete({
      where: {
        id: cartProdId,
      },
    });

    return new NextResponse(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  if (quantity > 5) {
    return new NextResponse(
      JSON.stringify({ error: "Max quantity can be 5" }),
      {
        status: 422,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const cartProdId = cart.items[0].id;

  await prisma.cartItem.update({
    where: {
      id: cartProdId,
    },
    data: {
      quantity,
    },
  });

  return new NextResponse(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
