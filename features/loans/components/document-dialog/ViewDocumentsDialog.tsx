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
import { getSectionsForProductType } from "./document-config";
import { DocumentSections } from "./DocumentSection";

interface ViewDocumentsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productType: string;
  dedCode: string;
}

type ClickedButtons = Record<string, boolean>;

const documentHandlers = {
  "computation-slip": () => console.log("[v0] Fetching Computation Slip"),
  "long-app-form": () => console.log("[v0] Fetching Long Application Form"),
  "short-app-form": () => console.log("[v0] Fetching Short Application Form"),
  "pre-assessment": () => console.log("[v0] Fetching Pre-Assessment"),
  apd: () => console.log("[v0] Fetching APD"),
  pba: () => console.log("[v0] Fetching PBA"),
  alip: () => console.log("[v0] Fetching ALIP"),
  ledger: () => console.log("[v0] Fetching Ledger"),
  "ledger-1": () => console.log("[v0] Fetching Ledger 1"),
  "ledger-2": () => console.log("[v0] Fetching Ledger 2"),
  pn: () => console.log("[v0] Fetching PN"),
  "pn-1": () => console.log("[v0] Fetching PN 1"),
  "pn-2": () => console.log("[v0] Fetching PN 2"),
  "pn-ren-e": () => console.log("[v0] Fetching PN REN-E"),
  ds: () => console.log("[v0] Fetching DS"),
  "ds-1": () => console.log("[v0] Fetching DS 1"),
  "ds-2": () => console.log("[v0] Fetching DS 2"),
  "ds-ren-e": () => console.log("[v0] Fetching DS REN-E"),
  spa: () => console.log("[v0] Fetching SPA"),
  sbo: () => console.log("[v0] Fetching SBO"),
  nor: () => console.log("[v0] Fetching NOR"),
  pol: () => console.log("[v0] Fetching POL"),
  puf: () => console.log("[v0] Fetching PUF"),
};

export default function ViewDocumentsDialog({
  open,
  onOpenChange,
  productType,
  dedCode,
}: ViewDocumentsDialogProps) {
  const [clickedButtons, setClickedButtons] = useState<ClickedButtons>({});

  useEffect(() => {
    if (open) setClickedButtons({});
  }, [open]);

  const handleButtonClick = async (id: string) => {
    const handler = documentHandlers[id as keyof typeof documentHandlers];
    if (handler) await handler();

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
