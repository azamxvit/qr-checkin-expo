import React, { useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { CheckinTheme } from "../../constants/theme";

const { width } = Dimensions.get("window");
const SCAN_SIZE = width * 0.7;

export const ScannerOverlay = () => {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withRepeat(
      withSequence(
        withTiming(SCAN_SIZE, { duration: 1500, easing: Easing.linear }),
        withTiming(0, { duration: 1500, easing: Easing.linear }),
      ),
      -1,
      true,
    );
  }, []);

  const animatedLineStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <View style={styles.overlay}>
      {/* Верхнее затемнение */}
      <View style={styles.topOverlay}>
        <Text style={styles.instructionText}>Scan QR Code to Check In</Text>
      </View>

      <View style={styles.middleContainer}>
        {/* Левое затемнение */}
        <View style={styles.sideOverlay} />

        {/* Прозрачное окно сканирования */}
        <View style={styles.scanWindow}>
          {/* Декоративные уголки */}
          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />

          {/* Анимированный лазер */}
          <Animated.View style={[styles.scanLine, animatedLineStyle]} />
        </View>

        {/* Правое затемнение */}
        <View style={styles.sideOverlay} />
      </View>

      {/* Нижнее затемнение */}
      <View style={styles.bottomOverlay} />
    </View>
  );
};

const overlayColor = "rgba(0,0,0,0.6)";
const borderColor = CheckinTheme.primary;

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
  },
  topOverlay: {
    flex: 1,
    backgroundColor: overlayColor,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  bottomOverlay: {
    flex: 1,
    backgroundColor: overlayColor,
  },
  middleContainer: {
    flexDirection: "row",
    height: SCAN_SIZE,
  },
  sideOverlay: {
    flex: 1,
    backgroundColor: overlayColor,
  },
  scanWindow: {
    width: SCAN_SIZE,
    height: SCAN_SIZE,
    overflow: "hidden",
    position: "relative",
  },
  instructionText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 20,
    opacity: 0.9,
  },
  scanLine: {
    width: "100%",
    height: 3,
    backgroundColor: borderColor,
    shadowColor: borderColor,
    shadowOpacity: 0.8,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    borderRadius: 2,
  },
  corner: {
    position: "absolute",
    width: 25,
    height: 25,
    borderColor: borderColor,
    borderWidth: 4,
    borderRadius: 4,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderBottomWidth: 0,
    borderRightWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
  },
});
