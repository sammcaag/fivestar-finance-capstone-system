import { TableData } from "@/types/global-types";

export interface LoanDeductionTableRow extends TableData {
  id: number;
  name: string;
  loanStarted: string;
  deductNumber: number;
  monthlyAmortization: number;
}
