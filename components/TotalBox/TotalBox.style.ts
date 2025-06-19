
import { useMemo } from "react";
import { TextStyle, ViewStyle } from "react-native";
import { useThemeColors } from "@/constants/themeProvider";

export const useToolboxStyle = () => {
  const theme = useThemeColors();

  const container: ViewStyle = useMemo(
    () => ({
      justifyContent: "center",
      alignItems: "center",
    }),
    []
  );

  const OutBgContainer: ViewStyle = useMemo(
    () => ({
      backgroundColor: theme.accent,
      borderRadius: 10,
      margin: 10,
      padding: 20,
      width: "90%",
      height: 150,
      justifyContent: "center",
      alignItems: "center",
    }),
    [theme.background]
  );

  const TextHeaderStyle: TextStyle = useMemo(
    () => ({
      fontSize: 16,
      fontWeight: "bold" as const,
      color: theme.foreground,
    }),
    [theme.foreground]
  );

  const TextSpendingStyle: TextStyle = useMemo(
    () => ({
      fontSize: 32,
      color: theme.primaryTextOnPrimary,
    }),
    [theme.primaryTextOnPrimary]
  );


  return {
    container,
    OutBgContainer,
    TextHeaderStyle,
    TextSpendingStyle,
  };
};
