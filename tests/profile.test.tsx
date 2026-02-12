import { render } from "@testing-library/react-native";
import React from "react";
import ProfileScreen from "../app/(tabs)/profile";

jest.mock("expo-router", () => ({
  useRouter: () => ({ replace: jest.fn() }),
}));

describe("ProfileScreen", () => {
  it("отображает имя пользователя и роль", () => {
    const { getByText } = render(<ProfileScreen />);

    expect(getByText("Azamat")).toBeTruthy();
    expect(getByText("Barista")).toBeTruthy();
  });

  it("отображает пункты меню", () => {
    const { getByText } = render(<ProfileScreen />);

    expect(getByText("Personal Information")).toBeTruthy();
    expect(getByText("Security & Privacy")).toBeTruthy();
    expect(getByText("Help & Support")).toBeTruthy();
  });

  it("рендерится без ошибок с темой", () => {
    const tree = render(<ProfileScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
