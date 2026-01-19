import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MyButton } from "../components/MyButton";
import { CheckinTheme as Colors } from "../constants/theme";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.spacer} />

        <View style={styles.center}>
          <MyButton
            title="Scan QR Code"
            onPress={() => router.push("/scanner")}
          />
          <Text style={styles.subtitle}>
            Welcome! Scan the QR code to check in
          </Text>
        </View>

        <View style={styles.spacer} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  spacer: {
    flex: 1,
  },
  center: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  subtitle: {
    textAlign: "center",
    color: Colors.textSecondary,
    fontSize: 16,
    marginTop: 8,
    lineHeight: 24,
    maxWidth: "80%",
  },
});
