import * as Application from "expo-application";
import { Platform } from "react-native";

export const getDeviceFingerprint = async (): Promise<string> => {
  let fingerprint = "unknown-device";

  if (Platform.OS === "android") {
    fingerprint = (Application as any).androidId || "android-sim";
  } else if (Platform.OS === "ios") {
    fingerprint = (await Application.getIosIdForVendorAsync()) || "ios-sim";
  }

  return fingerprint;
};
