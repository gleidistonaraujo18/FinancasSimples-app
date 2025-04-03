import { FinanceInterface, TransactionInterface } from "../interfaces/FinanceInterface";
import FinanceModel from "../models/FinanceModel";
import { Op } from "sequelize";

class FinanceRepository {
    public static async create(finance: FinanceInterface): Promise<FinanceModel> {
        return await FinanceModel.create({ description: finance.description, type: finance.type, value: finance.value, userId: finance.userId });
    }

    public static async getFinancialTransactions(data: TransactionInterface) {

        const startDate = new Date(data.startDate);
        const endDate = new Date(data.endDate);

        endDate.setHours(23, 59, 59, 999);

        if (!data.type) {
            /**
             * @data {userId, startDate, endDate}
             * Caso o usuário queira visualizar sem filtro de tipo de operação.
             * 
             */
            return await FinanceModel.findAll({
                where: {
                    userId: data.userId,
                    createdAt: {
                        [Op.between]: [startDate, endDate]
                    }
                }
            })
        }

        /**
         * @data {Type, userId, startDate, endDate}
         * Caso o usuário queira visualizar com filtro de tipo de operação.
         * 
         */

        return await FinanceModel.findAll({
            where: {
                type: data.type,
                userId: data.userId,
                createdAt: {
                    [Op.between]: [startDate, endDate]
                }
            }
        })
    }

    public static async getById(userId: number): Promise<FinanceModel | null> {
        return await FinanceModel.findByPk(userId);
    }

    public static async update(id: number, transaction: FinanceInterface) {
        const [affectedRows] = await FinanceModel.update(transaction, { where: { id } });

        //Retorna true se tiver linhas afetadas
        return affectedRows > 0;
    }
}

export default FinanceRepository;