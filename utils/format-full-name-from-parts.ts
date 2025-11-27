import { FullNameProps } from "./format-full-name";

/**
 * Join full name parts into a single string.
 * Skips empty or undefined values, avoids extra spaces.
 * Replaces any "-" in the name parts with a space.
 */
export function formatFullNameFromParts({
  firstName,
  middleName,
  lastName,
  suffix,
}: FullNameProps): string {
  return [firstName, middleName, lastName, suffix]
    .filter((part) => part && part.trim() !== "") // remove empty/undefined
    .map((part) => part!.replace(/-/g, " ")) // replace "-" with " "
    .join(" ");
}
