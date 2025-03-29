import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import FinanceController from "../controllers/FinanceController";

const financeRoutes = Router();

financeRoutes.post("/", authMiddleware, FinanceController.create);

export default financeRoutes;