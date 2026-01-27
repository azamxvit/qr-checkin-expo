import { Building2, CheckCircle2, Edit2 } from "lucide-react-native";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { CheckinTheme as Colors, DarkTheme } from "../../constants/theme";

interface Props {
  organizationName: string;
  onUnlock: () => void;
}

export const LockedOrganizationCard = ({
  organizationName,
  onUnlock,
}: Props) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const theme = isDark ? DarkTheme : Colors;

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.label, { color: theme.text }]}>Organization</Text>

      <View
        style={[
          styles.container,
          {
            borderColor: theme.success,
            backgroundColor: isDark ? "#1a2e1a" : "#F0FDF4",
          },
        ]}
      >
        <View style={styles.header}>
          <View style={styles.row}>
            <Building2
              size={20}
              color={theme.success}
              style={{ marginRight: 10 }}
            />
            <Text style={[styles.orgName, { color: theme.text }]}>
              {organizationName}
            </Text>
          </View>

          <TouchableOpacity onPress={onUnlock} style={styles.editButton}>
            <Edit2 size={16} color={theme.textSecondary} />
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <CheckCircle2
            size={12}
            color={theme.success}
            style={{ marginRight: 4 }}
          />
          <Text style={[styles.badgeText, { color: theme.success }]}>
            Организация определена QR-кодом
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
    width: "100%",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    marginLeft: 4,
  },
  container: {
    borderWidth: 1.5,
    borderRadius: 16,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  orgName: {
    fontSize: 18,
    fontWeight: "600",
  },
  editButton: {
    padding: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "500",
  },
});
