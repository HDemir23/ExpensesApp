import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React, { useCallback, useMemo } from "react";
import { router } from "expo-router";
import { useThemeColors } from "@/constants/themeProvider";

export default function AddExpensesButton() {
  const theme = useThemeColors();

  const fab: ViewStyle = useMemo(
    () => ({
      position: "absolute",
      bottom: 24,
      right: 24,
      backgroundColor: theme.button.background,
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: "center",
      alignItems: "center",
      elevation: 5, // Android
      zIndex: 999, // IOS
    }),
    [theme.foreground]
  );

  const fabText: TextStyle = useMemo(
    () => ({
      color: theme.button.text,
      fontSize: 32,
      lineHeight: 34,
    }),
    [theme.foreground]
  );

  const onPress = useCallback(() => {
    router.push("/expenses");
  }, []);

  return (
    <View>
      <TouchableOpacity style={fab} onPress={onPress}>
        <Text style={fabText}>＋</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
