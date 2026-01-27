import * as Location from "expo-location";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import {
  MAX_DISTANCE_METERS,
  ORGANIZATIONS_MOCK,
} from "../constants/organizations";
import { getDeviceFingerprint } from "../utils/device";
import { sanitizePhone } from "../utils/validation";

function getDistanceFromLatLonInM(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) {
  const R = 6371e3;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export const useCheckIn = () => {
  const router = useRouter();
  const { qrData } = useLocalSearchParams<{ qrData: string }>();

  const [loading, setLoading] = useState(false);
  const [isOrgLocked, setIsOrgLocked] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    organizationName: "",
  });

  useEffect(() => {
    if (qrData) {
      const detectedOrg = ORGANIZATIONS_MOCK[0];
      if (detectedOrg) {
        setFormData((prev) => ({
          ...prev,
          organizationName: detectedOrg.name,
        }));
        setIsOrgLocked(true);
      }
    }
  }, [qrData]);

  const handleUnlockOrg = () => setIsOrgLocked(false);

  const submitForm = async () => {
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
      // гео
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted")
        throw new Error("Permission to access location was denied");

      const location = await Location.getCurrentPositionAsync({});
      const userCoords = location.coords;
      const selectedOrg = ORGANIZATIONS_MOCK.find(
        (org) => org.name === formData.organizationName,
      );

      if (selectedOrg && selectedOrg.coords) {
        const distance = getDistanceFromLatLonInM(
          userCoords.latitude,
          userCoords.longitude,
          selectedOrg.coords.latitude,
          selectedOrg.coords.longitude,
        );

        console.log(`Distance: ${distance.toFixed(2)}m`);
        if (distance > MAX_DISTANCE_METERS) {
          throw new Error(
            `You are too far from the office (${distance.toFixed(0)}m).`,
          );
        }
      }
      const deviceFingerprint = await getDeviceFingerprint();

      const payload = {
        full_name: formData.fullName,
        email: formData.email,
        phone: sanitizePhone(formData.phone),
        organization_id: selectedOrg?.id || "unknown",
        filial: selectedOrg?.filial || "main",
        registration_token: qrData || "manual-entry",
        device_fingerprint: deviceFingerprint,
        location_lat: userCoords.latitude,
        location_lng: userCoords.longitude,
        status: "pending",
      };

      console.log("Sending:", payload);

      await new Promise((resolve) => setTimeout(resolve, 1500));

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
    ORGANIZATIONS_MOCK,
  };
};
