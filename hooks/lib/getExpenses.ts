import { ExpenseType } from "@/types/expenses";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getExpenses = async (): Promise<ExpenseType[]> => {
  const data = await AsyncStorage.getItem("expenses");
  return data ? JSON.parse(data) : [];
};
