import { ExpenseType } from "@/types/expenses";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const deleteExpense = async (id: string) => {
  const existing = await AsyncStorage.getItem("expenses");
  const parsed: ExpenseType[] = existing ? JSON.parse(existing) : [];
  const update = parsed.filter((item) => item.id !== id);
  await AsyncStorage.setItem("expenses", JSON.stringify(update));
  return update;
};
