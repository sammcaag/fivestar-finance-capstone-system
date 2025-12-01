// src/features/clients/hooks/useLoanLogic.ts
import { useMemo } from "react";
import { LoanHistory } from "@/features/loans/types/loan-types";

export function useLoanLogic(loanHistory: LoanHistory[], today: Date) {
  const sortedLoans = useMemo(
    () =>
      [...loanHistory].sort(
        (a, b) => new Date(a.madeDate).getTime() - new Date(b.madeDate).getTime()
      ),
    [loanHistory]
  );

  const loanSets = useMemo(() => {
    const sets: LoanHistory[][] = [];
    let currentSet: LoanHistory[] = [];
    sortedLoans.forEach((loan) => {
      if (currentSet.length > 0 && loan.productType === "Reloan") {
        sets.push(currentSet);
        currentSet = [loan];
      } else {
        currentSet.push(loan);
      }
    });
    if (currentSet.length > 0) {
      sets.push(currentSet);
    }
    return sets;
  }, [sortedLoans]);

  const buttonLabel = getAddButtonLabel(loanHistory, today);

  return { loanSets, buttonLabel };
}

function getAddButtonLabel(data: LoanHistory[], today: Date): string {
  if (data.length === 0) return "Add New Client Loan";
  const allPaid = data.every((loan) => new Date(loan.maturityDate) < today);
  return allPaid ? "Add Reloan Client Loan" : "Add Additional Client Loan";
}
