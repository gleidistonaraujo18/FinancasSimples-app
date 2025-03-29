import UserModel from "../models/UserModel";
import UserInterface from "../interfaces/UserInterface";

class UserRepositorie {

    public static async create(user: UserInterface): Promise<UserModel> {
        return await UserModel.create({ name: user.name, email: user.email, password: user.password, resetPass: user.resetPass });
    }

    public static findByEmail(email: string) {
        return UserModel.findOne({ where: { email } });
    }

    public static async deleteById(id: number): Promise<number> {
        return UserModel.destroy({ where: { id } });
    }

    public static async getAll(): Promise<object[]> {
        return await UserModel.findAll({
            attributes: ['name', 'email', 'resetPass', 'createdAt', 'updatedAt']
        });

    }

    public static async findById(id: number): Promise<UserInterface | null> {
        return await UserModel.findByPk(id, { attributes: ['name', 'email', 'resetPass', 'createdAt', 'updatedAt'] });
    }

    public static async update(id: number, user: UserInterface): Promise<boolean> {
        const [affectedRows] = await UserModel.update(user, { where: { id } });

        //Retorna true se tiver linhas afetadas
        return affectedRows > 0;
    }

}

export default UserRepositorie;