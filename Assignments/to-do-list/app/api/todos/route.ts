import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }
  try {
    const data = await req.json();
    const todo = await prisma.todo.create({
      data: {
        title: data.title,
        completed: data.completed,
        userId: session.user.id,
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

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }
  try {
    const todos = await prisma.todo.findMany({
      where: {
        userId: session.user.id,
      },
      select: {
        id: true,
        title: true,
        completed: true,
      },
    });

    return NextResponse.json({
      todos,
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

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }
  try {
    const data = await req.json();
    const todo = await prisma.todo.update({
      where: {
        id: data.id,
      },
      data: {
        completed: data.completed,
      },
    });

    return NextResponse.json({
      message: "Todo updated successfully",
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
