// utils/full-name.ts
export function formatFullName({
  firstName,
  middleName,
  lastName,
  suffix,
}: {
  firstName: string;
  middleName?: string | null;
  lastName: string;
  suffix?: string | null;
}): string {
  // Start with first and last name as mandatory
  const parts = [firstName];

  // Only add middle name if it exists and is not empty
  if (middleName?.trim()) {
    parts.push(middleName.trim());
  }

  // Add last name (mandatory)
  parts.push(lastName);

  // Add suffix if it exists and is not empty
  if (suffix?.trim()) {
    parts.push(suffix.trim());
  }

  // Join all parts with space
  return parts.join(" ");
}
