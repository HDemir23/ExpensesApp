import { ThemeProvider, useTheme } from "@/constants/themeProvider";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function StackNavigator() {
  const { theme } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.background,
        },
        headerTintColor: theme.foreground,
        contentStyle: {
          backgroundColor: theme.background,
        },
        headerTitleStyle: {
          color: theme.primary,
        },
        animation: "slide_from_right",
      }}
    />
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StackNavigator />
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
