import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/auth";

interface TokenPayload {
    id: number;
    role: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: TokenPayload;
        }
    }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Token não fornecido" });
    }

const [, token] = authHeader.split(" ");

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;

        req.user = decoded;

        next();
    } catch {
        return res.status(401).json({ message: "Token inválido" });
    }
}