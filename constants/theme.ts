import { Platform } from "react-native";

const palette = {
  primary: "#DC2626",
  white: "#FFFFFF",
  black: "#000000",

  iconRed: "#FF3B30",
  iconGreen: "#34C759",
  iconBlue: "#007AFF",
  iconOrange: "#FF9500",
  iconPurple: "#5856D6",
  iconSky: "#2AABEE",
  iconGray: "#8E8E93",
};

export const CheckinTheme = {
  dark: false,
  primary: palette.primary,
  background: "#F2F2F7",
  card: "#FFFFFF",
  text: "#000000",
  textSecondary: "#8E8E93",
  inputBorder: "#C6C6C8",
  overlay: "rgba(0,0,0,0.5)",
  white: "#FFFFFF",

  colors: {
    ...palette,
  },
};

export const DarkTheme = {
  dark: true,
  primary: palette.primary,
  background: "#000000",
  card: "#1C1C1E",
  text: "#FFFFFF",
  textSecondary: "#98989D",
  inputBorder: "#38383A",
  overlay: "rgba(0,0,0,0.8)",
  white: "#1E1E1E",

  colors: {
    ...palette,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
});
