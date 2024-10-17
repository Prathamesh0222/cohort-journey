import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }
  const prisma = new PrismaClient();
  try {
    const data = await req.json();
    const todo = await prisma.todo.create({
      data: {
        title: data.title,
        completed: data.completed,
        user: {
          connect: {
            id: session.user.id || "",
          },
        },
      },
    });

    return NextResponse.json({
      message: "Todo created successfully",
      todo,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}
