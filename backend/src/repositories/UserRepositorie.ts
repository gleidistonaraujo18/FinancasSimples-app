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

}

export default UserRepositorie;