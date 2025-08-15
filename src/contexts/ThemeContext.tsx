import { useEffect, useState } from "react";
import { ThemeContext } from "./theme-context";

type Theme = "dark" | "light" | "system";

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

export const ThemeProvider = ({
  children,
  defaultTheme = "system",
  storageKey = "sonora-ui-theme",
}: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem(storageKey) as Theme) || defaultTheme;
    }
    return defaultTheme;
  });

  const [actualTheme, setActualTheme] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined") {
      if (theme === "system") {
        return window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      }
      return theme === "dark" ? "dark" : "light";
    }
    return "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      setActualTheme(systemTheme);
      return;
    }

    root.classList.add(theme);
    setActualTheme(theme);
  }, [theme]);

  useEffect(() => {
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (theme === "system") {
        const newTheme = e.matches ? "dark" : "light";
        setActualTheme(newTheme);

        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(newTheme);
      }
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () =>
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, [theme]);

  const handleSetTheme = (newTheme: Theme) => {
    localStorage.setItem(storageKey, newTheme);
    setTheme(newTheme);
  };

  const value = {
    theme,
    setTheme: handleSetTheme,
    actualTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
