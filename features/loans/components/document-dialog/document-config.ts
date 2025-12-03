// components/documents/document-config.ts

export type DocumentButton = {
  id: string;
  label: string;
};

export type DocumentSection = {
  title: string;
  buttons: readonly DocumentButton[];
};

export type DocumentSectionsMap = {
  readonly newClientOrReloan: readonly DocumentSection[];
  readonly additionalOrRenewal: readonly DocumentSection[];
  readonly extension: readonly DocumentSection[];
};

export const documentSections = {
  newClientOrReloan: [
    {
      title: "Loan Application",
      buttons: [
        { id: "computation-slip", label: "Computation Slip" },
        { id: "loan-application-long", label: "Long Application Form" },
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
        { id: "pn-ren", label: "PN" },
        { id: "ds-1", label: "DS" },
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
        { id: "loan-application-short", label: "Short Application Form" },
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
        { id: "pn-ren", label: "PN" },
        { id: "ds-1", label: "DS" },
        { id: "spa", label: "SPA" },
      ],
    },
  ],
  extension: [
    {
      title: "Loan Application",
      buttons: [
        { id: "computation-slip", label: "Computation Slip" },
        { id: "loan-application-short", label: "Short Application Form" },
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
        { id: "pn-ren", label: "PN REN-E" },
        { id: "ds-1", label: "DS 1" },
        { id: "ds-2", label: "DS 2" },
        { id: "ds-ren", label: "DS REN-E" },
        { id: "spa", label: "SPA" },
      ],
    },
  ],
} as const;

// This is now 100% type-safe
export const getSectionsForProductType = (productType: string): readonly DocumentSection[] => {
  const normalized = productType.toLowerCase();

  if (normalized === "new_client" || normalized === "reloan") {
    return documentSections.newClientOrReloan;
  }
  if (normalized === "additional" || normalized === "renewal") {
    return documentSections.additionalOrRenewal;
  }
  if (normalized === "extension") {
    return documentSections.extension;
  }

  return [];
};
