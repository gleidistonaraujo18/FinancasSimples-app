export interface FinanceInterface {
    id?: number,
    description: string,
    type: 'despesas' | 'receitas' | 'investimento',
    value: number,
    userId: number
}