import { StaffFormValues } from "../types/staff-types";

const DRAFT_STORAGE_KEY = "staff-form-draft";

export function saveDraft(data: Partial<StaffFormValues>): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(
      DRAFT_STORAGE_KEY,
      JSON.stringify({
        data,
        savedAt: new Date().toISOString(),
      })
    );
  }
}

export function loadDraft(): {
  data: Partial<StaffFormValues>;
  savedAt: string;
} | null {
  if (typeof window !== "undefined") {
    const savedDraft = localStorage.getItem(DRAFT_STORAGE_KEY);
    if (savedDraft) {
      return JSON.parse(savedDraft);
    }
  }
  return null;
}

export function clearDraft(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
  }
}

export function formatSavedDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(date);
}
