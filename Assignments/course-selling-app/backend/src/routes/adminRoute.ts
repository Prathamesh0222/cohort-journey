import express from "express";
import UserModel from "../model/User";
import CourseModel from "../model/Course";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  adminSignInSchema,
  adminSignUpSchema,
} from "../validations/user.schema";
import { authMiddleware, authorize } from "../middleware";
const adminRouter = express.Router();

adminRouter.post("/signup", async (req, res) => {
  const { email, password, username } = adminSignUpSchema.parse(req.body);

  const existingAdminUser = await UserModel.findOne({ email });

  if (existingAdminUser) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newAdmin = new UserModel({
    email,
    password: hashedPassword,
    username,
    role: "admin",
  });

  await newAdmin.save();

  const tokenPayload = {
    id: (newAdmin._id as string).toString(),
    role: "admin",
  };
  const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!);

  res.status(201).json({
    message: "Admin created",
    token,
  });
});

adminRouter.post("/signin", async (req, res) => {
  const { email, password } = adminSignInSchema.parse(req.body);

  const admin = await UserModel.findOne({
    email,
  });

  if (!admin) {
    return res.status(404).json({
      message: "Admin not found",
    });
  }

  const isValidPassword = await bcrypt.compare(password, admin.password);

  if (!isValidPassword) {
    return res.status(401).json({
      message: "Invalid password",
    });
  }

  const tokenPayload = { id: (admin._id as string).toString(), role: "admin" };
  const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!);

  res.status(200).json({
    message: "Admin signed in",
    token,
  });
});

adminRouter.post("/course", authMiddleware, authorize(["admin"]), (req, res) => {
  const { title, description, price, imageUrl } = req.body;


  const newCourse = new CourseModel({
    title,
    description,
    price,
    imageUrl,
  });

  newCourse.save();

  res.json({
    newCourse,
    message: "Course created",
  });
});

// adminRouter.put("/course/bulk", (req, res) => {
//     res.json({
//
//     })
// })

// adminRouter.post("/course/purchases", (req, res) => {
//     res.json({

//     })
// })

export default adminRouter;

