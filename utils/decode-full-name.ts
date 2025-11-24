import { suffixOptions } from "@/features/clients/types/client-types";
import { FullNameProps } from "./format-full-name";

export function decodeFullName(fullName: string): FullNameProps {
  const SUFFIXES = new Set(
    suffixOptions.filter((s) => s.value !== "__NONE__").map((s) => s.value)
  );

  const parts = fullName.split(" ");

  // Ensure at least 4 parts
  while (parts.length < 4) parts.push("");

  const firstName = parts[0].replace(/-/g, " ");
  const middleNameRaw = parts[1];
  const lastNameRaw = parts[2];
  let suffixRaw = parts[3];

  // Determine if last part is suffix
  if (!SUFFIXES.has(suffixRaw)) {
    parts[2] = lastNameRaw + (suffixRaw ? " " + suffixRaw : "");
    suffixRaw = "";
  }

  const middleName = middleNameRaw
    ? middleNameRaw.replace(/-/g, " ")
    : undefined;
  const lastName = parts[2] ? parts[2].replace(/-/g, " ") : "";

  if (!firstName || !lastName) {
    throw new Error("Decoded firstName and lastName must always be present.");
  }

  return {
    firstName,
    middleName,
    lastName,
    suffix: suffixRaw || undefined,
  };
}
