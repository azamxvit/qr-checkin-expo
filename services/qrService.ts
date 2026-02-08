import { QrCodeRecord } from "../types/db";
import { supabase } from "./supabase";

export const QrService = {
  async validateQrToken(token: string) {
    console.log("Проверяем токен в БД:", token);

    const { data, error } = await supabase
      .from("registration_qr_codes")
      .select("*")
      .eq("token", token)
      .single();

    if (error || !data) {
      console.error("❌ QR не найден в базе:", error);
      throw new Error("QR-код недействителен или не найден.");
    }

    const qrRecord = data as QrCodeRecord;

    if (!qrRecord.is_active) {
      throw new Error("Этот QR-код был деактивирован.");
    }

    const now = new Date();
    const expiresAt = new Date(qrRecord.expires_at);

    if (now > expiresAt) {
      throw new Error("Срок действия этого QR-кода истек.");
    }

    return {
      isValid: true,
      office_point_id: qrRecord.office_point_id,
      token: qrRecord.token,
    };
  },
};
