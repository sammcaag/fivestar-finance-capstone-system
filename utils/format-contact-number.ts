/**
 * Formats a contact number to E.164 format for Philippines
 * e.g., "09123456789" -> "+639123456789"
 *
 * @param contact - The input contact number string (optional)
 * @returns The formatted contact number in E.164, or undefined if input is empty
 */
export function formatContactNumber(contact?: string): string {
  if (!contact?.trim()) return "";

  // Remove all non-numeric characters
  const digitsOnly = contact.replace(/\D/g, "");

  // Convert to E.164 format
  if (digitsOnly.startsWith("0")) {
    return "+63" + digitsOnly.slice(1); // local number
  } else if (digitsOnly.startsWith("63")) {
    return "+" + digitsOnly; // already missing leading '+'
  } else if (digitsOnly.startsWith("+")) {
    return digitsOnly; // already E.164
  }

  // Fallback: add '+' to digits
  return "+" + digitsOnly;
}
