import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function Layout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          contentStyle: { backgroundColor: "#FFFFFF" },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="scanner" />
        <Stack.Screen name="form" />
        <Stack.Screen name="success" />
      </Stack>
    </>
  );
}
