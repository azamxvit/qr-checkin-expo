import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Alert } from "react-native";
import SettingsScreen from "../app/(tabs)/settings";

jest.mock("expo-router", () => ({
  useRouter: () => ({
    replace: jest.fn(),
    push: jest.fn(),
  }),
}));

const mockSetThemeMode = jest.fn();
jest.mock("../context/ThemeContext", () => ({
  useThemeContext: () => ({
    themeMode: "system",
    resolvedColorScheme: "light",
    setThemeMode: mockSetThemeMode,
  }),
}));

const mockSignOut = jest.fn(() => Promise.resolve({ error: null }));
jest.mock("../services/supabase", () => ({
  supabase: {
    auth: {
      signOut: mockSignOut,
    },
  },
}));

jest.spyOn(Alert, "alert");

describe("SettingsScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("рендерится корректно", () => {
    const { getByText } = render(<SettingsScreen />);

    expect(getByText("Settings")).toBeTruthy();
    expect(getByText("App")).toBeTruthy();
    expect(getByText("Account")).toBeTruthy();
    expect(getByText("Notifications")).toBeTruthy();
  });

  it("отображает текущий режим темы", () => {
    const { getByText } = render(<SettingsScreen />);

    expect(getByText("Automatic")).toBeTruthy();
  });

  it("меняет состояние свитча уведомлений", () => {
    const { getByRole } = render(<SettingsScreen />);

    const notificationsText = getByRole("switch");
    expect(notificationsText.props.value).toBe(true);

    fireEvent(notificationsText, "valueChange", false);
  });

  it("вызывает Alert при нажатии на Log Out", () => {
    const { getByText } = render(<SettingsScreen />);

    const logoutBtn = getByText("Log Out");
    fireEvent.press(logoutBtn);

    expect(Alert.alert).toHaveBeenCalledWith(
      "Log Out",
      "Are you sure you want to log out?",
      expect.any(Array),
    );
  });

  it("вызывает supabase.signOut при подтверждении выхода", async () => {
    const { getByText } = render(<SettingsScreen />);

    fireEvent.press(getByText("Log Out"));

    const alertButtons = (Alert.alert as jest.Mock).mock.calls[0][2];
    const logoutConfirmBtn = alertButtons[1];

    await logoutConfirmBtn.onPress();

    expect(mockSignOut).toHaveBeenCalled();
  });
});
