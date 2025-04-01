export interface FinanceInterface {
    id?: number,
    description: string,
    type: 'despesas' | 'receitas' | 'investimento',
    value: number,
    userId: number,
    createdAt?: Date,
    updatedAt?: Date
}

export interface TransactionInterface {
    type?: string,
    userId: number,
    startDate: Date,
    endDate: Date
}