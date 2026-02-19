import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useAppTheme } from "../../hooks/useAppTheme";

interface Props {
  title: string;
  onPress: () => void;
  variant?: "primary" | "outline";
  loading?: boolean;
  disabled?: boolean;
}

export const MyButton = ({
  title,
  onPress,
  variant = "primary",
  loading = false,
  disabled = false,
}: Props) => {
  const { theme } = useAppTheme();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        variant === "primary" && {
          backgroundColor: theme.primary,
          shadowColor: theme.primary,
        },
        variant === "outline" && {
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: theme.primary,
        },
        (disabled || loading) && { opacity: 0.5 },
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text
          style={[
            styles.text,
            variant === "primary" && { color: "#FFFFFF" },
            variant === "outline" && { color: theme.primary },
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});
