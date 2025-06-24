import { ExpenseType , RatesType } from "@/types/expenses";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getExpenses = async (): Promise<ExpenseType[]> => {
  const data = await AsyncStorage.getItem("expenses");
  return data ? JSON.parse(data) : [];
};


export const getRates = async (): Promise<RatesType> => {
  const data = await AsyncStorage.getItem("rates");

  return data ? JSON.parse(data) : { base: "TRY", rates: {} };
};
