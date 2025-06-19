import { useColorScheme } from "react-native";


export const LightTheme = {
  mode: "light",
  background: "#FDF6EC", 
  card: "#FFFFFF",
  foreground: "#3A3A2C",
  secondaryText: "#857C63",
  placeholderText: "#A6A28F",
  border: "#E6DCC3",
  inputBackground: "#FBF8F1",
  primary: "#B8860B",
  primaryTextOnPrimary: "#FFFFFF",
  accent: "#D8CBB5", 

  button: {
    background: "#B8860B",
    text: "#FFFFFF",
    border: "#8B6914",
    hover: "#7F5F1A",
  },

  shadow: {
    color: "#000000",
    opacity: 0.06,
    radius: 4,
    offset: { width: 0, height: 2 },
  },

  status: {
    success: "#228B22",
    warning: "#DAA520",
    error: "#8B0000",
  },
};

export const DarkTheme = {
  mode: "dark",
  background: "#0D0D0D",
  card: "#1C1C1C",
  foreground: "#F5F5F5",
  secondaryText: "#B0AFAF",
  placeholderText: "#8C8C8C",
  border: "#2B2B2B",
  inputBackground: "#262626",
  primary: "#D4AF37", // altın sarısı
  primaryTextOnPrimary: "#000000",
  accent: "#FFD700", // gold highlight

  button: {
    background: "#D4AF37",
    text: "#000000",
    border: "#B8860B",
    hover: "#C9A835",
  },

  shadow: {
    color: "#000000",
    opacity: 0.3,
    radius: 8,
    offset: { width: 0, height: 4 },
  },

  status: {
    success: "#3CB371",
    warning: "#FFA500",
    error: "#DC143C",
  },
};


export function useTheme() {
  const scheme = useColorScheme();
  return scheme === "dark" ? DarkTheme : LightTheme;
}
