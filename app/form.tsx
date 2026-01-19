import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MyButton } from "../components/MyButton";
import { MyInput } from "../components/MyInput";
import { MySelect } from "../components/MySelect";
import { CheckinTheme as Colors } from "../constants/theme";

const ORGANIZATIONS = ["TCO", "NCOC", "Freedom", "Halyk"];

export default function FormScreen() {
  const router = useRouter();
  const { qrData } = useLocalSearchParams();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    organization: "",
  });

  const handleSubmit = () => {
    console.log("Sending:", { ...formData, qrData });
    router.replace("/success");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Fill details</Text>

        <View style={styles.form}>
          <MyInput
            label="Full Name"
            placeholder="Enter your name"
            value={formData.fullName}
            onChangeText={(t) => setFormData({ ...formData, fullName: t })}
          />
          <MyInput
            label="Phone Number"
            placeholder="Enter your number"
            value={formData.phone}
            keyboardType="phone-pad"
            onChangeText={(t) => setFormData({ ...formData, phone: t })}
          />
          <MyInput
            label="Email"
            placeholder="Enter your email"
            value={formData.email}
            keyboardType="email-address"
            onChangeText={(t) => setFormData({ ...formData, email: t })}
          />

          <MySelect
            label="Organization"
            placeholder="Select organization"
            value={formData.organization}
            options={ORGANIZATIONS}
            onSelect={(val) => setFormData({ ...formData, organization: val })}
          />
        </View>

        <View style={styles.footer}>
          <MyButton title="Submit" onPress={handleSubmit} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 10,
  },
  content: {
    padding: 24,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 32,
    marginTop: 10,
  },
  form: {
    flex: 1,
  },
  footer: {
    marginTop: 20,
    marginBottom: 20,
  },
});
