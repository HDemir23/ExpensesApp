import { formatAmount } from "@/hooks/lib/formatAmount";
import { useExpenses } from "@/hooks/useExpenses";
import { ExpenseType } from "@/types/expenses";
import { router } from "expo-router";
import { useCallback } from "react";
import { FlatList, Text, View } from "react-native";
import { RectButton, Swipeable } from "react-native-gesture-handler";
import AddExpensesButton from "../AddExpensesButton";
import { useExpensesCardStyles } from "./styles/expensesCard.styles";


export default function ExpensesCard() {
  const styles = useExpensesCardStyles();

  const { expenses, handleDelete, keyExtractor } = useExpenses();

  const formattedAmount = formatAmount;

  const handleEdit = (expense: ExpenseType) => {
    router.push({
      pathname: "/expenses",
      params: {
        mode: "edit",
        id: expense.id,
        description: expense.description,
        amount: expense.amount.toString(), 
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
    ({ item }: { item: ExpenseType }) => (
      <Swipeable renderRightActions={() => renderAction(item)}>
        <View style={styles.itemCard}>
          <Text style={styles.description}>
            {item.icon ?? "💰"} {item.description} Date:{item.date}
          </Text>
          <Text style={styles.amount}>{formattedAmount(item.amount)}</Text>
        </View>
      </Swipeable>
    ),
    [formattedAmount, handleDelete, styles]
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
