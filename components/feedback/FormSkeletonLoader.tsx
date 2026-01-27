import React, { useEffect } from "react";
import { Dimensions, StyleSheet, View, useColorScheme } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { CheckinTheme as Colors, DarkTheme } from "../../constants/theme";

const { width } = Dimensions.get("window");

export const FormSkeletonLoader = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const theme = isDark ? DarkTheme : Colors;

  const opacity = useSharedValue(0.5);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.5, { duration: 800, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      true,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  // Цвета заглушек
  const skeletonColor = isDark ? "#2C2C2C" : "#E0E0E0";

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.buttonSkeleton,
          animatedStyle,
          { backgroundColor: skeletonColor },
        ]}
      />
      <Animated.View
        style={[
          styles.textSkeleton,
          animatedStyle,
          { backgroundColor: skeletonColor },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
  },
  buttonSkeleton: {
    width: "100%",
    height: 56,
    borderRadius: 16,
    marginBottom: 16,
  },
  textSkeleton: {
    width: "50%",
    height: 14,
    borderRadius: 4,
  },
});
