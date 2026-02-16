import { useRouter } from "expo-router";
import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MyButton } from "../../components/buttons/MyButton";
import { SuccessAnimation } from "../../components/feedback/SuccessAnimation";
import { useAppTheme } from "../../hooks/useAppTheme"; // ✅

export default function SuccessScreen() {
  const router = useRouter();
  const { theme, isDark } = useAppTheme(); // ✅

  const handleClose = () => {
    router.dismissAll();
    router.replace("/(tabs)/profile");
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <View style={styles.content}>
        <View style={styles.animContainer}>
          <SuccessAnimation />
        </View>

        <Text style={[styles.title, { color: theme.text }]}>Checked In!</Text>

        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Thank you, you have successfully checked in!
        </Text>
      </View>

      <View style={styles.footer}>
        <MyButton title="Close" onPress={handleClose} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  content: { flex: 1, justifyContent: "center", alignItems: "center" },
  animContainer: {
    marginBottom: 32,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    maxWidth: "80%",
    lineHeight: 22,
  },
  footer: { marginBottom: 20 },
});
