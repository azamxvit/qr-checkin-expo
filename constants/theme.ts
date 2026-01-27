import { Platform } from "react-native";

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

const checkinRed = "#dc2626";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    iconDefault: "#D1D5DB",
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};

export const CheckinTheme = {
  primary: checkinRed,
  background: "#FFFFFF",
  text: "#333333",
  textSecondary: "#666666",
  inputBorder: "#E0E0E0",
  white: "#FFFFFF",
  overlay: "rgba(0,0,0,0.6)",
  success: "#22C55E",
  iconDefault: "#D1D5DB",
};

export const DarkTheme = {
  primary: checkinRed,
  background: "#121212",
  text: "#FFFFFF",
  textSecondary: "#A0A0A0",
  inputBorder: "#333333",
  white: "#1E1E1E",
  overlay: "rgba(0,0,0,0.8)",
  success: "#4ADE80",
  iconDefault: "#555555",
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
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
