"use client";
import { useState } from "react";
import type { ResultsProps } from "@/features/loan-calculators/types/types-regular";

interface CalculatorState {
  selectedCard: string;
  results: ResultsProps;
  hasDeduction: boolean;
  valueDate: Date;
  maturityDate: Date;
  loanMaturityDate: Date;
  netAmount: string;
  isDoneCalculate: boolean;
  isCalculating: boolean;
}

const initialResults: ResultsProps = {
  effectiveInterestRate: "0.00",
  gpFactor: "0.00",
  principalAmount: "0.00",
  unearnedInterest: "0.00",
  grossProceeds: "0.00",
  documentaryStamp: "0.00",
  grossRevenueTax: "0.00",
  insurance: "0.00",
  totalDeductions: "0.00",
};

const initialState: CalculatorState = {
  selectedCard: "1",
  results: initialResults,
  hasDeduction: false,
  valueDate: new Date(),
  maturityDate: new Date(),
  loanMaturityDate: new Date(),
  netAmount: "₱\t0.00",
  isDoneCalculate: false,
  isCalculating: false,
};

export function useCalculatorState() {
  const [state, setState] = useState<CalculatorState>(initialState);

  const updateState = (updates: Partial<CalculatorState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const resetState = () => {
    setState(initialState);
  };

  const setSelectedCard = (card: string) => updateState({ selectedCard: card });
  const setResults = (results: ResultsProps) => updateState({ results });
  const setHasDeduction = (hasDeduction: boolean) =>
    updateState({ hasDeduction });
  const setValueDate = (valueDate: Date) => updateState({ valueDate });
  const setMaturityDate = (maturityDate: Date) => updateState({ maturityDate });
  const setLoanMaturityDate = (loanMaturityDate: Date) =>
    updateState({ loanMaturityDate });
  const setNetAmount = (netAmount: string) => updateState({ netAmount });
  const setIsDoneCalculate = (isDoneCalculate: boolean) =>
    updateState({ isDoneCalculate });
  const setIsCalculating = (isCalculating: boolean) =>
    updateState({ isCalculating });

  return {
    state,
    updateState,
    resetState,
    setSelectedCard,
    setResults,
    setHasDeduction,
    setValueDate,
    setMaturityDate,
    setLoanMaturityDate,
    setNetAmount,
    setIsDoneCalculate,
    setIsCalculating,
  };
}
