// components/documents/ViewDocumentsDialog.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchAndPrint } from "../../history/utils/fetch-and-print";
import { getSectionsForProductType } from "./document-config";
import { DocumentSections } from "./DocumentSection";

interface ViewDocumentsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productType: string;
  dedCode: string;
  loanHistoryId?: number;
}

type ClickedButtons = Record<string, boolean>;

const documentHandlers: Record<string, (loanHistoryId: number) => Promise<void>> = {
  "computation-slip": (id) => fetchAndPrint("pre-assessment", id), // change this to computation slip if added in backend
  "pre-assessment": (id) => fetchAndPrint("pre-assessment", id),
  "long-app-form": (id) => fetchAndPrint("loan-application-long", id),
  "short-app-form": (id) => fetchAndPrint("loan-application-short", id),
  apd: (id) => fetchAndPrint("apd", id),
  pba: (id) => fetchAndPrint("pba", id),
  alip: (id) => fetchAndPrint("alip", id),
  ledger: (id) => fetchAndPrint("ledger", id),
  "ledger-1": (id) => fetchAndPrint("ledger-1", id),
  "ledger-2": (id) => fetchAndPrint("ledger-2", id),
  pn: (id) => fetchAndPrint("pn-ren", id),
  "pn-ren-e": (id) => fetchAndPrint("pn-ren", id),
  ds: (id) => fetchAndPrint("ds-ren", id),
  "ds-1": (id) => fetchAndPrint("ds-1", id),
  "ds-2": (id) => fetchAndPrint("ds-2", id),
  "ds-ren-e": (id) => fetchAndPrint("ds-ren-ext", id),
  spa: (id) => fetchAndPrint("spa", id),
  sbo: (id) => fetchAndPrint("sbo", id),
  nor: (id) => fetchAndPrint("nor", id),
  pol: (id) => fetchAndPrint("pol", id),
  puf: (id) => fetchAndPrint("puf", id),
};
export default function ViewDocumentsDialog({
  open,
  onOpenChange,
  productType,
  dedCode,
  loanHistoryId,
}: ViewDocumentsDialogProps) {
  const [clickedButtons, setClickedButtons] = useState<ClickedButtons>({});

  useEffect(() => {
    if (open) setClickedButtons({});
  }, [open]);

  const handleButtonClick = async (id: string) => {
    if (!loanHistoryId) {
      alert("No loan selected");
      return;
    }

    const handler = documentHandlers[id];
    if (handler) {
      await handler(loanHistoryId);
    }

    // Still show checkmark
    setClickedButtons((prev) => ({ ...prev, [id]: true }));
  };

  const sections = getSectionsForProductType(productType);
  const totalDocuments = sections.reduce((sum, s) => sum + s.buttons.length, 0);
  const selectedDocuments = Object.values(clickedButtons).filter(Boolean).length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[50%] h-[80vh] overflow-y-auto p-6 md:p-8">
        <DialogHeader className="mb-8">
          <DialogTitle className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50">
            Loan Documents
          </DialogTitle>
          <DialogDescription className="space-y-4 mt-4">
            <div className="flex flex-col sm:flex-row gap-6 text-base">
              <span className="text-slate-600 dark:text-slate-400">
                <span className="font-semibold text-slate-900 dark:text-slate-100">{dedCode}</span>{" "}
                • DED Code
              </span>
              <span className="text-slate-600 dark:text-slate-400">
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  {productType}
                </span>{" "}
                • Product Type
              </span>
            </div>
            {selectedDocuments > 0 && (
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                <CheckCircle2 className="h-5 w-5" />
                <span className="text-base">
                  {selectedDocuments} of {totalDocuments} documents selected
                </span>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>

        <DocumentSections
          sections={sections}
          clickedButtons={clickedButtons}
          onButtonClick={handleButtonClick}
        />
      </DialogContent>
    </Dialog>
  );
}
