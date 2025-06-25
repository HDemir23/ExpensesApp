import { RatesType } from "@/types/expenses";


export const convertCurr = (
    amount: number,
    from: string,
    to: string,
    rates: RatesType
) : number => {
    if(from === to ) return amount

    const fromRate = rates.rates[from] || 1
    const toRate = rates.rates[to] || 1

    const baseAmount = amount / fromRate
    const converted = baseAmount * toRate

    return converted
}