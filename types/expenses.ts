export type ExpenseType = {
  id: string;
  description: string;
  amount: number;
  icon?: string;
  date: number;
};


export type RatesType = {
  base: string,
  rates: Record<string, number>;
};