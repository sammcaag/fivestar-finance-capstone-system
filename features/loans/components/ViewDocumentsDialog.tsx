"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle2, FileText } from "lucide-react";
import { useEffect, useState } from "react";

interface ViewDocumentsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productType: string;
  dedCode: string;
}

type ClickedButtons = {
  [key: string]: boolean;
};

export default function ViewDocumentsDialog({
  open,
  onOpenChange,
  productType,
  dedCode,
}: ViewDocumentsDialogProps) {
  const [clickedButtons, setClickedButtons] = useState<ClickedButtons>({});

  const documentHandlers: { [key: string]: () => void | Promise<void> } = {
    "computation-slip": () => getComputationSlip(),
    "long-app-form": () => getLongApplicationForm(),
    "short-app-form": () => getShortApplicationForm(),
    "pre-assessment": () => getPreAssessment(),
    apd: () => getAPD(),
    pba: () => getPBA(),
    alip: () => getALIP(),
    ledger: () => getLedger(),
    "ledger-1": () => getLedger1(),
    "ledger-2": () => getLedger2(),
    pn: () => getPN(),
    "pn-1": () => getPN1(),
    "pn-2": () => getPN2(),
    "pn-ren-e": () => getPNRenE(),
    ds: () => getDS(),
    "ds-1": () => getDS1(),
    "ds-2": () => getDS2(),
    "ds-ren-e": () => getDSRenE(),
    spa: () => getSPA(),
    sbo: () => getSBO(),
    nor: () => getNOR(),
    pol: () => getPOL(),
    puf: () => getPUF(),
  };

  const getComputationSlip = async () => {
    console.log("[v0] Fetching Computation Slip for", dedCode);
    // Replace with your actual API call
    // const response = await fetch(`/api/documents/computation-slip?dedCode=${dedCode}`)
  };

  const getLongApplicationForm = async () => {
    console.log("[v0] Fetching Long Application Form for", dedCode);
  };

  const getShortApplicationForm = async () => {
    console.log("[v0] Fetching Short Application Form for", dedCode);
  };

  const getPreAssessment = async () => {
    console.log("[v0] Fetching Pre-Assessment for", dedCode);
  };

  const getAPD = async () => {
    console.log("[v0] Fetching APD for", dedCode);
  };

  const getPBA = async () => {
    console.log("[v0] Fetching PBA for", dedCode);
  };

  const getALIP = async () => {
    console.log("[v0] Fetching ALIP for", dedCode);
  };

  const getLedger = async () => {
    console.log("[v0] Fetching Ledger for", dedCode);
  };

  const getLedger1 = async () => {
    console.log("[v0] Fetching Ledger 1 for", dedCode);
  };

  const getLedger2 = async () => {
    console.log("[v0] Fetching Ledger 2 for", dedCode);
  };

  const getPN = async () => {
    console.log("[v0] Fetching PN for", dedCode);
  };

  const getPN1 = async () => {
    console.log("[v0] Fetching PN 1 for", dedCode);
  };

  const getPN2 = async () => {
    console.log("[v0] Fetching PN 2 for", dedCode);
  };

  const getPNRenE = async () => {
    console.log("[v0] Fetching PN REN-E for", dedCode);
  };

  const getDS = async () => {
    console.log("[v0] Fetching DS for", dedCode);
  };

  const getDS1 = async () => {
    console.log("[v0] Fetching DS 1 for", dedCode);
  };

  const getDS2 = async () => {
    console.log("[v0] Fetching DS 2 for", dedCode);
  };

  const getDSRenE = async () => {
    console.log("[v0] Fetching DS REN-E for", dedCode);
  };

  const getSPA = async () => {
    console.log("[v0] Fetching SPA for", dedCode);
  };

  const getSBO = async () => {
    console.log("[v0] Fetching SBO for", dedCode);
  };

  const getNOR = async () => {
    console.log("[v0] Fetching NOR for", dedCode);
  };

  const getPOL = async () => {
    console.log("[v0] Fetching POL for", dedCode);
  };

  const getPUF = async () => {
    console.log("[v0] Fetching PUF for", dedCode);
  };

  useEffect(() => {
    if (open) {
      setClickedButtons({});
    }
  }, [open]);

  const handleButtonClick = async (buttonId: string) => {
    const handler = documentHandlers[buttonId];
    if (handler) {
      await handler();
    }

    const newClickedState = {
      ...clickedButtons,
      [buttonId]: true,
    };
    setClickedButtons(newClickedState);
  };

  const DocumentCard = ({ id, label }: { id: string; label: string }) => {
    const isClicked = clickedButtons[id];

    return (
      <div className="group relative cursor-pointer" onClick={() => handleButtonClick(id)}>
        {/* Card Container */}
        <div
          className={`relative w-full h-72 md:h-[300px] lg:h-[200px] rounded-xl overflow-hidden border-2 transition-all duration-300 ${
            isClicked
              ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 shadow-md shadow-emerald-500/20"
              : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg hover:shadow-2xl hover:border-slate-300 dark:hover:border-slate-600"
          }`}
        >
          {/* Document Image Preview */}
          <div className="w-full h-full relative bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
            <img
              src={`/pdf-document.png?key=7fqtq&height=600&width=480&query=PDF document ${label}`}
              alt={label}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center backdrop-blur-md">
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100">
                <div className="text-center">
                  <p className="text-white font-semibold text-base md:text-2xl">View</p>
                  <p className="text-white/90 text-sm md:text-base mt-2 px-4 line-clamp-2">
                    {label}
                  </p>
                </div>
              </div>
            </div>

            {/* Selected Indicator Badge */}
            {isClicked && (
              <div className="absolute top-4 right-4 bg-emerald-500 rounded-full p-2 shadow-lg">
                <CheckCircle2 className="h-6 w-6 text-white" />
              </div>
            )}
          </div>
        </div>

        {/* Document Label */}
        <p className="mt-3 text-sm md:text-base font-medium text-slate-700 dark:text-slate-300 truncate">
          {label}
        </p>
      </div>
    );
  };

  const CategorySection = ({
    title,
    buttons,
  }: {
    title: string;
    buttons: Array<{ id: string; label: string }>;
  }) => {
    const selectedCount = buttons.filter((b) => clickedButtons[b.id]).length;

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-slate-600 dark:text-slate-300" />
            <h3 className="text-lg md:text-2xl font-semibold text-slate-900 dark:text-slate-100">
              {title}
            </h3>
          </div>
          {selectedCount > 0 && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 px-4 py-2 text-sm font-medium text-emerald-700 dark:text-emerald-300">
              <CheckCircle2 className="h-4 w-4" />
              {selectedCount}/{buttons.length}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {buttons.map((button) => (
            <DocumentCard key={button.id} id={button.id} label={button.label} />
          ))}
        </div>
      </div>
    );
  };

  const documentSections = {
    newClientOrReloan: [
      {
        title: "Loan Application",
        buttons: [
          { id: "computation-slip", label: "Computation Slip" },
          { id: "long-app-form", label: "Long Application Form" },
        ],
      },
      {
        title: "Loan Billings",
        buttons: [
          { id: "pre-assessment", label: "Pre-Assessment" },
          { id: "apd", label: "APD" },
          { id: "pba", label: "PBA" },
          { id: "alip", label: "ALIP" },
        ],
      },
      {
        title: "Loan Contracts",
        buttons: [
          { id: "ledger", label: "Ledger" },
          { id: "pn", label: "PN" },
          { id: "ds", label: "DS" },
          { id: "spa", label: "SPA" },
        ],
      },
      {
        title: "Other Documents",
        buttons: [
          { id: "sbo", label: "SBO" },
          { id: "nor", label: "NOR" },
          { id: "pol", label: "POL" },
          { id: "puf", label: "PUF" },
        ],
      },
    ],
    additionalOrRenewal: [
      {
        title: "Loan Application",
        buttons: [
          { id: "computation-slip", label: "Computation Slip" },
          { id: "short-app-form", label: "Short Application Form" },
        ],
      },
      {
        title: "Loan Billings",
        buttons: [
          { id: "pre-assessment", label: "Pre-Assessment" },
          { id: "apd", label: "APD" },
          { id: "pba", label: "PBA" },
          { id: "alip", label: "ALIP" },
        ],
      },
      {
        title: "Loan Contracts",
        buttons: [
          { id: "ledger", label: "Ledger" },
          { id: "pn", label: "PN" },
          { id: "ds", label: "DS" },
          { id: "spa", label: "SPA" },
        ],
      },
    ],
    extension: [
      {
        title: "Loan Application",
        buttons: [
          { id: "computation-slip", label: "Computation Slip" },
          { id: "short-app-form", label: "Short Application Form" },
        ],
      },
      {
        title: "Loan Billings",
        buttons: [
          { id: "pre-assessment", label: "Pre-Assessment" },
          { id: "apd", label: "APD" },
          { id: "pba", label: "PBA" },
          { id: "alip", label: "ALIP" },
        ],
      },
      {
        title: "Loan Contracts",
        buttons: [
          { id: "ledger-1", label: "Ledger 1" },
          { id: "ledger-2", label: "Ledger 2" },
          { id: "pn-1", label: "PN 1" },
          { id: "pn-2", label: "PN 2" },
          { id: "pn-ren-e", label: "PN REN-E" },
          { id: "ds-1", label: "DS 1" },
          { id: "ds-2", label: "DS 2" },
          { id: "ds-ren-e", label: "DS REN-E" },
          { id: "spa", label: "SPA" },
        ],
      },
    ],
  };

  const getSections = () => {
    const normalizedType = productType.toLowerCase();
    if (normalizedType === "new_client" || normalizedType === "reloan") {
      return documentSections.newClientOrReloan;
    } else if (normalizedType === "additional" || normalizedType === "renewal") {
      return documentSections.additionalOrRenewal;
    } else if (normalizedType === "extension") {
      return documentSections.extension;
    }
    return [];
  };

  const sections = getSections();
  const totalDocuments = sections.reduce((sum, section) => sum + section.buttons.length, 0);
  const selectedDocuments = Object.values(clickedButtons).filter(Boolean).length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[50%] h-[70%] overflow-y-auto p-6 md:p-8">
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

        {sections.length === 0 ? (
          <div className="text-center py-12 text-slate-500 dark:text-slate-400">
            <p className="text-lg">Unknown product type</p>
          </div>
        ) : (
          <div className="space-y-12">
            {sections.map((section, index) => (
              <CategorySection key={index} title={section.title} buttons={section.buttons} />
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
