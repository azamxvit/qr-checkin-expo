import { ChevronRight } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ProfileMenuItemProps {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
  isDestructive?: boolean;
  theme: any;
}

export const ProfileMenuItem = ({
  icon,
  label,
  onPress,
  isDestructive,
  theme,
}: ProfileMenuItemProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor:
            theme.background === "#121212" ? "#1E1E1E" : "#F9FAFB",
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.leftContent}>
        {icon}
        <Text
          style={[
            styles.label,
            { color: isDestructive ? "#EF4444" : theme.text },
          ]}
        >
          {label}
        </Text>
      </View>

      {!isDestructive && <ChevronRight size={20} color={theme.textSecondary} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    marginBottom: 12,
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
  },
});
