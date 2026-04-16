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
 * Checks: 17 characters, no I/O/Q, valid character set.
 */
export function validateVIN(value: string): string | null {
  if (!value.trim()) return null; // optional field — only validate if provided
  const vin = value.trim().toUpperCase();
  if (vin.length !== 17) return "VIN must be exactly 17 characters";
  if (/[IOQ]/.test(vin)) return "VIN cannot contain I, O, or Q";
  if (!/^[A-HJ-NPR-Z0-9]{17}$/.test(vin)) return "VIN contains invalid characters";
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
