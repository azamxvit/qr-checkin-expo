import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { CheckInService } from "../services/checkInService";
import { CheckInFormData, QrPayload } from "../types/checkIn";

export const useCheckIn = () => {
  const router = useRouter();
  const { qrData } = useLocalSearchParams<{ qrData: string }>();

  const [loading, setLoading] = useState(false);
  const [isOrgLocked, setIsOrgLocked] = useState(false);
  const [qrPayload, setQrPayload] = useState<QrPayload | null>(null);

  const [formData, setFormData] = useState<CheckInFormData>({
    fullName: "",
    phone: "",
    email: "",
    organizationName: "",
  });

  // 1. Логика парсинга QR (отделена от бизнес-логики)
  useEffect(() => {
    if (qrData) {
      try {
        const parsed: QrPayload = JSON.parse(qrData);

        if (parsed.organization) {
          setFormData((prev) => ({
            ...prev,
            organizationName: parsed.organization,
          }));
          setQrPayload(parsed);
          setIsOrgLocked(true);
        }
      } catch (e) {
        console.error("QR Parse Error:", e);
        Alert.alert("Error", "Invalid QR Data received");
      }
    }
  }, [qrData]);

  const handleUnlockOrg = () => {
    setIsOrgLocked(false);
    setQrPayload(null);
    setFormData((prev) => ({ ...prev, organizationName: "" }));
  };

  // 2. Сабмит формы вызывает Сервис
  const submitForm = async () => {
    // Валидация (можно тоже вынести, но пока ок здесь)
    if (
      !formData.fullName ||
      !formData.phone ||
      !formData.email ||
      !formData.organizationName
    ) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      // 👇 Вся грязная работа ушла в сервис
      await CheckInService.performCheckIn({
        formData,
        qrPayload,
      });

      router.replace("/success");
    } catch (error: any) {
      Alert.alert("Check-in Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    loading,
    isOrgLocked,
    handleUnlockOrg,
    submitForm,
  };
};
