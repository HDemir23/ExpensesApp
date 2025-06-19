import * as Localization from "expo-localization";
import { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useToolboxStyle } from "./TotalBox.style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { expenseEmitter } from "@/utils/events"


type ExpenseType = {
  id: string;
  description: string;
  amount: number;
  icon?: string;
};

export default function TotalBox() {
  const styles = useToolboxStyle();
  const [amount, setAmount] = useState(0)



  useFocusEffect(
    useCallback(() => {
      fetchTotal();
    }, [])
  );

  useEffect(() => {
    const handler = () => {
      fetchTotal(); 
    };

    expenseEmitter.on("refreshTotal", handler);

    return () => {
      expenseEmitter.off("refreshTotal", handler);
    };
  }, []);


  const fetchTotal = async () => {
    const data = await AsyncStorage.getItem("expenses");
    const parsed: ExpenseType[] = data ? JSON.parse(data) : [];
    const total = parsed.reduce((sum, e) => sum + (e.amount ?? 0), 0);
    setAmount(total);
  };



  const region = Localization.region;
  const currency = Localization.currency ?? "USD";
  const locale = Localization.locale;

  const formattedAmount = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    currencyDisplay: "narrowSymbol",
  }).format(amount);


  return (
    <View style={styles.container}>
      <View style={styles.OutBgContainer}>
        <Text style={styles.TextHeaderStyle}>Total Spent</Text>
        <Text style={styles.TextSpendingStyle}>{formattedAmount}</Text>
      </View>
    </View>
  );
}
