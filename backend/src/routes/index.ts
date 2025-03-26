import { Router, Request, Response } from "express";
import UserController from "../controllers/UserController";
import authMiddleware from "../middleware/authMiddleware";

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
router.post("/user", authMiddleware, UserController.create);

router.post("/user/auth", UserController.auth);


export default router;
