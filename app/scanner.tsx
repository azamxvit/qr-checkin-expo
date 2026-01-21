import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { ArrowLeft, Zap, ZapOff } from "lucide-react-native";
import React, { useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CheckinTheme as Colors } from "../constants/theme";

export default function ScannerScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [flash, setFlash] = useState(false);

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.permContainer}>
        <Text style={{ marginBottom: 20 }}>No access to camera</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.permButton}>
          <Text style={{ color: "white" }}>Allow Camera</Text>
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
      <StatusBar barStyle="light-content" />
      <CameraView
        style={StyleSheet.absoluteFillObject}
        enableTorch={flash}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
      >
        <View style={styles.overlay}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => router.replace("/")}
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

          <View style={styles.middleContainer}>
            <View style={styles.sideOverlay} />
            <View style={styles.scanFrame}>
              <View style={styles.laser} />

              <View style={[styles.corner, styles.topLeft]} />
              <View style={[styles.corner, styles.topRight]} />
              <View style={[styles.corner, styles.bottomLeft]} />
              <View style={[styles.corner, styles.bottomRight]} />
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
  permContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  permButton: {
    backgroundColor: Colors.primary,
    padding: 12,
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
    alignItems: "flex-start",
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
    justifyContent: "center",
    position: "relative",
  },
  laser: {
    width: "100%",
    height: 2,
    backgroundColor: Colors.primary,
    opacity: 0.7,
  },
  corner: {
    position: "absolute",
    width: 30,
    height: 30,
    borderColor: Colors.primary,
    borderWidth: 4,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderBottomWidth: 0,
    borderRightWidth: 0,
    borderTopLeftRadius: 20,
  },
  topRight: {
    top: 0,
    right: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderTopRightRadius: 20,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomLeftRadius: 20,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderBottomRightRadius: 20,
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
    justifyContent: "center",
    alignItems: "center",
  },
});
