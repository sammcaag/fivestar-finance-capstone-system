import { suffixOptions } from "@/features/clients/types/client-types";
import { FullNameProps } from "./format-full-name";

export function decodeFullName(fullName: string): FullNameProps {
  const SUFFIXES = new Set(suffixOptions.filter((s) => s.value !== "__NONE__").map((s) => s.value));

  // Split by spaces and replace '-' with ' ' in each part
  const parts = fullName.split(" ").map((p) => p.replace(/-/g, " "));

  let firstName = "";
  let middleName: string | undefined;
  let lastName = "";
  let suffix: string | undefined;

  if (parts.length === 4) {
    // 4 parts: First, Middle, Last, Suffix
    [firstName, middleName, lastName, suffix] = parts;
    if (!SUFFIXES.has(suffix)) {
      lastName = `${lastName} ${suffix}`;
      suffix = undefined;
    }
  } else if (parts.length === 3) {
    firstName = parts[0];
    if (SUFFIXES.has(parts[2])) {
      // Last part is suffix → First, Last, Suffix
      lastName = parts[1];
      suffix = parts[2];
    } else {
      // Last part is not suffix → First, Middle, Last
      middleName = parts[1];
      lastName = parts[2];
    }
  } else if (parts.length === 2) {
    [firstName, lastName] = parts;
  } else if (parts.length === 1) {
    firstName = parts[0];
    lastName = "";
  }

  if (!firstName || !lastName) {
    throw new Error("Decoded firstName and lastName must always be present.");
  }

  return { firstName, middleName, lastName, suffix };
}
