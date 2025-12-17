export type LoanType = "New Client" | "Extension" | "Additional" | "Renewal" | "Reloan";

type LoanStatus = "Approved by HQ" | "Pending" | "Disbursed" | "Rejected" | "Forwarded to HQ";
export interface LoanTableProps {
  id: string;
  name: string;
  serialNumber: string;
  productType: LoanType;
  monthlyAmortization: number;
  status: string;
  approvalStatus: string;
  branchName: string;
  valueDate: string;
  term: number;
  createdAt: string;
}

interface LoanDocument {
  id: string;
  name: string;
  type: string;
  date: string;
  url: string;
}

export interface LoanHistory {
  id: string;
  dedCode: string;
  productType: LoanType;
  amount: number;
  term: string;
  madeDate: string;
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
