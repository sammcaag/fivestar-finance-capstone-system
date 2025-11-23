import { suffixOptions } from "@/features/clients/types/client-types";

export function avatarFallBack(name: string) {
  if (!name) return "";

  const suffixValues = suffixOptions.map((s) => s.value?.toLowerCase());

  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return "";

  // Remove suffix if present
  const lastPart = parts[parts.length - 1].replace(".", "").toLowerCase();
  if (suffixValues.includes(lastPart)) {
    parts.pop();
  }

  // Determine last name
  let lastName = parts[parts.length - 1] || "";
  const secondLast = parts[parts.length - 2]?.toLowerCase();
  if (secondLast === "dela" || secondLast === "de") {
    lastName = `${parts[parts.length - 2]} ${parts[parts.length - 1]}`;
  }

  // First name
  const firstName = parts[0] || "";

  // Return initials: first letter of first + first letter of last
  return ((firstName[0] || "") + (lastName[0] || "")).toUpperCase();
}
