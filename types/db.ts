export interface QrCodeRecord {
  id: string;
  office_point_id: string;
  token: string;
  expires_at: string;
  is_active: boolean;
  //   organizations?: {
  //     name: string;
  //   };
}

export interface InPayloadRequest {
  full_name: string;
  phone: string;
  email: string;
  token: string;
  office_point_id: string;
  device_fingerprint: string;
  status: "pending";
}
