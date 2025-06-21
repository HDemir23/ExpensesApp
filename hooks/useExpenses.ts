import { ExpenseType } from "@/types/expenses";
import { expenseEmitter } from "@/utils/events";
import { useCallback, useEffect, useState } from "react";
import { getExpenses } from "./lib/getExpenses";
import { deleteExpense } from "./lib/deleteExpenses";
import { formatAmount } from "./lib/formatAmount";

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<ExpenseType[]>([]);

  const fetchExpenses = useCallback(async () => {
    const data = await getExpenses();
    setExpenses(data);
  }, []);

  useEffect(() => {
    fetchExpenses();
    const lostener = () => fetchExpenses()
    expenseEmitter.on("refreshTotal", lostener)

    return () => {
        expenseEmitter.off("refreshTotal", lostener);
    }
  }, [fetchExpenses]);

  const handleDelete = useCallback(async (id: string) => {
    const updated = await deleteExpense(id);
    setExpenses(updated);
    expenseEmitter.emit("refreshTotal");
  }, []);

  const keyExtractor = useCallback((item: ExpenseType) => item.id, []);

  return {
    expenses,
    formattedAmount: formatAmount,
    keyExtractor,
    handleDelete,
  };
};
