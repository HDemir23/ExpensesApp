import { ExpenseType } from "@/types/expenses";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveExpense = async (newItem: ExpenseType) => {
  const existing = await AsyncStorage.getItem("expenses");
  const parsed: ExpenseType[] = existing ? JSON.parse(existing) : [];
  const update = [...parsed, newItem];
  await AsyncStorage.setItem("expenses", JSON.stringify(update));
};
