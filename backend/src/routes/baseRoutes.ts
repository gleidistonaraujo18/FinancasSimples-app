import { Router, Request, Response } from "express";
import AuthController from "../controllers/AuthController";

const baseRoutes = Router();

baseRoutes.get("/", (request: Request, response: Response) => {
    response.status(200).json({ message: "Api - Finanças Simples" });
});

// Rota para tratar de URLs não encontradas (404)
baseRoutes.all("*", (request: Request, response: Response) => {
    response.status(404).json({ message: "Rota não encontrada" });
});

export default baseRoutes;
