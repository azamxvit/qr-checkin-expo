import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useColorScheme } from "react-native";

export type ThemeMode = "light" | "dark" | "system";

interface ThemeContextValue {
  themeMode: ThemeMode;
  resolvedColorScheme: "light" | "dark";
  setThemeMode: (mode: ThemeMode) => void;
}

const STORAGE_KEY = "theme_mode";

const ThemeContext = createContext<ThemeContextValue>({
  themeMode: "system",
  resolvedColorScheme: "light",
  setThemeMode: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>("system");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((stored) => {
      if (stored === "light" || stored === "dark" || stored === "system") {
        setThemeModeState(stored);
      }
      setIsLoaded(true);
    });
  }, []);

  const setThemeMode = useCallback((mode: ThemeMode) => {
    setThemeModeState(mode);
    AsyncStorage.setItem(STORAGE_KEY, mode);
  }, []);

  const resolvedColorScheme: "light" | "dark" =
    themeMode === "system" ? (systemColorScheme ?? "light") : themeMode;

  if (!isLoaded) return null;

  return (
    <ThemeContext.Provider
      value={{ themeMode, resolvedColorScheme, setThemeMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}
