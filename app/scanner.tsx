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

const { width, height } = Dimensions.get("window");
const SCAN_SIZE = 280;

export default function ScannerScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();

  const [scanned, setScanned] = useState(false);
  const [flash, setFlash] = useState(false);

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

  // функция которая чекает попал ли qr в камеру
  const isQrInBounds = (bounds: any) => {
    if (!bounds) return true;

    const qrCenterX = bounds.origin.x + bounds.size.width / 2;
    const qrCenterY = bounds.origin.y + bounds.size.height / 2;

    const scanAreaMinX = (width - SCAN_SIZE) / 2;
    const scanAreaMaxX = scanAreaMinX + SCAN_SIZE;
    const scanAreaMinY = (height - SCAN_SIZE) / 2;
    const scanAreaMaxY = scanAreaMinY + SCAN_SIZE;

    // проверяет находится qr по центру
    return (
      qrCenterX > scanAreaMinX - 20 &&
      qrCenterX < scanAreaMaxX + 20 &&
      qrCenterY > scanAreaMinY - 20 &&
      qrCenterY < scanAreaMaxY + 20
    );
  };

  const handleBarCodeScanned = (scanningResult: BarcodeScanningResult) => {
    const { data, bounds } = scanningResult;

    if (scanned) return;

    if (!isQrInBounds(bounds)) {
      // Можно раскомментировать для отладки, чтобы видеть координаты
      // console.log("QR ignored (out of bounds)");
      return;
    }

    setScanned(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    try {
      const parsedData = JSON.parse(data);

      if (
        parsedData.type === "employee_registration" ||
        parsedData.type === "office_check"
      ) {
        router.replace({
          pathname: "/form",
          params: { qrData: data },
        });
      } else {
        throw new Error("Неверный тип QR-кода");
      }
    } catch (e) {
      Alert.alert("Ошибка", "QR-код не распознан или находится вне зоны.", [
        { text: "OK", onPress: () => setScanned(false) },
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

        <SafeAreaView style={styles.controlsLayer} pointerEvents="box-none">
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.iconButton}
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
});
