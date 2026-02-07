import { Building2, CheckCircle } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, View, useColorScheme } from "react-native";
import { CheckinTheme, DarkTheme } from "../../constants/theme";

interface LockedOrganizationCardProps {
  organizationName: string;
  label?: string;
}

export const LockedOrganizationCard = ({
  organizationName,
  label = "Organization",
}: LockedOrganizationCardProps) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : CheckinTheme;
  const isDark = colorScheme === "dark";

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.label, { color: theme.text }]}>{label}</Text>

      <View
        style={[
          styles.container,
          {
            backgroundColor: isDark ? "rgba(22, 163, 74, 0.15)" : "#F0FDF4",
            borderColor: isDark ? "#166534" : "#BBF7D0",
          },
        ]}
      >
        <View style={styles.iconContainer}>
          <Building2 size={24} color={isDark ? "#4ADE80" : "#16A34A"} />
        </View>

        <View style={styles.textContainer}>
          <Text
            style={[styles.orgName, { color: isDark ? "#E5E7EB" : "#111827" }]}
          >
            {organizationName}
          </Text>
          <View style={styles.badge}>
            <CheckCircle size={12} color={isDark ? "#4ADE80" : "#16A34A"} />
            <Text
              style={[
                styles.badgeText,
                { color: isDark ? "#4ADE80" : "#16A34A" },
              ]}
            >
              Organization verified by QR
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    marginLeft: 4,
    fontFamily: "Arial",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  iconContainer: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  orgName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    fontFamily: "Arial",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "500",
  },
});
