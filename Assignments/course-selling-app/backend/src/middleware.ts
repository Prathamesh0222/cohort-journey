import { NextFunction, Request, Response } from "express";

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}
import jwt from "jsonwebtoken";
import UserModel from "./model/User";

interface JwtPayload {
    id: string;
    role: string;
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({
            message: "Authorization header required",
        });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({
            message: "Token required",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        const user = await UserModel.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }
};

export const authorize = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Forbidden",
            });
        }
        next();
    };
};