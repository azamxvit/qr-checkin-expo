export interface QrScanData {
  token: string;
  officePointId: string;
  organizationName?: string;
}

export interface CheckInFormData {
  fullName: string;
  phone: string;
  email: string;
  organizationName?: string;
}
