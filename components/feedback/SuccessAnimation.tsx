import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle, Path } from "react-native-svg";
import { CheckinTheme as Colors } from "../../constants/theme";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedPath = Animated.createAnimatedComponent(Path);

const CIRCLE_LENGTH = 1000;
const CHECK_LENGTH = 100;

export const SuccessAnimation = () => {
  const circleProgress = useSharedValue(0);
  const checkProgress = useSharedValue(0);

  useEffect(() => {
    circleProgress.value = withTiming(1, {
      duration: 800,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });

    checkProgress.value = withDelay(
      500,
      withTiming(1, {
        duration: 500,
        easing: Easing.out(Easing.back(1.5)),
      }),
    );
  }, []);

  const animatedCircleProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - circleProgress.value),
  }));

  const animatedCheckProps = useAnimatedProps(() => ({
    strokeDashoffset: CHECK_LENGTH * (1 - checkProgress.value),
    opacity: checkProgress.value,
  }));

  return (
    <View style={styles.container}>
      <Svg width={150} height={150} viewBox="0 0 100 100">
        <AnimatedCircle
          cx="50"
          cy="50"
          r="45"
          stroke={Colors.success || "#22C55E"}
          strokeWidth="5"
          fill="transparent"
          strokeDasharray={CIRCLE_LENGTH}
          strokeLinecap="round"
          animatedProps={animatedCircleProps}
          rotation="-90"
          origin="50, 50"
        />

        <AnimatedPath
          d="M28 50 L45 68 L75 35"
          stroke={Colors.success || "#22C55E"}
          strokeWidth="6"
          fill="transparent"
          strokeDasharray={CHECK_LENGTH}
          strokeLinecap="round"
          strokeLinejoin="round"
          animatedProps={animatedCheckProps}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
