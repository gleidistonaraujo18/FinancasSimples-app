import { FinanceInterface } from "../interfaces/FinanceInterface";
import FinanceModel from "../models/FinanceModel";

class FinanceRepository {
    public static async create(finance: FinanceInterface): Promise<FinanceModel> {
        return await FinanceModel.create({ description: finance.description, type: finance.type, value: finance.value, userId: finance.userId });
    }
}

export default FinanceRepository;