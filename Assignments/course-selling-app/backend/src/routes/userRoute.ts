import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../model/User";
import bcrypt from "bcryptjs";
import { signInSchema, signUpSchema } from "../validations/user.schema";



const userRouter = express.Router();

userRouter.post("/signup", async (req: Request, res: Response) => {

  const { email, password, username, role } = signUpSchema.parse(req.body);
  const existingUser = await UserModel.findOne({
    email,
  });

  if (existingUser) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new UserModel({
    email,
    password: hashedPassword,
    username,
    role: role || "user"
  });

  const tokenPayload = { id: (newUser._id as string).toString() };
  const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!);

  await newUser.save();

  res.status(201).json({
    message: "User created",
    token,
  });
})

userRouter.post("/signin", async (req: Request, res: Response) => {

  const { email, password } = signInSchema.parse(req.body);

  const user = await UserModel.findOne({
    email,
  });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return res.status(401).json({
      message: "Invalid password",
    });
  }

  const TokenPayload = { id: (user._id as string).toString() };
  const token = jwt.sign(TokenPayload, process.env.JWT_SECRET!);

  res.json({
    message: "User signed in",
    token,
  });

});

export default userRouter;