import { LucideIcon } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from "react-native";
import { CheckinTheme as Colors, DarkTheme } from "../../constants/theme";

interface Props {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: "default" | "email-address" | "phone-pad";
  icon?: LucideIcon;
}

export const MyInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
  icon: Icon,
}: Props) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const theme = isDark ? DarkTheme : Colors;

  const [isFocused, setIsFocused] = useState(false);
  const focusAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: isFocused ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused]);

  const borderColor = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.inputBorder, theme.primary],
  });

  const backgroundColor = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: isDark ? ["#121212", "#1E1E1E"] : ["#F8F9FA", "#FFFFFF"],
  });

  const iconOpacityGray = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const iconOpacityBlue = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const webStyle = Platform.select({
    web: { outlineStyle: "none" } as any,
    default: {},
  });

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.text }]}>{label}</Text>

      <Animated.View
        style={[styles.inputContainer, { borderColor, backgroundColor }]}
      >
        {Icon && (
          <View style={styles.iconContainer}>
            <Animated.View style={{ opacity: iconOpacityGray }}>
              <Icon size={20} color={theme.iconDefault || "#A0A0A0"} />
            </Animated.View>

            <Animated.View
              style={[styles.iconOverlay, { opacity: iconOpacityBlue }]}
            >
              <Icon size={20} color={theme.primary} />
            </Animated.View>
          </View>
        )}

        <TextInput
          style={[styles.input, webStyle, { color: theme.text }]}
          placeholder={placeholder}
          placeholderTextColor={theme.textSecondary}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          selectionColor={theme.primary}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: "100%",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    marginLeft: 4,
  },
  inputContainer: {
    height: 56,
    borderWidth: 1.5,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  iconContainer: {
    marginRight: 12,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  iconOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: "100%",
    paddingHorizontal: 0,
  },
});
