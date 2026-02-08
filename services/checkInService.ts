import { CheckInFormData } from "../types/checkIn";
import { getDeviceFingerprint } from "../utils/device";
import { sanitizePhone } from "../utils/validation";
import { supabase } from "./supabase";

interface SubmitParams {
  formData: CheckInFormData;
  token: string;
  office_point_id: string;
}

export const CheckInService = {
  async performCheckIn({ formData, token, office_point_id }: SubmitParams) {
    const deviceFingerprint = await getDeviceFingerprint();

    const payload = {
      office_point_id: office_point_id,
      registration_token: token,
      full_name: formData.fullName,
      phone: sanitizePhone(formData.phone),
      email: formData.email,

      device_fingerprint: deviceFingerprint,

      status: "pending",
    };

    console.log("Отправка сотрудника:", JSON.stringify(payload, null, 2));

    const { data, error } = await supabase
      .from("pending_employees")
      .insert({ ...payload });
    // .select();

    if (error) {
      console.error("Supabase Error:", error.message);
      throw new Error(error.message);
    }

    return data;
  },
};
