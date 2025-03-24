import { Router, Request, Response } from "express";
import UserController from "../controllers/UserController";

const router = Router();

/**
 * Rota de teste
 */
router.get("/", (req: Request, res: Response) => {
    res.status(200).json({ message: "Api - Finanças Simples" });
});


/**
 * Rota para criar usuário
 */
router.post("/user", async (request: Request, response: Response) => { await UserController.create(request, response); });
router.post("/user/auth", async (request: Request, response: Response) => { await UserController.auth(request, response); });


export default router;
