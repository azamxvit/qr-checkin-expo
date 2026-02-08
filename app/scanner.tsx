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
import { ScannerOverlay } from "../components/feedback/ScannerOverlay";
import { CheckinTheme as Colors } from "../constants/theme";
import { QrService } from "../services/qrService";

const { width, height } = Dimensions.get("window");
const SCAN_SIZE = 280;

export default function ScannerScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();

  const [scanned, setScanned] = useState(false);
  const [flash, setFlash] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!permission) return <View style={{ flex: 1, backgroundColor: "#000" }} />;
  if (!permission.granted) {
    return (
      <View style={styles.permContainer}>
        <Text style={{ marginBottom: 20, color: "#fff" }}>
          No access to camera
        </Text>
        <TouchableOpacity onPress={requestPermission} style={styles.permButton}>
          <Text style={{ color: "white" }}>Allow Camera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const isQrInBounds = (bounds: any) => {
    if (!bounds) return true;
    const qrCenterX = bounds.origin.x + bounds.size.width / 2;
    const qrCenterY = bounds.origin.y + bounds.size.height / 2;
    const scanAreaMinX = (width - SCAN_SIZE) / 2;
    const scanAreaMaxX = scanAreaMinX + SCAN_SIZE;
    const scanAreaMinY = (height - SCAN_SIZE) / 2;
    const scanAreaMaxY = scanAreaMinY + SCAN_SIZE;

    return (
      qrCenterX > scanAreaMinX - 20 &&
      qrCenterX < scanAreaMaxX + 20 &&
      qrCenterY > scanAreaMinY - 20 &&
      qrCenterY < scanAreaMaxY + 20
    );
  };

  const handleBarCodeScanned = async (
    scanningResult: BarcodeScanningResult,
  ) => {
    const { data, bounds } = scanningResult;

    if (scanned || isProcessing) return;

    if (!isQrInBounds(bounds)) return;

    setScanned(true);
    setIsProcessing(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    try {
      let tokenToCheck = data;
      try {
        const parsedData = JSON.parse(data);
        tokenToCheck =
          parsedData.token || parsedData.registration_token || data;
      } catch (e) {
        tokenToCheck = data;
      }

      // Валидация через сервис
      const validData = await QrService.validateQrToken(tokenToCheck);

      // Переход на форму БЕЗ organizationName
      router.replace({
        pathname: "/form",
        params: {
          token: validData.token,
          office_point_id: validData.office_point_id,
        },
      });
    } catch (error: any) {
      console.error("QR Error:", error);

      Alert.alert("Ошибка QR-кода", error.message || "Невалидный код", [
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
            <ActivityIndicator size="large" color={Colors.primary} />
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
                <Zap size={24} color={Colors.primary} fill={Colors.primary} />
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
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  permContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  permButton: {
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 8,
  },
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
