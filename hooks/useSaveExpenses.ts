import { ExpenseType } from "@/types/expenses";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { useCallback } from "react";
import { expenseEmitter } from "@/utils/events";
import { router } from "expo-router";

const STORAGE_KEY = "expenses";
const REFRESH_EVENT = "refreshTotal";

type Params = {
  isEdit: boolean;
  existingId?: string;
  description: string;
  amount: number;
  selectedDay: number;
  resetForm: () => void;
};

export const useSaveOrUpdateExpense = ({
  isEdit,
  existingId,
  description,
  amount,
  selectedDay,
  resetForm,
}: Params) => {
  return useCallback(async () => {
    if (!description.trim() || amount <= 0) {
      Alert.alert(
        "Invalid Input",
        "Please enter a valid description and amount."
      );
      return;
    }

    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      const parsed: ExpenseType[] = stored ? JSON.parse(stored) : [];

      let updatedList: ExpenseType[];

      if (isEdit && existingId) {
        // Güncelleme
        updatedList = parsed.map((item) =>
          item.id === existingId
            ? { ...item, description, amount, date: selectedDay }
            : item
        );
      } else {
        // Yeni ekleme
        const newItem: ExpenseType = {
          id: Date.now().toString(),
          description,
          amount,
          date: selectedDay,
        };
        updatedList = [...parsed, newItem];
      }

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
      resetForm();
      expenseEmitter.emit(REFRESH_EVENT);
      Alert.alert("Success", isEdit ? "Expense updated" : "Expense saved", [
        {
          text: "OK",
          onPress: () => {
            router.back(); // router.push("./home")
          },
        },
      ]);
    } catch (e) {
      console.error("Save/Update error:", e);
      Alert.alert("Error", "Failed to save or update the expense.");
    }
  }, [isEdit, existingId, description, amount, selectedDay, resetForm]);
};
