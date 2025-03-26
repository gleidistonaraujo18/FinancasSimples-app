import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UserInterface from "../interfaces/UserInterface";
import 'dotenv/config';

//1- Criando uma interface para 
interface AuthRequest extends Request {
    user?: UserInterface;
}

export default function authMiddleware(request: AuthRequest, response: Response, next: NextFunction) {
    const { authorization } = request.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) return response.status(401).json({ error: "Unauthorized" });

    const token = authorization.split(" ")[1];

    if (!process.env.SECRET) {
        console.error("SECRET não está definido no ambiente.");
        return response.status(500).json({ error: "Erro interno do servidor" });
    }

    jwt.verify(token, process.env.SECRET, (error, decoded) => {
        if (error) return response.status(403).json({ error: "Forbidden" });

        request.user = decoded as UserInterface;
        next();
        
    });
}



