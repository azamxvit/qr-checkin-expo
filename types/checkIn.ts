// Этот интерфейс теперь главный. Он поддерживает и старый, и новый формат QR.
export interface QrPayload {
  // Общие поля
  type: string; // "employee_registration" или "office_check"
  token: string; // uuid
  organization: string; // Название организации

  // Поля нового формата (от ментора)
  expires_at?: string;

  // Поля старого формата (оставляем необязательными, чтобы старый код не ломался)
  office_name?: string;
  address?: string;
}

// Тип для данных формы
export interface CheckInFormData {
  fullName: string;
  phone: string;
  email: string;
  organizationName: string;
}
