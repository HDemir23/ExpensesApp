import { useThemeColors } from "@/constants/themeProvider";
import { useMemo } from "react";
import { Platform, StyleSheet } from "react-native";

export function useAddExpensesStyles() {
  const colors = useThemeColors();
  const IsIos = Platform.OS === "ios";

  const container = useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: colors.background,
          paddingHorizontal: 16,
          paddingTop: 16,
        },
      }).container,
    [colors]
  );

  const card = useMemo(
    () =>
      StyleSheet.create({
        card: {
          backgroundColor: colors.card,
          borderRadius: 12,
          padding: 16,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
          marginTop: 10,
        },
      }).card,
    [colors]
  );

  const label = useMemo(
    () =>
      StyleSheet.create({
        label: {
          fontSize: 14,
          color: colors.secondaryText,
          marginBottom: 4,
        },
      }).label,
    [colors]
  );

  const input = useMemo(
    () =>
      StyleSheet.create({
        input: {
          backgroundColor: colors.background,
          color: colors.foreground,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 8,
          padding: 12,
          fontSize: 16,
          marginBottom: 12,
        },
      }).input,
    [colors]
  );

  const button = useMemo(
    () =>
      StyleSheet.create({
        button: {
          backgroundColor: colors.primary,
          paddingVertical: 12,
          borderRadius: 8,
          alignItems: "center",
        },
      }).button,
    [colors]
  );

  const buttonText = useMemo(
    () =>
      StyleSheet.create({
        buttonText: {
          color: colors.card,
          fontSize: 16,
          fontWeight: "bold",
        },
      }).buttonText,
    [colors]
  );

  const picker = useMemo(
    () =>
      StyleSheet.create({
        button: {
          color: colors.foreground,
          height: IsIos ? 120 : undefined,
        },
      }).button,
    [colors, IsIos]
  );

  return {
    container,
    card,
    label,
    input,
    button,
    buttonText,
    picker,
  };
}
