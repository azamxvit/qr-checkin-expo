import { Check, Mail } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAppTheme } from "../../hooks/useAppTheme";
import { isValidEmail } from "../../utils/validation";

interface Props {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

const POPULAR_DOMAINS = [
  "gmail.com",
  "mail.ru",
  "icloud.com",
  "yandex.kz",
  "outlook.com",
];

export const EmailInput = ({
  label,
  placeholder,
  value,
  onChangeText,
}: Props) => {
  const { theme, isDark } = useAppTheme();

  const [isFocused, setIsFocused] = useState(false);
  const isValid = isValidEmail(value);
  const showSuggestions = value.includes("@") && !isValid;
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

  const handleSuggestionPress = (domain: string) => {
    const [name] = value.split("@");
    onChangeText(`${name}@${domain}`);
  };

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
        <View style={styles.iconContainer}>
          {isValid ? (
            <Check size={20} color={theme.colors.iconGreen} />
          ) : (
            <>
              <Animated.View style={{ opacity: iconOpacityGray }}>
                <Mail size={20} color={theme.colors?.iconGray || "#A0A0A0"} />
              </Animated.View>
              <Animated.View
                style={[styles.iconOverlay, { opacity: iconOpacityBlue }]}
              >
                <Mail size={20} color={theme.primary} />
              </Animated.View>
            </>
          )}
        </View>

        <TextInput
          style={[styles.input, webStyle, { color: theme.text }]}
          placeholder={placeholder}
          placeholderTextColor={theme.textSecondary}
          value={value}
          onChangeText={onChangeText}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          selectionColor={theme.primary}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </Animated.View>

      {showSuggestions && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.suggestionsContainer}
          contentContainerStyle={{ paddingRight: 20 }}
          keyboardShouldPersistTaps="always"
          nestedScrollEnabled={true}
        >
          {POPULAR_DOMAINS.map((domain) => (
            <TouchableOpacity
              key={domain}
              style={[
                styles.chip,
                {
                  backgroundColor: isDark ? "#2C2C2C" : "#F3F4F6",
                  borderColor: isDark ? "#444" : "transparent",
                },
              ]}
              onPress={() => handleSuggestionPress(domain)}
              activeOpacity={0.7}
            >
              <Text style={[styles.chipText, { color: theme.text }]}>
                @{domain}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
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
  suggestionsContainer: {
    marginTop: 8,
    flexDirection: "row",
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 13,
    fontWeight: "600",
  },
});
