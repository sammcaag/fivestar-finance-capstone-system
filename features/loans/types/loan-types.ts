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
