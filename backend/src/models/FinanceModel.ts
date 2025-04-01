import { FinanceInterface } from "../interfaces/FinanceInterface";
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";

class FinanceModel extends Model implements FinanceInterface {
    public id!: number
    public description!: string;
    public type!: 'despesas' | 'receitas' | 'investimento';
    public value!: number;
    public userId!: number;
}

FinanceModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('receita', 'despesa', 'investimento'),
        allowNull: false
    },
    value: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        },
        onUpdate: 'CASCADE',  // Atualizar o userId se o ID do usuário mudar
        onDelete: 'SET NULL'  // Se o usuário for deletado, o userId será setado para NULL
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}, {
    sequelize,
    tableName: 'finance'
});


export default FinanceModel;