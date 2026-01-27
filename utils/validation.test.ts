import { isValidEmail, sanitizePhone } from "./validation";

describe("Validation Utils", () => {
  describe("isValidEmail", () => {
    it("should return true for valid email", () => {
      expect(isValidEmail("daniyar@gmail.com")).toBe(true);
    });

    it("should return false if @ is missing", () => {
      expect(isValidEmail("daniyargmail.com")).toBe(false);
    });

    it("should return false for empty string", () => {
      expect(isValidEmail("")).toBe(false);
    });
  });

  describe("sanitizePhone", () => {
    it("should remove formatting characters", () => {
      const input = "+7 (701) 123-45-67";
      const expected = "+77011234567";

      expect(sanitizePhone(input)).toBe(expected);
    });

    it("should keep clean number as is", () => {
      expect(sanitizePhone("+77011234567")).toBe("+77011234567");
    });
  });
});
