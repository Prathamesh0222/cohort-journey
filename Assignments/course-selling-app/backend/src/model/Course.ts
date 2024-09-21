import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: "User", required: true }
})

const CourseModel = mongoose.model("Course", courseSchema);

export default CourseModel;
