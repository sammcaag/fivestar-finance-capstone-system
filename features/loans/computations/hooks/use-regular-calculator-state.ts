"use client";
import { useState, useCallback } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { ResultsProps } from "@/features/loans/computations/types/types-regular";

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

  const updateState = useCallback((updates: Partial<CalculatorState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  const resetState = useCallback(() => {
    setState(initialState);
  }, []);

  const setSelectedCard = useCallback(
    (card: string) => updateState({ selectedCard: card }),
    [updateState]
  );
  const setResults = useCallback(
    (results: ResultsProps) => updateState({ results }),
    [updateState]
  );
  const setHasDeduction = useCallback(
    (hasDeduction: boolean) => updateState({ hasDeduction }),
    [updateState]
  );

  // Fix: Use proper React setState type
  const setValueDate = useCallback<Dispatch<SetStateAction<Date>>>(
    (value) => {
      const newDate =
        typeof value === "function" ? value(state.valueDate) : value;
      updateState({ valueDate: newDate });
    },
    [updateState, state.valueDate]
  );

  const setMaturityDate = useCallback<Dispatch<SetStateAction<Date>>>(
    (value) => {
      const newDate =
        typeof value === "function" ? value(state.maturityDate) : value;
      updateState({ maturityDate: newDate });
    },
    [updateState, state.maturityDate]
  );

  const setLoanMaturityDate = useCallback<Dispatch<SetStateAction<Date>>>(
    (value) => {
      const newDate =
        typeof value === "function" ? value(state.loanMaturityDate) : value;
      updateState({ loanMaturityDate: newDate });
    },
    [updateState, state.loanMaturityDate]
  );

  const setNetAmount = useCallback(
    (netAmount: string) => updateState({ netAmount }),
    [updateState]
  );
  const setIsDoneCalculate = useCallback(
    (isDoneCalculate: boolean) => updateState({ isDoneCalculate }),
    [updateState]
  );
  const setIsCalculating = useCallback(
    (isCalculating: boolean) => updateState({ isCalculating }),
    [updateState]
  );

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
