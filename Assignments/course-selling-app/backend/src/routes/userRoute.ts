import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import UserModel from "../model/User";

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  username: z.string()
})

const userRouter = express.Router();

userRouter.post("/signup", async (req: Request, res: Response) => {

  const { email, password, username } = signUpSchema.parse(req.body);
  const existingUser = await UserModel.findOne({
    email,
  });

  if (existingUser) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const newUser = new UserModel({
    email,
    password,
    username,
  });

  const token = jwt.sign(newUser, process.env.JWT_SECRET!);

  await newUser.save();

  res.status(201).json({
    message: "User created",
    token,
  });
})

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

userRouter.post("/signin", (req: Request, res: Response) => {
  res.json({
    message: "signin endpoint",
  });
});

export default userRouter;