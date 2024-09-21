import express from "express";
import userRouter from "./routes/userRoute";
import courseRouter from "./routes/courseRoute";
import mongoose from "mongoose";
import adminRouter from "./routes/adminRoute";
import { configDotenv } from "dotenv";

configDotenv();

const app = express();

app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);

mongoose.connect(process.env.MONGO_URL!)
    .then(() => console.log('Database connected successfully'))
    .catch(err => {
        console.error('Database connection error:', err);
        process.exit(1);
    });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
