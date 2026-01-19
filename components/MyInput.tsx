import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { CheckinTheme as Colors } from "../constants/theme";

interface Props {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: "default" | "email-address" | "phone-pad";
}

export const MyInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
}: Props) => {
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
    outputRange: [Colors.inputBorder, Colors.primary],
  });

  const backgroundColor = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#F8F9FA", "#FFFFFF"],
  });

  const webStyle = Platform.select({
    //чтобы убрать злосчастную желтую рамку на инпутах
    web: {
      outlineStyle: "none",
      boxShadow: "none",
    } as any,
    default: {},
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <Animated.View
        style={[styles.inputContainer, { borderColor, backgroundColor }]}
      >
        <TextInput
          style={[
            styles.input,
            webStyle, // обьект злоcчастного
          ]}
          placeholder={placeholder}
          placeholderTextColor="#A0A0A0"
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          selectionColor={Colors.primary}
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
    color: Colors.text,
    marginBottom: 8,
    marginLeft: 4,
  },
  // Контейнер теперь отвечает за рамку и фон
  inputContainer: {
    height: 56,
    borderWidth: 2,
    borderRadius: 16,
    justifyContent: "center",
  },
  // Сам инпут теперь прозрачный и занимает все место внутри контейнера
  input: {
    flex: 1,
    paddingHorizontal: 16,
    fontSize: 16,
    color: Colors.text,
    height: "100%",
  },
});
