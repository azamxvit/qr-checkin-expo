import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <>
      <StatusBar style={isDark ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade",
        }}
      >
        {/* Стартовый экран */}
        <Stack.Screen name="index" options={{ headerShown: false }} />

        {/* Главный экран с табами */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* Модальное окно сканера */}
        <Stack.Screen
          name="scanner"
          options={{
            presentation: "modal",
            headerShown: false,
            animation: "slide_from_bottom",
          }}
        />

        {/* Форма и экран успеха */}
        <Stack.Screen
          name="form"
          options={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="success"
          options={{
            headerShown: false,
            animation: "fade",
          }}
        />

        {/* Модалка */}
        <Stack.Screen
          name="modal"
          options={{
            presentation: "modal",
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
}
