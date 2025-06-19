import { useColorScheme } from "react-native";
import {LightTheme ,DarkTheme} from "./theme"
import { Children, createContext, useContext, useMemo } from "react";



const ThemeContext = createContext(LightTheme)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const scheme = useColorScheme();

    const theme = useMemo(
        () => {
            return scheme === "dark" ? DarkTheme : LightTheme
        },
        [scheme]
    )



    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useThemeColors = () => useContext(ThemeContext);