import { CheckinTheme, DarkTheme } from "../constants/theme";
import { ThemeMode, useThemeContext } from "../context/ThemeContext";

interface AppTheme {
  theme: typeof CheckinTheme;
  isDark: boolean;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
}

export function useAppTheme(): AppTheme {
  const { themeMode, resolvedColorScheme, setThemeMode } = useThemeContext();

  const isDark = resolvedColorScheme === "dark";
  const theme = isDark ? DarkTheme : CheckinTheme;

  return { theme, isDark, themeMode, setThemeMode };
}
