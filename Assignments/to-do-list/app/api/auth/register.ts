import { signUpSchema } from "@/lib/auth-validation";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

export default async function POST(req: Request) {
  const prisma = new PrismaClient();
  try {
    const { email, username, password } = await req.json();
    const parsedData = signUpSchema.parse({ email, username, password });

    const existingUser = await prisma.user.findUnique({
      where: {
        email: parsedData.email,
      },
    });
    if (existingUser) {
      return Response.json(
        {
          message: "Username doesn't exist",
        },
        {
          status: 400,
        },
      );
    }

    const hashedPassword = await bcrypt.hash(parsedData.password, 10);

    const user = await prisma.user.create({
      data: {
        email: parsedData.email,
        password: hashedPassword,
        username: parsedData.username,
      },
    });

    return Response.json(
      {
        message: "User created successfully",
        user: { id: user.id, email: user.email, username: user.username },
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Error while signing up", error);
    return Response.json(
      {
        message: "Error while signing up",
      },
      {
        status: 500,
      },
    );
  }
}
