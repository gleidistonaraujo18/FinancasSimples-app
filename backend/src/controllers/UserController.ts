import { isInvalidEmail, validateRequiredFields } from "../utils/validators/Validators";
import HttpError from "../utils/errors/Erro";
import { Request, Response } from "express";
import UserRepository from "../repositories/UserRepository";
import bcrypt from 'bcrypt'



class UserController {

    public static async create(request: Request, response: Response) {
        try {
            const { name, email, password, resetPass } = request.body;

            const validationError = validateRequiredFields({ name, email, password, resetPass });

            if (validationError) return response.status(400).json(validationError);

            if (isInvalidEmail(email)) throw new HttpError(400, "Formato de e-mail inválido.");

            if (await UserRepository.findByEmail(email)) throw new HttpError(400, "E-mail já cadastrado.");

            const hash = await bcrypt.hash(password, 10);

            await UserRepository.create({ name, email, password: hash, resetPass });

            return response.status(201).json({ status: 201, message: "Usuário criado com sucesso" });

        } catch (error) {
            if (error instanceof HttpError) {
                return response.status(error.statusCode).json({ status: error.statusCode, message: error.message });
            }

            console.error(error); // Logar erros inesperados
            return response.status(500).json({ status: 500, message: "Erro interno do servidor" });
        }
    }

    public static async deleteById(request: Request, response: Response) {
        try {

            const id = parseInt(request.params.id);

            if (isNaN(id) || id <= 0) throw new HttpError(400, "ID do usuário inválido ou não informado");

            const deletedCount = await UserRepository.deleteById(id);

            if (deletedCount === 0) throw new HttpError(404, "Usuário não encontrado");

            return response.status(200).json({ status: 200, message: "Usuário deletado com sucesso" })

        } catch (error) {
            if (error instanceof HttpError) {
                return response.status(error.statusCode).json({ status: error.statusCode, message: error.message });
            }

            console.error(error); // Logar erros inesperados
            return response.status(500).json({ status: 500, message: "Erro interno do servidor" });
        }
    }

    public static async getAll(request: Request, response: Response) {
        try {

            const users = await UserRepository.getAll();
            if (users.length === 0) {
                return response.status(200).json({ status: 200, message: "Não há usuários cadastrados" });
            }

            return response.status(200).json({ users });

        } catch (error) {
            if (error instanceof HttpError) {
                return response.status(error.statusCode).json({ status: error.statusCode, message: error.message });
            }

            console.error(error); // Logar erros inesperados
            return response.status(500).json({ status: 500, message: "Erro interno do servidor" });
        }
    }
    public static async update(request: Request, response: Response) {
        try {
            const id = parseInt(request.params.id);

            if (isNaN(id) || id <= 0) throw new HttpError(400, "ID do usuário inválido. O ID deve ser um número positivo.");


            if (!request.body || !Object.keys(request.body).length) throw new HttpError(400, "Você não informou nenhum dado para atualizar. Por favor, forneça os campos a serem atualizados.");

            const { email } = request.body;

            const existingUser = await UserRepository.findById(id);

            if (!existingUser) throw new HttpError(404, "Usuário não encontrado. Verifique se o ID está correto.");

            if (email) {

                if (isInvalidEmail(email)) throw new HttpError(400, "Formato de e-mail inválido. Por favor, forneça um e-mail válido.");

                const emailExists = await UserRepository.findByEmail(email);

                if (emailExists) throw new HttpError(409, "E-mail já cadastrado. Escolha outro e-mail.");
            }

            const update = await UserRepository.update(id, request.body);

            if (!update) throw new HttpError(400, "Erro ao atualizar os dados do usuário. Tente novamente mais tarde.");

            return response.status(200).json({ status: 200, message: "Usuário atualizado com sucesso" });

        } catch (error) {
            if (error instanceof HttpError) {
                return response.status(error.statusCode).json({ status: error.statusCode, message: error.message });
            }

            console.error(error); // Logar erros inesperados
            return response.status(500).json({ status: 500, message: "Erro interno do servidor" });
        }
    }

    public static async getUserById(request: Request, response: Response) {
        try {

            const id = parseInt(request.params.id);

            if (isNaN(id) || id <= 0) throw new HttpError(400, "ID do usuário inválido. O ID deve ser um número positivo.");

            const user = await UserRepository.findById(id);

            if (!user) throw new HttpError(404, "Usuário não encontrado");

            return response.status(200).json({ status: 200, user });

        } catch (error) {
            if (error instanceof HttpError) {
                return response.status(error.statusCode).json({ status: error.statusCode, message: error.message });
            }

            console.error(error); // Logar erros inesperados
            return response.status(500).json({ status: 500, message: "Erro interno do servidor" });
        }
    }


}

export default UserController;