// utils/decode-spouse-full-name.ts

import { SpouseFullNameProps } from "./format-spouse-full-name";

/**
 * Decode a spouse full name formatted with '-' back into optional name fields.
 * Only handles firstName, middleName, and lastName.
 */
export function decodeSpouseFullName(fullName?: string): SpouseFullNameProps | undefined {
  if (!fullName?.trim()) return undefined;

  const parts = fullName.split(" "); // split by space

  // Ensure at least 2 parts (firstName and lastName)
  while (parts.length < 2) parts.push("");

  const [firstRaw, middleRaw = "", lastRaw = ""] = parts;

  const decodePart = (part: string) => (part ? part.replace(/-/g, " ").trim() : undefined);

  const firstName = decodePart(firstRaw);
  const middleName = decodePart(middleRaw);
  const lastName = decodePart(lastRaw);

  // If no meaningful name exists, return undefined
  if (!firstName && !lastName && !middleName) return undefined;

  return { firstName, middleName, lastName };
}
