import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export interface CustomRequest extends Request {
  userId?: string;
}

export const auth = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        message: "Authorization header missing",
      });
    }
    const tokenSplit = authHeader.split(" ");
    if (tokenSplit.length !== 2 || tokenSplit[0] != "Bearer") {
      return res.status(401).json({
        message: "Invalid token format",
      });
    }

    const token = tokenSplit[1];

    jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
      if (err || !decoded) {
        return res.status(403).json({
          message: "Invalid or expired token",
        });
      }
      req.userId = (decoded as JwtPayload).userId;
      next();
    });
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
