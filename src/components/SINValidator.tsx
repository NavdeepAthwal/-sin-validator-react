import React, { useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

interface ValidationResult {
  isValid: boolean;
  message: string;
}

// Function to validate SIN using given rules
const validateSIN = (sinInput: string): ValidationResult => {
  // Remove all non-digit characters
  const digitsOnly = sinInput.replace(/\D/g, "");

  // Rule 1: Check digit count
  // Ensures that the SIN consists of exactly 9 digits.
  if (digitsOnly.length !== 9) {
    return { isValid: false, message: "SIN must contain exactly 9 digits." };
  }

  // Convert string to array of numbers
  const digits = [...digitsOnly].map(Number);

  // Luhn Algorithm using reduce. The reduce method iterates over each digit in the digits array
  const sum = digits.reduce((accumulator, currentDigit, index) => {
    let digit = currentDigit;
    // Double every second digit.The condition (index + 1) % 2 === 0 checks if the digit is in an even position.
    // If the digit is in an even position, it's doubled.
    if ((index + 1) % 2 === 0) {
      digit *= 2;
      if (digit > 9) digit -= 9; //If the result of doubling is greater than 9, subtract 9 from it. This is equivalent to adding the two digits of the product
    }
    return accumulator + digit; //the processed digit is added to the accumulator, which starts at 0.
  }, 0);

  // Check if the calculated sum satisfies the Luhn checksum condition
  const isValid = sum % 10 === 0;

  const message = isValid
    ? "SIN is valid."
    : "SIN is invalid based on checksum.";

  return { isValid, message };
};

const SINValidator: React.FC = () => {
  const [sin, setSin] = useState<string>("");
  const [result, setResult] = useState<ValidationResult | null>(null);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page reload
    const validation = validateSIN(sin);
    setResult(validation);
  };

  return (
    <form onSubmit={handleSubmit} className="sin-form">
      <label htmlFor="sin-input">Enter your SIN:</label>
      <input
        type="text"
        id="sin-input"
        name="sin"
        placeholder="e.g., 123-456-789"
        value={sin}
        onChange={(e) => setSin(e.target.value)}
        required
        maxLength={11} // To accommodate hyphens if added
      />
      <button type="submit">Validate</button>
      {result && (
        <div
          className={`result-message ${result.isValid ? "valid" : "invalid"}`}
        >
          {result.isValid ? <FaCheckCircle /> : <FaTimesCircle />}

          <span>{result.message}</span>
        </div>
      )}
    </form>
  );
};

export { validateSIN, SINValidator }; // Export validateSIN function for testing
export default SINValidator;
