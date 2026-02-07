import * as Location from "expo-location";
import { CheckInService } from "../services/checkInService";
import { getDeviceFingerprint } from "../utils/device";

// Мокаем Expo Location
jest.mock("expo-location", () => ({
  requestForegroundPermissionsAsync: jest.fn(),
  getCurrentPositionAsync: jest.fn(),
  Accuracy: {
    Balanced: 3,
  },
}));

jest.mock("../../src/utils/device", () => ({
  getDeviceFingerprint: jest.fn(),
}));

jest.mock("../../src/utils/validation", () => ({
  sanitizePhone: (phone: string) => phone.replace(/\D/g, ""),
}));

describe("CheckInService", () => {
  const mockFormData = {
    fullName: "Azamat",
    phone: "+7 (702) 154 68 36",
    email: "test@gmail.com",
    organizationName: "Magribi Coffee",
  };

  const mockQrPayload = {
    type: "employee_registration",
    organization: "Magribi Coffee",
    token: "test-token-123",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("✅ should successfully return payload with coordinates when permission is granted", async () => {
    (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue(
      {
        status: "granted",
      },
    );

    (Location.getCurrentPositionAsync as jest.Mock).mockResolvedValue({
      coords: {
        latitude: 47.11,
        longitude: 51.89,
      },
    });

    (getDeviceFingerprint as jest.Mock).mockResolvedValue("device-id-123");

    const result = await CheckInService.performCheckIn({
      formData: mockFormData,
      qrPayload: mockQrPayload,
    });

    expect(result.user_lat).toBe(47.11);
    expect(result.user_lng).toBe(51.89);

    expect(result.full_name).toBe("Azamat");
    expect(result.organization).toBe("Magribi Coffee");
    expect(result.qr_token).toBe("test-token-123");

    expect(Location.requestForegroundPermissionsAsync).toHaveBeenCalledTimes(1);
  });

  it("❌ should throw error if location permission is denied", async () => {
    (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue(
      {
        status: "denied",
      },
    );

    await expect(
      CheckInService.performCheckIn({
        formData: mockFormData,
        qrPayload: mockQrPayload,
      }),
    ).rejects.toThrow("Permission to access location was denied");
  });
});
