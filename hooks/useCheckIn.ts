import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";
import { CheckInService } from "../services/checkInService";
import { CheckInFormData } from "../types/checkIn";

interface UseCheckInProps {
  token?: string;
  officePointId?: string;
}

export const useCheckIn = ({ token, officePointId }: UseCheckInProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const isLocked = !!officePointId && !!token;

  const [formData, setFormData] = useState<CheckInFormData>({
    fullName: "",
    phone: "",
    email: "",
    organizationName: isLocked ? "Verified Point" : "",
  });

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      Alert.alert("Ошибка", "Введите имя");
      return false;
    }
    if (!formData.phone.trim()) {
      Alert.alert("Ошибка", "Введите телефон");
      return false;
    }
    if (!token || !officePointId) {
      Alert.alert("Ошибка", "Данные QR-кода потеряны. Отсканируйте заново.");
      return false;
    }
    return true;
  };

  const submitForm = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await CheckInService.performCheckIn({
        formData,
        token: token!,
        office_point_id: officePointId!,
      });

      Alert.alert("Успех", "Вы успешно зарегистрировались!", [
        { text: "OK", onPress: () => router.replace("/") },
      ]);
    } catch (error: any) {
      Alert.alert("Ошибка", error.message || "Не удалось отправить данные");
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    loading,
    submitForm,
    isOrgLocked: isLocked,
  };
};
