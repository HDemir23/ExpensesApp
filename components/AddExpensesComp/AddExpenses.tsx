import { getRates } from "@/hooks/lib/getExpenses";
import { useSaveOrUpdateExpense } from "@/hooks/useSaveExpenses";
import { ExpenseType } from "@/types/expenses";
import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useAddExpensesStyles } from "./AddExpenses.style";
import { ScrollView } from "react-native-gesture-handler";

type AddExpensesProps = {
  mode?: "add" | "edit";
  onSubmit?: (expense: ExpenseType) => void;
};

const currencys = ["USD", "TRY", "EUR"];

export default function AddExpenses(props: AddExpensesProps) {
  const {
    mode,
    id,
    description: incomingDescription,
    amount: incomingAmount,
    date: incomingDate,
    currency: incomingCurrency,
  } = useLocalSearchParams();

  const params = useLocalSearchParams();
  const isEdit = params.mode === "edit";

  const [description, setDescription] = useState(
    isEdit && typeof params.description === "string" ? params.description : ""
  );
  const [expense, setExpense] = useState(
    isEdit && typeof params.amount === "string" ? Number(params.amount) : 0
  );
  const [selectedDay, setSelectedDay] = useState(
    isEdit && typeof params.date === "string" ? Number(params.date) : 30
  );

  const [currency, setCurrency] = useState(
    isEdit && typeof params.currency === "string" ? params.currency : "TRY"
  );


  const styles = useAddExpensesStyles();

  const [checked, setChecked] = useState(false);

  const onChangeNumber = useCallback((text: string) => {
    const number = parseFloat(text);
    setExpense(isNaN(number) ? 0 : number);
  }, []);

  useEffect(() => {
    getRates().then((res) => {
      setCurrency;
      console.log("Currency setted");
    });
  }, []);

  const resetForm = () => {
    setDescription("");
    setExpense(0);
    setSelectedDay(30);
    setCurrency("TRY");
  };

  const Save = useSaveOrUpdateExpense({
    isEdit,
    existingId: isEdit ? String(id) : undefined,
    description,
    amount: expense,
    selectedDay,
    currency,
    resetForm,
  });

  return (
    <ScrollView>
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
            <Text></Text>
          <Picker
            selectedValue={currency}
            onValueChange={(itemValue) => {
              setCurrency(itemValue);
            }}
            style={styles.picker}
            itemStyle={styles.picker}
          >
            {currencys.map((curr) => (
              <Picker.Item key={curr} label={curr} value={curr} />
            ))}
          </Picker>
        </View>

        <View style={styles.card}>
          <Pressable style={styles.button} onPress={Save}>
            <Text style={styles.buttonText}>{isEdit ? "Update" : "Save"}</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}


{/*
  
<Pressable onPress={() => setChecked(!checked)} style={styles.card}>
  <Text style={styles.input}>{checked ? "☑️" : "⬜️"} Notification</Text>
</Pressable>; 


*/}