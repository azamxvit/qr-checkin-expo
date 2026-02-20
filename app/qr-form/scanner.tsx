import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { ArrowLeft, Zap, ZapOff } from "lucide-react-native";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScannerOverlay } from "../../components/feedback/ScannerOverlay";
import { useAppTheme } from "../../hooks/useAppTheme";
import { QrService } from "../../services/qrService";

const { width, height } = Dimensions.get("window");
const SCAN_SIZE = 280;

export default function ScannerScreen() {
  const router = useRouter();
  const { theme, isDark } = useAppTheme();
  const [permission, requestPermission] = useCameraPermissions();

  const [scanned, setScanned] = useState(false);
  const [flash, setFlash] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!permission) return <View style={{ flex: 1, backgroundColor: "#000" }} />;
  if (!permission.granted) {
    return (
      <View
        style={[styles.permContainer, { backgroundColor: theme.background }]}
      >
        <Text style={{ marginBottom: 20, color: theme.text }}>
          No access to camera
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          style={[styles.permButton, { backgroundColor: theme.primary }]}
        >
          <Text style={{ color: "#FFFFFF" }}>Allow Camera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleBarCodeScanned = async (
    scanningResult: BarcodeScanningResult,
  ) => {
    const { data } = scanningResult;
    if (scanned || isProcessing) return;

    setScanned(true);
    setIsProcessing(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    try {
      let tokenToCheck = data;
      try {
        if (data.trim().startsWith("{") || data.trim().startsWith("[")) {
          const parsedData = JSON.parse(data);
          if (parsedData.token) {
            tokenToCheck = parsedData.token;
          } else if (parsedData.registration_token) {
            tokenToCheck = parsedData.registration_token;
          }
        }
      } catch (parseError) {}

      const validData = await QrService.validateQrToken(tokenToCheck);

      router.replace({
        pathname: "/qr-form/form",
        params: {
          token: validData.token,
          office_point_id: validData.office_point_id,
        },
      });
    } catch (error: any) {
      Alert.alert("Error", error.message || "Invalid QR", [
        {
          text: "OK",
          onPress: () => {
            setScanned(false);
            setIsProcessing(false);
          },
        },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <CameraView
        style={StyleSheet.absoluteFillObject}
        enableTorch={flash}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
      >
        <ScannerOverlay />

        {isProcessing && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color={theme.primary} />
            <Text style={styles.loadingText}>Checking...</Text>
          </View>
        )}

        <SafeAreaView style={styles.controlsLayer} pointerEvents="box-none">
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.iconButton}
              disabled={isProcessing}
            >
              <ArrowLeft size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setFlash(!flash)}
              style={styles.iconButton}
            >
              {flash ? (
                <Zap size={24} color={theme.primary} fill={theme.primary} />
              ) : (
                <ZapOff size={24} color="white" />
              )}
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black" },
  permContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  permButton: { padding: 12, borderRadius: 8 },
  controlsLayer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 20,
    justifyContent: "space-between",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  iconButton: {
    width: 44,
    height: 44,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 30,
  },
  loadingText: {
    color: "white",
    marginTop: 10,
    fontSize: 16,
    fontWeight: "600",
  },
});
