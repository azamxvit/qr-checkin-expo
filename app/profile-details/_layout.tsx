import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { CheckinTheme, DarkTheme } from "../../constants/theme";

export default function ProfileDetailsLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : CheckinTheme;

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerBackTitle: "Profile",
        title: "",
        animation: "slide_from_right",

        headerStyle: { backgroundColor: theme.background },
        headerTintColor: theme.text,
        headerShadowVisible: false,
        contentStyle: { backgroundColor: theme.background },
      }}
    >
      <Stack.Screen name="personal" options={{ title: "Personal Info" }} />
      <Stack.Screen name="security" options={{ title: "Security & Privacy" }} />
      <Stack.Screen name="support" options={{ title: "Help & Support" }} />
    </Stack>
  );
}
