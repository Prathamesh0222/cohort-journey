import mongoose, { Document, Schema } from "mongoose";

export interface User extends Document {
    email: string;
    password: string;
    username: string;
    role: string;
}

const userSchema: Schema<User> = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    role: { type: String, required: true, enum: ["admin", "user"], default: "user" }

})

const UserModel = mongoose.model<User>("User", userSchema);

export default UserModel;


