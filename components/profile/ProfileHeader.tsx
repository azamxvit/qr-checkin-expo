import { User } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ProfileHeaderProps {
  name: string;
  role: string;
  theme: any;
}

export const ProfileHeader = ({ name, role, theme }: ProfileHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={[styles.avatarContainer, { borderColor: theme.primary }]}>
        <User size={50} color={theme.primary} strokeWidth={1.5} />
      </View>
      <Text style={[styles.name, { color: theme.text }]}>{name}</Text>
      <Text style={[styles.role, { color: theme.textSecondary }]}>{role}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 32,
    marginTop: 20,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "rgba(0,0,0,0.03)",
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  role: {
    fontSize: 16,
    fontWeight: "500",
  },
});
