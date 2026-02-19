import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Phone, User } from "lucide-react-native";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { MyButton } from "../../components/buttons/MyButton";
import { LockedOrganizationCard } from "../../components/cards/LockedOrganizationCard";
import { FormSkeletonLoader } from "../../components/feedback/FormSkeletonLoader";
import { EmailInput } from "../../components/inputs/EmailInput";
import { MyInput } from "../../components/inputs/MyInput";
import { PhoneInput } from "../../components/inputs/PhoneInput";
import { useAppTheme } from "../../hooks/useAppTheme";
import { useCheckIn } from "../../hooks/useCheckIn";

export default function FormScreen() {
  const router = useRouter();
  const { theme } = useAppTheme();

  const params = useLocalSearchParams();
  const { token, office_point_id } = params as unknown as {
    token: string;
    office_point_id: string;
  };

  const { formData, setFormData, loading, submitForm, isOrgLocked } =
    useCheckIn({
      token,
      officePointId: office_point_id,
    });

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.replace("/qr-form/scanner")}
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
            onChangeText={(t) => setFormData({ ...formData, phone: t })}
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
              organizationName={formData.organizationName || "Verified Point"}
            />
          ) : (
            <View>
              <Text
                style={{ color: "red", textAlign: "center", marginTop: 10 }}
              >
                Ошибка: QR-код не содержит ID точки
              </Text>
            </View>
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
  container: { flex: 1 },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16
  },
  content: {
    padding: 24,
    flexGrow: 1
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 32,
    marginTop: 10,
  },
  form: {
    flex: 1,
    gap: 16
  },
  footer: {
    marginTop: 20,
    marginBottom: 20    
  },
});
