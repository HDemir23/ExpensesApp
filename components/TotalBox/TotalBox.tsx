import { ExpenseType, RatesType } from "@/types/expenses";
import { expenseEmitter } from "@/utils/events";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useToolboxStyle } from "./TotalBox.style";

import { convertCurr } from "@/utils/currenncyUtils";

export default function TotalBox() {
  const styles = useToolboxStyle();
  const [amount, setAmount] = useState(0);
  const [showUSD, setShowUSD] = useState(false);
  const locale = Localization.locale;

  useEffect(() => {
    const handler = () => {
      fetchTotal();
    };

    expenseEmitter.on("refreshTotal", handler);

    return () => {
      expenseEmitter.off("refreshTotal", handler);
    };
  }, []);

  
  const fetchTotal = useCallback(async () => {
    const data = await AsyncStorage.getItem("expenses");
    const ratesData = await AsyncStorage.getItem("rates");

    const parsed: ExpenseType[] = data ? JSON.parse(data) : [];

    if (ratesData) {
      try {
        const parsedRates: RatesType = JSON.parse(ratesData);

        const total = parsed.reduce((sum, e) => {
          if (!e.amount || !e.currency) return sum;

          const converted = convertCurr(
            e.amount,
            e.currency,
            showUSD ? "USD" : "TRY",
            parsedRates
          );

          return sum + converted;
        }, 0);

        setAmount(total);
        return;
      } catch (err) {
        console.error("Failed to parse rates:", err);
      }
    }


    const fallbackTotal = parsed.reduce((sum, e) => sum + (e.amount ?? 0), 0);
    setAmount(fallbackTotal);
  }, [showUSD]);

  useFocusEffect(
    useCallback(() => {
      fetchTotal();
    }, [fetchTotal]) 
  );



  const formattedAmount = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: showUSD ? "USD" : Localization.currency ?? "TRY",
    currencyDisplay: "narrowSymbol",
  }).format(amount);

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.OutBgContainer}
        onPress={() => {
          setShowUSD((prev) => !prev);
        }}
      >
        <Text style={styles.TextHeaderStyle}>Total Spent</Text>
        <Text style={styles.TextSpendingStyle}>{formattedAmount}</Text>
      </Pressable>
    </View>
  );
}
