export const isValidEmail = (email: string): boolean => {
  return email.includes("@") && email.includes(".") && email.length > 5;
};

export const sanitizePhone = (phone: string): string => {
  return phone.replace(/[()\s-]/g, "");
};
