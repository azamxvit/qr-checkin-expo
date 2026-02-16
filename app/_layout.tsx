import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

import { ThemeProvider } from "../context/ThemeContext";
import { useAppTheme } from "../hooks/useAppTheme";

function RootNavigator() {
  const { isDark } = useAppTheme();

  return (
    <>
      <StatusBar style={isDark ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          gestureEnabled: true,
          gestureDirection: "horizontal",
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />

        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        <Stack.Screen name="profile-details" options={{ headerShown: false }} />

        <Stack.Screen name="qr-form" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootNavigator />
    </ThemeProvider>
  );
}
