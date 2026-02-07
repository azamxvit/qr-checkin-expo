import { MyButton } from "@/components/buttons/MyButton";
import { useRouter } from "expo-router";
import { ArrowLeft, Building2, Phone, User } from "lucide-react-native";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LockedOrganizationCard } from "../components/cards/LockedOrganizationCard";
import { FormSkeletonLoader } from "../components/feedback/FormSkeletonLoader";
import { EmailInput } from "../components/inputs/EmailInput";
import { MyInput } from "../components/inputs/MyInput";
import { PhoneInput } from "../components/inputs/PhoneInput";

import { CheckinTheme as Colors, DarkTheme } from "../constants/theme";
import { useCheckIn } from "../hooks/useCheckIn";

export default function FormScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : Colors;

  const { formData, setFormData, loading, submitForm, isOrgLocked } =
    useCheckIn();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.replace("/scanner")}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <ArrowLeft size={28} color={theme.text} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={[styles.title, { color: theme.text }]}>Form</Text>

        <View style={styles.form}>
          <MyInput
            label="Full Name"
            placeholder="Enter your name"
            value={formData.fullName}
            onChangeText={(t) => setFormData({ ...formData, fullName: t })}
            icon={User}
          />

          <PhoneInput
            label="Phone Number"
            value={formData.phone}
            onChangeText={(formatted) =>
              setFormData({ ...formData, phone: formatted })
            }
            icon={Phone}
          />

          <EmailInput
            label="Email"
            placeholder="Enter your email"
            value={formData.email}
            onChangeText={(t) => setFormData({ ...formData, email: t })}
          />

          {isOrgLocked ? (
            <LockedOrganizationCard
              organizationName={formData.organizationName}
            />
          ) : (
            <>
              <MyInput
                label="Organization"
                placeholder="Scan QR code to get organization"
                value={formData.organizationName}
                icon={Building2}
                editable={false}
              />
              <Text
                style={{
                  color: theme.textSecondary,
                  fontSize: 12,
                  marginTop: 4,
                }}
              >
                * Organization is required. Please scan the QR code.
              </Text>
            </>
          )}

          <View style={{ height: 10 }} />
        </View>

        <View style={styles.footer}>
          {loading ? (
            <FormSkeletonLoader />
          ) : (
            <MyButton
              title="Submit"
              onPress={submitForm}
              disabled={!isOrgLocked}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
