import { ThemeProvider } from "@/constants/themeProvider";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useTheme } from "../constants/theme";

export default function RootLayout() {
  const theme = useTheme();

  return (
    <ThemeProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
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
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
