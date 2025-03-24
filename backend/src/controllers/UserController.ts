import { isInvalidEmail, validateRequiredFields } from "../utils/validators/Validators";
import HttpError from "../utils/errors/Erro";
import { Request, Response } from "express";
import UserRepositorie from "../repositories/UserRepositorie";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


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


    public static async auth(request: Request, response: Response) {
        try {
            const { email, password } = request.body;

            validateRequiredFields({ email, password });

            if (isInvalidEmail(email)) throw new HttpError(400, "Formato de e-mail inválido.");

            const user = await UserRepositorie.findByEmail(email);

            if (!user) throw new HttpError(401, "E-mail ou senha inválidos");

            if (!await bcrypt.compare(password, user.password)) throw new HttpError(401, "E-mail ou senha inválidos");


            /*  
            * Gerando um token JWT para autenticação do usuário
            */

            const token = jwt.sign(
                {
                    // Informações que serão armazenadas no token (payload)
                    id: user.id,
                    name: user.name,
                    email: user.email
                },
                // Chave secreta usada para assinar o token (vinda do .env)
                process.env.SECRET as string,
                {
                    // Tempo de expiração do token
                    expiresIn: "1h"
                }
            );

            return response.status(200).json({ status: 200, message: "login realizado com sucesso.", token });

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