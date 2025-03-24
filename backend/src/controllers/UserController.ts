import { isInvalidEmail, validateRequiredFields } from "../utils/validators/Validators";
import HttpError from "../utils/errors/Erro";
import { Request, Response } from "express";
import UserRepositorie from "../repositories/UserRepositorie";
import bcrypt from 'bcrypt'


class UserController {

    public static async create(request: Request, response: Response) {
        try {
            const { name, email, password, resetPass } = request.body;

            validateRequiredFields({ name, email, password });

            if (isInvalidEmail(email)) throw new HttpError(400, "Formato de e-mail inválido.");

            if (await UserRepositorie.findByEmail(email)) throw new HttpError(400, "E-mail já cadastrado.");

            const hash = await bcrypt.hash(password, 10);

            await UserRepositorie.create({ name, email, password: hash, resetPass });

            return response.status(201).json({ status: 201, message: "Usuário criado com sucesso" });

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