import React, { useCallback, useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { useAddExpensesStyles } from "./AddExpenses.style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {expenseEmitter} from "@/utils/events"

type ExpenseType = {
  id: string;
  description: string;
  amount: number;
  icon?: string;
};

export default function AddExpenses() {
  const [expense, setExpense] = useState<number>(0);
  const [description, setDescription] = useState("");
  const styles = useAddExpensesStyles();

  const onChangeNumber = useCallback((text: string) => {
    const number = parseFloat(text);
    setExpense(isNaN(number) ? 0 : number);
  }, []);

  const onPressed = useCallback(async () => {
    if (!description || expense <= 0) {
      Alert.alert("Please enter a valid description and amount.");
      return;
    }

    const newItem: ExpenseType = {
      id: Date.now().toString(),
      description,
      amount: expense,
    };

    try {
      const existing = await AsyncStorage.getItem("expenses");
      const parsed: ExpenseType[] = existing ? JSON.parse(existing) : [];
      const updated = [...parsed, newItem];

      await AsyncStorage.setItem("expenses", JSON.stringify(updated));
      setDescription("");
      setExpense(0);
      expenseEmitter.emit("refreshTotal");
      Alert.alert("Expense Saved");
    } catch (e) {
      console.error("Save error:", e);
    }
  }, [description, expense]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          placeholder="e.g. Grocery shopping"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
        />

        <Text style={styles.label}>Amount</Text>
        <TextInput
          placeholder="e.g. 45.99"
          value={expense.toString()}
          onChangeText={onChangeNumber}
          keyboardType="numeric"
          style={styles.input}
        />

        <Pressable style={styles.button} onPress={onPressed}>
          <Text style={styles.buttonText}>Save</Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Preview</Text>
        <Text style={styles.input}>Name: {description}</Text>
        <Text style={styles.input}>Expense: {expense}</Text>
      </View>
    </View>
  );
}
