import { Router, Request, Response } from "express";
import AuthController from "../controllers/AuthController";

const authRouter = Router();

authRouter.post("/user/auth", AuthController.auth);

export default authRouter;