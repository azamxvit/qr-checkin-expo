import { useRouter } from "expo-router";
import { QrCode } from "lucide-react-native";
import React from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MyButton } from "../components/buttons/MyButton";
import { CheckinTheme as Colors, DarkTheme } from "../constants/theme";

export default function WelcomeScreen() {
  const router = useRouter();

  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const theme = isDark ? DarkTheme : Colors;

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
          <QrCode size={64} color={Colors.primary} strokeWidth={2} />
        </View>

        <Text style={[styles.appName, { color: theme.text }]}>KasipQR</Text>
      </View>

      <View style={styles.footer}>
        <MyButton
          title="Scan QR Code"
          onPress={() => router.push("/scanner")}
        />
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Welcome! Scan the QR code to check in
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  appName: {
    fontSize: 32,
    fontWeight: "800",
    letterSpacing: -0.5,
    fontFamily: "Arial",
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 48,
    width: "100%",
  },
  subtitle: {
    textAlign: "center",
    fontSize: 15,
    marginTop: 16,
    lineHeight: 22,
  },
});
