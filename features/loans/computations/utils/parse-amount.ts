import { removeCommas } from "./format-currency";

export const parseAmount = (value: unknown): number => {
  if (typeof value === "number") return value;

  if (typeof value === "string") {
    const normalized = removeCommas(value).replace(/\s/g, "").replace(/₱/g, "");
    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  return 0;
};
