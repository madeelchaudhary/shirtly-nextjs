import prisma from "@/lib/db";
import { hash } from "bcrypt";
import { NextResponse, NextRequest } from "next/server";

export const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
export const passwordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

export const POST = async (req: NextRequest) => {
  const data = await req.json();
  const { email, password, name } = data;

  if (!email || !password || !name) {
    const res = new NextResponse(
      JSON.stringify({ message: "Please fill all fields" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res;
  }

  if (!emailRegex.test(email)) {
    const res = new NextResponse(
      JSON.stringify({ message: "Enter a valid email!" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res;
  }

  if (!passwordRegex.test(password)) {
    const res = new NextResponse(
      JSON.stringify({
        message:
          "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter and 1 number",
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res;
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (user) {
    const res = new NextResponse(
      JSON.stringify({ message: "User already exists!" }),
      {
        status: 409,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res;
  }

  const hashedPassword = await hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      cart: {
        create: {},
      },
      name,
    },
  });

  const res = new NextResponse(
    JSON.stringify({ message: "User created successfully!" }),
    {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res;
};
