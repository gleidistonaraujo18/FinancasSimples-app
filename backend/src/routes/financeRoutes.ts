import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import FinanceController from "../controllers/FinanceController";

const financeRoutes = Router();

financeRoutes.post("/", authMiddleware, FinanceController.create);
financeRoutes.post("/transactions", authMiddleware, FinanceController.getFinancialTransactions);

export default financeRoutes;