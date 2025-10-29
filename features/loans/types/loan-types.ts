export interface Loan {
  id: string;
  name: string;
  amount: number;
  purpose: string;
  status:
    | "Approved by HQ"
    | "Pending"
    | "Disbursed"
    | "Rejected"
    | "Forwarded to HQ";
  applicationDate: string;
  term: number;
  interestRate: number;
  startDate: string;
}

interface LoanDocument {
  id: string;
  name: string;
  type: string;
  date: string;
  url: string;
}

export interface LoanHIstory {
  id: string;
  dedCode: string;
  productType: "New Client" | "Extension" | "Additional" | "Renewal" | "Reloan";
  amount: number;
  term: string;
  releasedDate: string;
  valueDate: string;
  maturityDate: string;
  status: "PROCESS" | "RELEASED";
  pnNumber?: string;
  parentId?: string | null;
  isExtension?: boolean;
  isFullyPaid?: boolean;
  extensionType?: "Ext." | "Add." | null;
  documents?: LoanDocument[];
}
