import { useThemeColors } from "@/constants/themeProvider";
import { useMemo } from "react";
import { TextStyle, ViewStyle } from "react-native";

export const useExpensesCardStyles = () => {
  const theme = useThemeColors();
  console.log("ExpensesCard rendered, theme mode:", theme.mode);

  const container: ViewStyle = useMemo(
    () => ({
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 20,
      backgroundColor: theme.background,
    }),
    [theme]
  );

  const itemCard: ViewStyle = useMemo(
    () => ({
      padding: 16,
      marginBottom: 12,
      borderRadius: 8,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 2,
      backgroundColor: theme.card,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      height: 90,
    }),
    [theme]
  );

  const description: TextStyle = useMemo(
    () => ({
      fontSize: 16,
      fontWeight: "600",
      color: theme.foreground,
    }),
    [theme]
  );

  const amount: TextStyle = useMemo(
    () => ({
      fontSize: 18,
      fontWeight: "bold",
      color: theme.primary,
    }),
    [theme]
  );
  const rect: ViewStyle = useMemo(
    () => ({
      backgroundColor: "red",
      justifyContent: "center",
      borderRadius: 30,
      alignItems: "flex-end",
      paddingHorizontal: 10,
      height: "90%",
      marginLeft: 5,
    }),
    []
  );

  return {
    container,
    itemCard,
    description,
    amount,
    rect,
  };
};
