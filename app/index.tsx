import { useRouter } from "expo-router";
import { QrCode } from "lucide-react-native";
import React, { useEffect } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CheckinTheme, DarkTheme } from "../constants/theme";

export default function SplashScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const theme = isDark ? DarkTheme : CheckinTheme;

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/(tabs)/profile");
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <View style={styles.centerContent}>
        <View
          style={[
            styles.logoContainer,
            { backgroundColor: isDark ? "#1E1E1E" : "#F3F4F6" },
          ]}
        >
          {/* Логотип красным цветом */}
          <QrCode size={80} color={CheckinTheme.primary} strokeWidth={2.5} />
        </View>

        <Text style={[styles.appName, { color: theme.text }]}>KasipQR</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centerContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    width: 140,
    height: 140,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  appName: {
    fontSize: 36,
    fontWeight: "800",
    letterSpacing: -0.5,
    fontFamily: "System",
  },
});
