import express from "express";
import userRouter from "./routes/userRoute";
import courseRouter from "./routes/courseRoute";
import mongoose from "mongoose";
import adminRouter from "./routes/adminRoute";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect("");

const app = express();

app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);

app.listen(3000);
