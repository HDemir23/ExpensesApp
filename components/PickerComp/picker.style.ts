
import { useMemo } from "react";
import { TextStyle, ViewStyle } from "react-native";

import { useThemeColors } from "@/constants/themeProvider";

export const usePickerStyle = () => {
  const theme = useThemeColors();

  const container: ViewStyle = useMemo(
    () => ({
      padding: 20,
    }),
    []
  );

  const pickerBox: ViewStyle = useMemo(
    () => ({
      padding: 12,
      borderWidth: 1,
      borderRadius: 6,
      borderColor: "#ccc",
    }),
    []
  );

  const pickerText: TextStyle = useMemo(
    () => ({
      fontSize: 16,
    }),
    []
  );

  const modalBackdrop: ViewStyle = useMemo(
    () => ({
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.4)",
      justifyContent: "center",
      paddingHorizontal: 40,
    }),
    []
  );

  const modalContent: ViewStyle = useMemo(
    () => ({
      backgroundColor: "#fff",
      borderRadius: 8,
      padding: 10,
    }),
    []
  );

  const option: ViewStyle = useMemo(
    () => ({
      padding: 12,
      borderBottomWidth: 1,
      borderBottomColor: "#eee",
    }),
    []
  );


  return {
    container,
    pickerBox,
    pickerText,
    modalBackdrop,
    modalContent,
    option,
  };
};
