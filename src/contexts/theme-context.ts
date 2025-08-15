import { createContext } from "react";

type Theme = "dark" | "light" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  actualTheme: "dark" | "light";
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);
