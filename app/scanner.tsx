import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CheckinTheme as Colors } from "../constants/theme";

export default function ScannerScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [flash, setFlash] = useState(false);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>Нужен доступ к камере</Text>
        <TouchableOpacity
          onPress={requestPermission}
          style={styles.permissionButton}
        >
          <Text style={{ color: "white" }}>Разрешить</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (scanned) return;
    setScanned(true);
    router.replace({ pathname: "/form", params: { qrData: data } });
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        enableTorch={flash}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
      >
        <View style={styles.overlay}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.iconButton}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setFlash(!flash)}
              style={styles.iconButton}
            >
              <Ionicons
                name={flash ? "flash" : "flash-off"}
                size={24}
                color="white"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.middleContainer}>
            <View style={styles.sideOverlay} />
            <View style={styles.scanFrame}>
              {/*Алмас лазерная линия для красоты XD */}
              <View style={styles.laser} />
            </View>
            <View style={styles.sideOverlay} />
          </View>

          <View style={styles.bottomOverlay}>
            <Text style={styles.text}>Point your camera at the QR code</Text>
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  permissionText: {
    fontSize: 16,
    marginBottom: 20,
  },
  permissionButton: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 8,
  },
  overlay: {
    flex: 1,
  },
  header: {
    flex: 1,
    backgroundColor: Colors.overlay,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  middleContainer: {
    flexDirection: "row",
    height: 280,
  },
  sideOverlay: {
    flex: 1,
    backgroundColor: Colors.overlay,
  },
  scanFrame: {
    width: 280,
    height: 280,
    borderColor: Colors.primary,
    borderWidth: 4,
    borderRadius: 24,
    backgroundColor: "transparent",
    justifyContent: "center",
    shadowColor: Colors.primary,
    shadowRadius: 20,
    shadowOpacity: 0.6,
  },
  laser: {
    width: "100%",
    height: 2,
    backgroundColor: Colors.primary,
    opacity: 0.7,
  },
  bottomOverlay: {
    flex: 1,
    backgroundColor: Colors.overlay,
    alignItems: "center",
    paddingTop: 40,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 20,
  },
  iconButton: {
    padding: 12,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 50,
  },
});
