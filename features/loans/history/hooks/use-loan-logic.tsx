// src/features/clients/hooks/useLoanLogic.ts
import { useMemo } from "react";
import { LoanHistoryPayload } from "../types/loan-form-types";

export function useLoanLogic(loanHistory: LoanHistoryPayload[], today: Date = new Date()) {
  // Sort loans by createdAt (safely handle undefined)
  const sortedLoans = useMemo(() => {
    return [...loanHistory].sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateA - dateB;
    });
  }, [loanHistory]);

  // Group loans into "sets" — each RELOAN starts a new set
  const loanSets = useMemo(() => {
    const sets: LoanHistoryPayload[][] = [];
    let currentSet: LoanHistoryPayload[] = [];

    sortedLoans.forEach((loan) => {
      // If we encounter a RELOAN and already have a set → push current and start new
      if (currentSet.length > 0 && loan.productType.toUpperCase() === "RELOAN") {
        sets.push(currentSet);
        currentSet = [loan];
      } else {
        currentSet.push(loan);
      }
    });

    // Don't forget the last set
    if (currentSet.length > 0) {
      sets.push(currentSet);
    }

    return sets;
  }, [sortedLoans]);

  // Determine button label
  const buttonLabel = useMemo(() => {
    if (loanHistory.length === 0) return "Add New Client Loan";

    // Check if ALL loans in history are fully matured (maturityDate < today)
    const allMatured = loanHistory.every((loan) => {
      const maturity = loan.maturityDate;
      return maturity && maturity < today;
    });

    return allMatured ? "Add Reloan Client Loan" : "Add Additional Client Loan";
  }, [loanHistory, today]);

  return { loanSets, buttonLabel };
}
