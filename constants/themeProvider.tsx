import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useColorScheme } from "react-native";
import { DarkTheme, LightTheme } from "./theme";

interface ThemeContextType {
  theme: typeof LightTheme;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: LightTheme,
  toggleTheme: () => {},
  isDark: false,
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemScheme === "dark");

  // Sistem teması değiştiğinde güncelle (ilk yükleme için)
  useEffect(() => {
    setIsDark(systemScheme === "dark");
  }, [systemScheme]);

  const theme = useMemo(() => {
    return isDark ? DarkTheme : LightTheme;
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const contextValue = useMemo(
    () => ({
      theme,
      toggleTheme,
      isDark,
    }),
    [theme, isDark]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeColors = () => {
  const context = useContext(ThemeContext);
  return context.theme;
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
