// utils/format-spouse-full-name.ts
import { capitalizeFirstLetterInWords } from "./capitalize-first-letter-in-words";

export type SpouseFullNameProps = {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  suffix?: string;
};

/**
 * Formats the spouse full name by capitalizing each word and replacing spaces with "-"
 * Returns undefined if all fields are empty.
 */
export function formatSpouseFullName({
  firstName,
  middleName,
  lastName,
  suffix,
}: SpouseFullNameProps): string | undefined {
  // Helper to capitalize then replace spaces with "-"
  const encodePart = (part?: string | null) =>
    part ? capitalizeFirstLetterInWords(part.replace(/\s+/g, " ").trim()).replace(/\s/g, "-") : "";

  const first = encodePart(firstName);
  const middle = encodePart(middleName);
  const last = encodePart(lastName);
  const suf = encodePart(suffix);

  // If all fields are empty, return undefined
  if (!first && !middle && !last && !suf) return undefined;

  // Join parts with space
  return [first, middle || "", last, suf || ""].join(" ").trim();
}
