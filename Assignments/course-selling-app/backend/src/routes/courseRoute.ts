import express from "express";
const courseRouter = express.Router();

courseRouter.post("/purchase", (req, res) => {
    res.json({
        message: "Signup endpoint"
    })
})

courseRouter.get("/", (req, res) => {
    res.json({
        message: "signup endpoint"
    })
})

export default courseRouter;