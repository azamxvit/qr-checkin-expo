import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MyButton } from "../components/MyButton";
import { CheckinTheme as Colors } from "../constants/theme";

export default function SuccessScreen() {
  const router = useRouter();

  const handleClose = () => {
    router.dismissAll();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="checkmark" size={60} color={Colors.primary} />
        </View>

        <Text style={styles.title}>
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
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 24,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#F0F4F8",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
    textAlign: "center",
    marginBottom: 12,
    lineHeight: 34,
    maxWidth: "80%",
  },
  footer: {
    marginBottom: 20,
  },
});
