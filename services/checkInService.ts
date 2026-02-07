import * as Location from "expo-location";
import { CheckInFormData, QrPayload } from "../types/checkIn";
import { getDeviceFingerprint } from "../utils/device";
import { sanitizePhone } from "../utils/validation";

// Дистанция проверки (если понадобится валидация на фронте)
const MAX_DISTANCE_METERS = 100;

interface SubmitParams {
  formData: CheckInFormData;
  qrPayload: QrPayload | null;
}

export const CheckInService = {
  async getUserLocation() {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      throw new Error(
        "Permission to access location was denied. Please enable it in settings.",
      );
    }

    return await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });
  },

  async performCheckIn({ formData, qrPayload }: SubmitParams) {
    // Получаем Гео и DeviceID параллельно
    const [location, deviceFingerprint] = await Promise.all([
      this.getUserLocation(),
      getDeviceFingerprint(),
    ]);

    const payload = {
      full_name: formData.fullName,
      email: formData.email,
      phone: sanitizePhone(formData.phone),
      organization: formData.organizationName,

      qr_token: qrPayload?.token || null,
      qr_type: qrPayload?.type || "manual_entry",

      device_fingerprint: deviceFingerprint,

      user_lat: location.coords.latitude,
      user_lng: location.coords.longitude,

      timestamp: new Date().toISOString(),
    };

    console.log(
      "🚀 Service Sending (Real Geo):",
      JSON.stringify(payload, null, 2),
    );

    await new Promise((resolve) => setTimeout(resolve, 1500));

    return payload;
  },
};
