import express, { Request, Response } from "express";
import {UserModel, TodoModel} from "./db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { HASH_SALT, PORT } from "./constants";
import mongoose from "mongoose";
import dotenv from "dotenv";
const app = express();
app.use(express.json());

dotenv.config();

mongoose.connect(process.env.MONGODB_URL!);

app.post("/signup", async function (req: Request, res: Response) {
    try{
        const {email, name, password} = req.body;

    if (!email || !name || !password) {
        res.status(400).send("Invalid input");
        return;
    }

    const existingUser = await UserModel.findOne({
        email,
    })
    if(existingUser){
        res.status(400).send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password,HASH_SALT);
    
    const user = await UserModel.create({
        email,
        name,
        password: hashedPassword,
    })

    const token = jwt.sign({id:user._id, email:user.email},process.env.JWT_SECRET!, {
        expiresIn: "1h",
    })

    res.status(200).json({
        token,
    })

    } catch(error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
