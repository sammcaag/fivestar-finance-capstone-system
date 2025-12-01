import { Row } from "@tanstack/react-table";

interface DedCodeData {
  dedCode: string; // Required
}

const dedCodeColorMap: Record<string, string> = {
  "FI-1": "bg-[#FFD1D1]/80 dark:bg-[#A64444]/70 hover:bg-[#FFD1D1] dark:hover:bg-[#A64444]", // Pastel red, warm and soft
  "FI-2": "bg-[#FFE4CC]/80 dark:bg-[#B3743D]/70 hover:bg-[#FFE4CC] dark:hover:bg-[#B3743D]", // Pastel orange, vibrant yet gentle
  "FI-3": "bg-[#FFF7B2]/80 dark:bg-[#B3A23F]/70 hover:bg-[#FFF7B2] dark:hover:bg-[#B3A23F]", // Pastel yellow, sunny and bright
  "FI-4": "bg-[#A3E4D7]/80 dark:bg-[#3E8E7E]/70 hover:bg-[#A3E4D7] dark:hover:bg-[#3E8E7E]",
  "FI-5": "bg-[#C9E4FF]/80 dark:bg-[#4A6F99]/70 hover:bg-[#C9E4FF] dark:hover:bg-[#4A6F99]", // Pastel blue, crisp and calming
  "FI-6": "bg-[#D4CFFF]/80 dark:bg-[#6B5B95]/70 hover:bg-[#D4CFFF] dark:hover:bg-[#6B5B95]", // Pastel indigo, cool and distinct
  "FI-7": "bg-[#F3D9FA]/80 dark:bg-[#7B3D8C]/70 hover:bg-[#F3D9FA] dark:hover:bg-[#7B3D8C]", // Pastel violet, delicate and rich
  "FI-8": "bg-[#FFD1DC]/80 dark:bg-[#A64D5F]/70 hover:bg-[#FFD1DC] dark:hover:bg-[#A64D5F]", // Pastel pink, warm and unique
  "FI-9": "bg-[#E8D4FF]/80 dark:bg-[#6D4A99]/70 hover:bg-[#E8D4FF] dark:hover:bg-[#6D4A99]", // Pastel purple, distinct from violet
};

export function getFiRowColors<TData extends DedCodeData>(row: Row<TData>): string {
  const dedCode = row.original.dedCode.toUpperCase();
  const defaultColor =
    "bg-[#E2E8F0] dark:bg-[#475569]/50 hover:bg-[#E2E8F0] dark:hover:bg-[#475569]/70"; // Slate, neutral fallback

  return dedCode && dedCodeColorMap[dedCode] ? dedCodeColorMap[dedCode] : defaultColor;
}
