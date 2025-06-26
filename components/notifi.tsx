import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { RatesType } from "@/types/expenses";
import { useThemeColors } from "@/constants/themeProvider";

type Props = {
  currency: string;
};

export default function ApiReq({ currency }: Props) {
  const [loading, setLoading] = useState(false);
  const localCurrency = Localization.currency || "USD";
  const theme = useThemeColors();

  const fetchRates = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://api.exchangerate-api.com/v4/latest/${localCurrency}`
      );

      const fullRates: RatesType = {
        base: localCurrency,
        rates: data.rates,
      };

      await AsyncStorage.setItem("rates", JSON.stringify(fullRates));
      Alert.alert("✅ Başarılı", `${currency} kurları kaydedildi.`);
    } catch (error) {
      console.error("API error:", error);
      Alert.alert("❌ Hata", "API çağrısı başarısız oldu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.fetchButton,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
          shadowColor: theme.shadow.color,
        },
      ]}
      onPress={fetchRates}
      activeOpacity={0.7}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color={theme.primary} />
      ) : (
        <Ionicons name="refresh" size={24} color={theme.primary} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fetchButton: {
    width: 50,
    height: 50,
    marginHorizontal: 8,
    marginVertical: 8,
    borderRadius: 25,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
