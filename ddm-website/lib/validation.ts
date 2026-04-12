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
