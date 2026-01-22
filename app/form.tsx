import { useLocalSearchParams, useRouter } from "expo-router";
import { Building2, Mail, Phone, User, X } from "lucide-react-native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
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

import { supabase } from "../lib/supabase";
import { getDeviceFingerprint } from "../utils/device";

const ORGANIZATIONS_MOCK = [
  { name: "TCO", id: "org-uuid-001", filial: "Tengiz Base" },
  { name: "NCOC", id: "org-uuid-002", filial: "Kashagan" },
  { name: "Freedom", id: "org-uuid-003", filial: "Atyrau Branch" },
  { name: "Halyk", id: "org-uuid-004", filial: "Central Office" },
];

export default function FormScreen() {
  const router = useRouter();
  const { qrData } = useLocalSearchParams<{ qrData: string }>();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    organizationName: "",
  });

  const handleSubmit = async () => {
    if (
      !formData.fullName ||
      !formData.phone ||
      !formData.email ||
      !formData.organizationName
    ) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const deviceFingerprint = await getDeviceFingerprint();

      const selectedOrg = ORGANIZATIONS_MOCK.find(
        (org) => org.name === formData.organizationName,
      );

      const payload = {
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        organization_id: selectedOrg?.id || "unknown",
        filial: selectedOrg?.filial || "main",
        registration_token: qrData || "manual-entry",
        device_fingerprint: deviceFingerprint,
        status: "pending",
      };

      console.log("Sending Payload:", payload);

      const { error } = await supabase
        .from("pending_employees")
        .insert([payload]);

      if (error) {
        throw error;
      }

      router.replace("/success");
    } catch (error: any) {
      console.error("Error submitting form:", error);
      Alert.alert("Submission Failed", error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.replace("/scanner")}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <X size={28} color={Colors.text} />
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
            icon={User}
          />
          <MyInput
            label="Phone Number"
            placeholder="Enter your number"
            value={formData.phone}
            keyboardType="phone-pad"
            onChangeText={(t) => setFormData({ ...formData, phone: t })}
            icon={Phone}
          />
          <MyInput
            label="Email"
            placeholder="Enter your email"
            value={formData.email}
            keyboardType="email-address"
            onChangeText={(t) => setFormData({ ...formData, email: t })}
            icon={Mail}
          />

          <MySelect
            label="Organization"
            placeholder="Select organization"
            value={formData.organizationName}
            options={ORGANIZATIONS_MOCK.map((o) => o.name)}
            onSelect={(val) =>
              setFormData({ ...formData, organizationName: val })
            }
            icon={Building2}
          />
        </View>

        <View style={styles.footer}>
          {loading ? (
            <ActivityIndicator size="large" color={Colors.primary} />
          ) : (
            <MyButton title="Submit" onPress={handleSubmit} />
          )}
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
    paddingTop: 16,
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
    fontFamily: "Arial",
  },
  form: {
    flex: 1,
  },
  footer: {
    marginTop: 20,
    marginBottom: 20,
  },
});
