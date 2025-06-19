import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { RectButton, Swipeable } from "react-native-gesture-handler";
import AddExpensesButton from "../AddExpensesButton";
import { useExpensesCardStyles } from "./styles/expensesCard.styles";
import { expenseEmitter } from "@/utils/events";

type ExpenseType = {
  id: string;
  description: string;
  amount: number;
  icon?: string;
};

export default function ExpensesCard() {
  const styles = useExpensesCardStyles();
  const [expenses, setExpenses] = useState<ExpenseType[]>([]);

  useFocusEffect( 
    useCallback(() => {
      const fetchExpenses = async () => {
        const data = await AsyncStorage.getItem("expenses");
        const parsed = data ? JSON.parse(data) : [];
        setExpenses(parsed);
      };
      fetchExpenses();
    }, [])
  );

  const formattedAmount = useCallback((amount: number) => {
    return new Intl.NumberFormat(Localization.locale, {
      style: "currency",
      currency: Localization.currency ?? "USD",
      currencyDisplay: "narrowSymbol",
    }).format(amount);
  }, [styles]);

  const keyExtractor = useCallback((item: ExpenseType) => item.id, []);

  const handleDelete = useCallback(
    async (id: string) => {
      const filtered = expenses.filter((e) => e.id !== id);
      setExpenses(filtered);
      await AsyncStorage.setItem("expenses", JSON.stringify(filtered));

      expenseEmitter.emit("refreshTotal");
    },
    [expenses]
  );

  const renderAction = (id: string) => (
    <RectButton style={styles.rect} onPress={() => handleDelete(id)}>
      <Text style={{ color: "white", paddingHorizontal: 16 }}>Delete</Text>
    </RectButton>
  );

  const renderExpenses = useCallback(
    ({ item }: { item: ExpenseType }) => (
      <Swipeable renderRightActions={() => renderAction(item.id)}>
        <View style={styles.itemCard}>
          <Text style={styles.description}>
            {item.icon ?? "💰"} {item.description}
          </Text>
          <Text style={styles.amount}>{formattedAmount(item.amount)}</Text>
        </View>
      </Swipeable>
    ),
    [formattedAmount, handleDelete]
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={expenses}
        keyExtractor={keyExtractor}
        renderItem={renderExpenses}
      />
      <AddExpensesButton />
    </View>
  );
}
