import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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
  const { id } = params;

  try {
    const todo = await prisma.todo.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(
      {
        message: "Deleted Todo Successfully",
        todo,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error while deleting the Todo", error);
    return NextResponse.json(
      {
        message: "Error while deleting the TODO",
      },
      {
        status: 404,
      }
    );
  }
}
