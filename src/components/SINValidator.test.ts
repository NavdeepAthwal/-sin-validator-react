import { validateSIN } from "./SINValidator";

describe("validateSIN", () => {
  test("valid SIN with spaces", () => {
    const result = validateSIN("046 454 286");
    expect(result.isValid).toBe(true);
    expect(result.message).toBe("SIN is valid.");
  });

  test("valid SIN with hyphens", () => {
    const result = validateSIN("130-692-544");
    expect(result.isValid).toBe(true);
    expect(result.message).toBe("SIN is valid.");
  });

  test("valid SIN without separators", () => {
    const result = validateSIN("046454286");
    expect(result.isValid).toBe(true);
    expect(result.message).toBe("SIN is valid.");
  });

  test("invalid SIN checksum", () => {
    const result = validateSIN("123-456-789");
    expect(result.isValid).toBe(false);
    expect(result.message).toBe("SIN is invalid based on checksum.");
  });

  test("invalid SIN length", () => {
    const result = validateSIN("12345678");
    expect(result.isValid).toBe(false);
    expect(result.message).toBe("SIN must contain exactly 9 digits.");
  });

  test("invalid SIN with non-digit characters", () => {
    const result = validateSIN("123-45A-789");
    expect(result.isValid).toBe(false);
    expect(result.message).toBe("SIN must contain exactly 9 digits.");
  });
});
