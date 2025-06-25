import { useExpenses } from "@/hooks/useExpenses";
import { ExpenseType } from "@/types/expenses";
import { formatAmount } from "@/utils/formatAmount";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { RectButton, Swipeable } from "react-native-gesture-handler";
import AddExpensesButton from "../AddExpensesButton";
import { useExpensesCardStyles } from "./styles/expensesCard.styles";
import { getRates } from "@/hooks/lib/getExpenses";

type DisplayExpense = ExpenseType & {
  formattedAmount: string;
};

export default function ExpensesCard() {
  const styles = useExpensesCardStyles();
  
  const { expenses, handleDelete, keyExtractor } = useExpenses();
  const [displayExpense, setDisplayExpense] = useState<DisplayExpense[]>([]);

  const getCurrencyEmote = (code: string): string => {
    switch (code.toUpperCase()) {
      case "TRY":
        return "🇹🇷";
      case "USD":
        return "🇺🇸";
      case "EUR":
        return "🇪🇺";
      default:
        return "💰";
    }
  };
  useEffect(() => {
    const procces = async () => {
      const rates = await getRates();
      const update = await Promise.all(
        expenses.map(async (expense) => {
          const formatted = await formatAmount(
            expense.amount,
            expense.currency,
            expense.currency,
            rates.rates
          );
          return {
            ...expense,
            formattedAmount: formatted,
          };
        })
      );
      setDisplayExpense(update);
    };
    procces();
  }, [expenses]);

  const handleEdit = (expense: ExpenseType) => {
    router.push({
      pathname: "/expenses",
      params: {
        mode: "edit",
        id: expense.id,
        description: expense.description,
        amount: expense.amount.toString(),
        currency: expense.currency,
        date: expense.date.toString(),
      },
    });
  };
  // add handleEdit here
  const renderAction = (expense: ExpenseType) => (
    <View style={{ flexDirection: "row", height: "100%" }}>
      <RectButton style={styles.rect} onPress={() => handleDelete(expense.id)}>
        <Text style={{ color: "white", paddingHorizontal: 16 }}>Delete</Text>
      </RectButton>

      <RectButton style={styles.edit} onPress={() => handleEdit(expense)}>
        <Text style={{ color: "white", paddingHorizontal: 16 }}>
          {"\u2002"}Edit{"\u2002"}
        </Text>
      </RectButton>
    </View>
  );

  const renderExpenses = useCallback(
    ({ item }: { item: DisplayExpense }) => (
      <Swipeable renderRightActions={() => renderAction(item)}>
        <View style={styles.itemCard}>
          <Text style={styles.description}>
            {getCurrencyEmote(item.currency)} {item.description}
          </Text>
          <Text style={styles.amount}>{[item.formattedAmount]}</Text>
        </View>
      </Swipeable>
    ),
    [handleDelete, styles]
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={displayExpense}
        keyExtractor={keyExtractor}
        renderItem={renderExpenses}
      />
      <AddExpensesButton />
    </View>
  );
}
