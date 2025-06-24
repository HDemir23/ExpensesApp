import { expenseEmitter } from "@/utils/events";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useToolboxStyle } from "./TotalBox.style";
import { ExpenseType ,RatesType } from "@/types/expenses";



export default function TotalBox() {
  const styles = useToolboxStyle();
  const [amount, setAmount] = useState(0);
  const [showUSD, setShowUSD] = useState(false)

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
    const ratesData = await AsyncStorage.getItem("rates")

    const parsed: ExpenseType[] = data ? JSON.parse(data) : [];
    const total = parsed.reduce((sum, e) => sum + (e.amount ?? 0), 0);



    if(ratesData) {
      try {
          const parsedRates: RatesType = JSON.parse(ratesData) 
          let currentCurrency = parsedRates.rates[Localization.currency || "TRY"] || 1
          const usdRates = parsedRates.rates["USD"] || 1

          const BaseToTry = total / currentCurrency
          const converted = showUSD
          ? BaseToTry * usdRates
          : total; 
          
          setAmount(converted)
          return
        } catch (err) {
          console.error("Failed to parse rates:", err);
        }


    }

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
      <Pressable
        style={styles.OutBgContainer}
        onPress={() => {
          setShowUSD((prev) => !prev);
          fetchTotal(); 
        }}
      >
        <Text style={styles.TextHeaderStyle}>Total Spent</Text>
        <Text style={styles.TextSpendingStyle}>{formattedAmount}</Text>
      </Pressable>
    </View>
  );
}
