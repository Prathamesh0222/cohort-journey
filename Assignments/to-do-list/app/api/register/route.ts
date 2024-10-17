import { signUpSchema } from "@/lib/auth-validation";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { signIn } from "next-auth/react";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const prisma = new PrismaClient();
  try {
    const data = await req.json();
    const parsedData = signUpSchema.safeParse(data);
    if (!parsedData.success) {
      return new Response(
        JSON.stringify({
          message: "Invalid data",
          errors: parsedData.error.errors,
        }),
        {
          status: 400,
        }
      );
    }

    const { email, password, username } = parsedData.data;

    const userExists = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (userExists) {
      return Response.json(
        {
          message: "User already exists",
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        username: username,
      },
    });

    return Response.json(
      {
        message: "User created successfully",
        user: { id: user.id, email: user.email, username: user.username },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error while signing up", error);
    return Response.json(
      {
        message: "Error while signing up",
      },
      {
        status: 500,
      }
    );
  }
}
