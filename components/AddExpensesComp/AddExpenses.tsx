import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import React, { useCallback, useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { useAddExpensesStyles } from "./AddExpenses.style";
import { useSaveExpense } from "@/hooks/useSaveExpenses";




export default function AddExpenses() {

  // Magic Numbers must be constant declerade
  const EXPENSES_Key = "expenses"

  const [expense, setExpense] = useState<number>(0);
  const [description, setDescription] = useState("");
  const styles = useAddExpensesStyles();
  const [selectedDay, setSelectedDay] = useState(30);
  const [checked, setChecked]= useState(false)

  const onChangeNumber = useCallback((text: string) => {
    const number = parseFloat(text);
    setExpense(isNaN(number) ? 0 : number);
  }, []);


  const resetForm = () => {
    setDescription("");
    setExpense(0)
    setSelectedDay(30)
  }

  const Save = useSaveExpense(description, expense, selectedDay, resetForm)

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          placeholder="e.g. Grocery shopping"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
          placeholderTextColor={styles.picker.color}
          returnKeyType="done"
        />

        <Text style={styles.label}>Amount</Text>
        <TextInput
          placeholder="e.g. 45.99"
          value={expense.toString()}
          onChangeText={onChangeNumber}
          keyboardType="numeric"
          style={styles.input}
          returnKeyType="done"
        />
      </View>

      <View style={styles.card}>
        <Picker
          selectedValue={selectedDay}
          onValueChange={(itemValue) => {
            setSelectedDay(itemValue);
          }}
          style={styles.picker}
          itemStyle={styles.picker}
        >
          {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
            <Picker.Item key={day} label={`Day ${day} `} value={day} />
          ))}
        </Picker>
      </View>
      <Pressable onPress={() => setChecked(!checked)} style={styles.card}>
        <Text style={styles.input}>{checked ? "☑️" : "⬜️"} Notification</Text>
      </Pressable>
      <View style={styles.card}>
        <Pressable style={styles.button} onPress={Save}>
          <Text style={styles.buttonText}>Save</Text>
        </Pressable>
      </View>
    </View>
  );
}
