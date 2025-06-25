import { useTheme, useThemeColors } from "@/constants/themeProvider";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useCallback } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function Index() {
  const theme = useThemeColors();
  const { toggleTheme, isDark } = useTheme();

  const onPress = useCallback(() => {
    router.push("./home");
  }, []);

  // this section is hardcoded

  const handleThemeToggle = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TouchableOpacity
        style={[
          styles.themeButton,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
            shadowColor: theme.shadow.color,
          },
        ]}
        onPress={handleThemeToggle}
        activeOpacity={0.7}
      >
        <Ionicons
          name={isDark ? "sunny" : "moon"}
          size={24}
          color={theme.primary}
        />
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={[styles.imageContainer, { borderColor: theme.border }]}>
          <Ionicons
            onPress={onPress}
            name="wallet"
            size={80}
            color={theme.primary}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  themeButton: {
    position: "absolute",
    top: 60,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  clickText: {
    fontSize: 18,
    fontWeight: "600",
  },
});
