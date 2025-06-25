export type ExpenseType = {
  id: string;
  description: string;
  amount: number;
  icon?: string;
  date: number;
  currency: string;
};


export type RatesType = {
  base: string,
  rates: Record<string, number>;
};