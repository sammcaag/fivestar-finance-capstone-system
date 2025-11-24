// utils/full-name.ts

import { capitalizeFirstLetterInWords } from "./capitalize-first-letter-in-words";

export type FullNameProps = {
  firstName: string;
  middleName?: string;
  lastName: string;
  suffix?: string;
};

export function formatFullName({
  firstName,
  middleName,
  lastName,
  suffix,
}: FullNameProps): string {
  // Helper to capitalize then replace spaces with "-"
  const encodePart = (part?: string | null) =>
    part
      ? capitalizeFirstLetterInWords(part.replace(/\s+/g, " ").trim()).replace(
          /\s/g,
          "-"
        )
      : "";

  // Encode each part
  const first = encodePart(firstName);
  const middle = encodePart(middleName);
  const last = encodePart(lastName);
  const suf = encodePart(suffix);

  const result = [first, middle || "", last, suf || ""].join(" ");
  console.log("Formatted fullName:", result); // <--- debug

  // Always ensure 4 parts, use empty string if a part is missing
  return [first, middle || "", last, suf || ""].join(" ");
}
