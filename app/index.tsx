import { useRouter } from "expo-router";
import { QrCode } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MyButton } from "../components/MyButton";
import { CheckinTheme as Colors } from "../constants/theme";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centerContent}>
        <View style={styles.logoContainer}>
          <QrCode size={64} color={Colors.primary} strokeWidth={2} />
        </View>
        <Text style={styles.appName}>QR Tekser</Text>
      </View>

      <View style={styles.footer}>
        <MyButton
          title="Scan QR Code"
          onPress={() => router.push("/scanner")}
        />
        <Text style={styles.subtitle}>
          Welcome! Scan the QR code to check in
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    width: 120,
    height: 120,
    backgroundColor: "#F0F6FE",
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  appName: {
    fontSize: 32,
    fontWeight: "800",
    color: Colors.text,
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
    color: Colors.textSecondary,
    fontSize: 15,
    marginTop: 16,
    lineHeight: 22,
  },
});
