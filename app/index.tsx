
import {   StyleSheet, View,Text } from "react-native";
import AddExpensesButton from "@/components/AddExpensesButton";
import { router } from "expo-router";
import { useCallback, useMemo } from "react";
import { useThemeColors } from "@/constants/themeProvider";

export default function Index() {
  const theme = useThemeColors();
  const onPress = useCallback(() => {
    router.push("./home")
  }, [])

  return (
    <View style={styles.container}>

        <Text style={{color: theme.foreground}} onPress={onPress}>Click Me</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center"
  },
});



