import express, { Request, Response } from "express";
import { UserModel, TodoModel } from "./db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { HASH_SALT, PORT } from "./constants";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { auth, CustomRequest } from "./middleware";
const app = express();
app.use(express.json());

dotenv.config();

mongoose.connect(process.env.MONGODB_URL!);

app.post("/signup", async function (req: Request, res: Response) {
  try {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
      res.status(400).send("Invalid input");
      return;
    }

    const existingUser = await UserModel.findOne({
      email,
    });
    if (existingUser) {
      res.status(400).send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, HASH_SALT);

    const user = await UserModel.create({
      email,
      name,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET!,
      {
        expiresIn: "24h",
      }
    );

    res.status(200).json({
      token,
      userId: user._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(400).json({
        message: "Invalid Inputs",
      });
      return;
    }
    const user = await UserModel.findOne({
      email,
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        {
          id: user._id.toString(),
        },
        process.env.JWT_SECRET!,
        {
          expiresIn: "1h",
        }
      );
      res.json({
        token,
      });
    } else {
      res.status(403).json({
        message: "Incorrect credentials",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Interal server error",
    });
  }
});

app.post("/todo", auth, async (req, res) => {
  const { title, done, userId } = req.body;
  try {
    const todo = await TodoModel.create({
      title,
      done,
      userId,
    });

    res.status(201).json({
      message: "Todo created",
      todo,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
});

app.get("/todo", auth, async (req, res) => {
  try {
    const { userId } = req.body;
    const todos = await TodoModel.find({
      userId,
    });
    res.json({
      todos,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "Error fetching the todos",
    });
  }
});

app.put("/todo/:id", auth, async (req: CustomRequest, res) => {
  try {
    const { id } = req.params;
    const { done, title } = req.body;

    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    if (title === undefined || done === undefined) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }
    const update = await TodoModel.findOneAndUpdate(
      { _id: id, userId },
      { title, done },
      { new: true }
    );
    if (!update) {
      return res.status(404).json({
        message: "Todo not found or user not authorized",
      });
    }
    res.status(200).json(update);
  } catch (error) {
    console.error(error);
    res.status(401).json({
      message: "Error updating the todos",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
