export interface Loan {
  id: string;
  clientName: string;
  amount: number;
  purpose: string;
  status: string;
  applicationDate: string;
  term: number;
  interestRate: number;
}
