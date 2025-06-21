import { ExpenseType } from "@/types/expenses";
import { expenseEmitter } from "@/utils/events";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback } from "react";
import { Alert } from "react-native";

const EXPENSES_Key = "expenses";
const REFRESH_Total = "refreshTotal";

export const useSaveExpense = (
  description: string,
  expense: number,
  selectedDay: number,
  resetForm: () => void
) => {
  return useCallback(async () => {
    if (!description.trim() || expense <= 0) {
      Alert.alert(
        "Invalid Input",
        "Please enter a valid description and amount."
      );
      return;
    }

    const newItem: ExpenseType = {
      id: Date.now().toString(),
      description,
      amount: expense,
      date: selectedDay,
    };

    try {
      const existing = await AsyncStorage.getItem(EXPENSES_Key);
      const parsed: ExpenseType[] = existing ? JSON.parse(existing) : [];
      const updated = [...parsed, newItem];
      await AsyncStorage.setItem(EXPENSES_Key, JSON.stringify(updated));

      resetForm();
      expenseEmitter.emit(REFRESH_Total);
      Alert.alert("Expenses Saved");
    } catch (e) {
      console.log("Saving errorr", e);
      Alert.alert("Error", "Failed to save Expense");
    }
  }, [description, expense, selectedDay, resetForm]);
};
