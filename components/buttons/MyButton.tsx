import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { CheckinTheme as Colors } from "../../constants/theme";

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
  return (
    <TouchableOpacity
      style={[
        styles.container,
        variant === "outline" && styles.outlineContainer,
        (disabled || loading) && { opacity: 0.5 },
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={Colors.white} />
      ) : (
        <Text
          style={[styles.text, variant === "outline" && styles.outlineText]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  outlineContainer: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Colors.primary,
    shadowOpacity: 0,
    elevation: 0,
  },
  text: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  outlineText: {
    color: Colors.primary,
  },
});
