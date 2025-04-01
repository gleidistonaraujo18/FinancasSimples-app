import { validateRequiredFields } from "../utils/validators/Validators";
import HttpError from "../utils/errors/Erro";
import { Request, Response } from "express";
import FinanceRepository from "../repositories/FinanceRepository";



class FinanceController {

    /**
      * @param {Request} request - O objeto de requisição.
      * @param {Response} response - O objeto de resposta.
      */

    public static async create(request: Request, response: Response) {
        try {

            const { description, type, value, userId } = request.body;

            const validationError = validateRequiredFields({ description, type, value, userId });

            if (validationError) return response.status(400).json(validationError);

            const finance = await FinanceRepository.create({ description, type, value, userId });

            if (!finance) throw new HttpError(400, "Erro ao cadastrar operação financeira");

            return response.status(201).json({ status: 201, message: "Dados cadastrados com sucesso" });

        } catch (error) {
            if (error instanceof HttpError) {
                return response.status(error.statusCode).json({ status: error.statusCode, message: error.message });
            }

            console.error(error); // Logar erros inesperados
            return response.status(500).json({ status: 500, message: "Erro interno do servidor" });
        }
    }

    public static async getFinancialTransactions(request: Request, response: Response) {
        try {
            const { type, userId, startDate, endDate } = request.body;

            const validationError = validateRequiredFields({ userId, startDate, endDate });

            if (validationError) return response.status(400).json(validationError);

            const transactions = await FinanceRepository.getFinancialTransactions({ type, userId, startDate, endDate })

            if (!transactions) throw new HttpError(400, "Erro ao buscar os dados de transações");

            return response.status(200).json({ status: 200, transactions });

        } catch (error) {
            if (error instanceof HttpError) {
                return response.status(error.statusCode).json({ status: error.statusCode, message: error.message });
            }

            console.error(error); // Logar erros inesperados
            return response.status(500).json({ status: 500, message: "Erro interno do servidor" });
        }
    }

}

export default FinanceController;