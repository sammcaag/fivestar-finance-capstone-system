import { decodeFullName } from "./decode-full-name";

export function generateEmail(fullName: string): string {
  const { firstName, lastName } = decodeFullName(fullName);

  // Replace spaces with dots and convert to lowercase
  const first = firstName.toLowerCase().trim().replace(/\s+/g, ".");
  const last = lastName.toLowerCase().trim().replace(/\s+/g, ".");

  return `${last}.${first}@fsfi.com.ph`;
}
