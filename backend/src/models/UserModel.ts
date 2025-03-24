import UserInterface from "../interfaces/UserInterface";
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";



class UserModel extends Model implements UserInterface {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public resetPass!: boolean;
    public createdAt!: Date;
    public updatedAt!: Date;
}

UserModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        resetPass: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: 'users'
    }
);

export default UserModel;