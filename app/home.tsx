import { StyleSheet, View } from "react-native";

import ExpensesCard from "@/components/ExpensesCardComp/ExpensesCard";
import TotalBox from "@/components/TotalBox/TotalBox";

export default function home() {
  return (
    <View style={styles.container}>
      <TotalBox />
      <ExpensesCard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
