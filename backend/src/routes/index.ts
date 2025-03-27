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
router.get("/users", authMiddleware, UserController.getAll);
router.post("/user", authMiddleware, UserController.create);
router.delete("/user/:id?", authMiddleware, UserController.deleteById);
router.patch("/user/:id?", authMiddleware, UserController.update);
router.post("/user/auth", UserController.auth);


export default router;
