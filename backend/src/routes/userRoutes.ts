import { Router, Request, Response } from "express";
import UserController from "../controllers/UserController";
import authMiddleware from "../middleware/authMiddleware";

const userRouter = Router();
/**
 * Rota para criar usuário
 */

userRouter.get("/", authMiddleware, UserController.getAll);
userRouter.post("/", authMiddleware, UserController.create);
userRouter.get("/:id", authMiddleware, UserController.getUserById);
userRouter.patch("/:id", authMiddleware, UserController.update);
userRouter.delete("/:id", authMiddleware, UserController.deleteById);



export default userRouter;
