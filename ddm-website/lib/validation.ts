export function validateRequired(value: string, fieldName: string): string | null {
  if (!value.trim()) return `${fieldName} is required`;
  return null;
}

export function validateEmail(value: string): string | null {
  if (!value.trim()) return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
    return "Please enter a valid email address";
  return null;
}

export function validatePhone(value: string): string | null {
  if (!value.trim()) return "Phone number is required";
  if (!/^[\+]?[\d\s\-\(\)]{7,}$/.test(value))
    return "Please enter a valid phone number";
  return null;
}

export function validateMinLength(
  value: string,
  min: number,
  fieldName: string
): string | null {
  if (value.trim().length < min)
    return `${fieldName} must be at least ${min} characters`;
  return null;
}

/**
 * Validate a Vehicle Identification Number (VIN).
 * Checks: 17 characters, no I/O/Q, valid check digit (position 9).
 */
export function validateVIN(value: string): string | null {
  if (!value.trim()) return null; // optional field — only validate if provided
  const vin = value.trim().toUpperCase();
  if (vin.length !== 17) return "VIN must be exactly 17 characters";
  if (/[IOQ]/.test(vin)) return "VIN cannot contain I, O, or Q";
  if (!/^[A-HJ-NPR-Z0-9]{17}$/.test(vin)) return "VIN contains invalid characters";

  // Check digit validation (position 9, index 8)
  const transliteration: Record<string, number> = {
    A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8,
    J: 1, K: 2, L: 3, M: 4, N: 5, P: 7, R: 9,
    S: 2, T: 3, U: 4, V: 5, W: 6, X: 7, Y: 8, Z: 9,
  };
  const weights = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2];

  let sum = 0;
  for (let i = 0; i < 17; i++) {
    const char = vin[i];
    const val = /\d/.test(char) ? parseInt(char, 10) : transliteration[char];
    if (val === undefined) return "VIN contains invalid characters";
    sum += val * weights[i];
  }

  const remainder = sum % 11;
  const checkDigit = remainder === 10 ? "X" : String(remainder);

  if (vin[8] !== checkDigit) return "VIN check digit is invalid — please verify your VIN";
  return null;
}

/** Format a phone number as user types: (555) 123-4567 */
export function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

/** Format SSN as user types: XXX-XX-XXXX */
export function formatSSN(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 9);
  if (digits.length <= 3) return digits;
  if (digits.length <= 5) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`;
}

/** Format mileage with commas: 12500 → 12,500 */
export function formatMileage(value: string): string {
  const digits = value.replace(/\D/g, "");
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
