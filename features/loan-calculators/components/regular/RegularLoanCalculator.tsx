"use client";
import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import type { FormValues } from "../../types/types-regular";
import { regularCalculatorChecker } from "../../schema/loan-calculation-zod-schema";
import { useRegularLoanCalculator } from "../../hooks/use-regular-calculator";
import ClientTitleCard from "../ClientTitleCard";
import { useCalculatorState } from "../../hooks/use-regular-calculator-state";
import { useRenewalCalculations } from "../../hooks/use-renewal-calculations";
import {
  containerVariants,
  fadeInVariants,
  itemVariants,
} from "../../utils/animation-variants";
import LoanFormRegular from "./LoanFormRegular";
import ResultsDisplayRegularRefactored from "./ResultsDisplayRegular";
import { CalculatorActions } from "../CalculatorActions";

interface RegularLoanCalculatorProps {
  clientType: string;
}

export default function RegularLoanCalculator({
  clientType,
}: RegularLoanCalculatorProps) {
  const { calculateRegularLoan } = useRegularLoanCalculator();
  const {
    state,
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
  } = useCalculatorState();

  const [hasMounted, setHasMounted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(regularCalculatorChecker),
    defaultValues: {
      term: 0,
      monthlyAmortization: 0,
      outstandingBalance: 0,
      otherDeduction: 0,
      remainingMonths: 0,
    },
  });

  const amortizationWatch =
    clientType === "Renewal" ? form.watch("monthlyAmortization") : undefined;

  // Memoize the calculate function to prevent unnecessary re-renders
  const calculate = useCallback(
    async (values: FormValues, selectedCard: string) => {
      try {
        setIsCalculating(true);

        // Simulate calculation delay for better UX
        setTimeout(() => {
          const calculationResults = calculateRegularLoan(values, selectedCard);

          setResults(calculationResults.results);
          if (clientType === "Renewal") {
            setValueDate(calculationResults.renewalValueDate);
            setMaturityDate(calculationResults.renewalMaturityDate);
          } else {
            setValueDate(calculationResults.valueDate);
            setMaturityDate(calculationResults.maturityDate);
          }
          setNetAmount(`₱\t${calculationResults.netAmount}`);
          setIsDoneCalculate(true);
          setIsCalculating(false);
        }, 600);
      } catch (error) {
        setIsCalculating(false);
        toast.error(error instanceof Error ? error.message : String(error));
      }
    },
    [
      calculateRegularLoan,
      clientType,
      setIsCalculating,
      setResults,
      setValueDate,
      setMaturityDate,
      setNetAmount,
      setIsDoneCalculate,
    ]
  );

  // Custom hooks for complex logic
  useRenewalCalculations({
    clientType,
    loanMaturityDate: state.loanMaturityDate,
    form,
    amortizationWatch,
  });

  const handleCompute = useCallback(
    (values: FormValues) => {
      calculate(values, state.selectedCard);
    },
    [calculate, state.selectedCard]
  );

  const handleClear = useCallback(() => {
    form.reset();
    resetState();
    toast.success("Computation cleared successfully");
  }, [form, resetState]);

  const handlePrint = useCallback(() => {
    toast.info("Preparing document for printing...");
    setTimeout(() => {
      window.print();
    }, 500);
  }, []);

  // Initialize deduction state for renewal clients
  useEffect(() => {
    if (clientType === "Renewal") {
      setHasDeduction(true);
    }
  }, [clientType, setHasDeduction]);

  // Handle rate card changes after calculation
  useEffect(() => {
    if (!hasMounted) {
      setHasMounted(true);
      return;
    }

    if (state.isDoneCalculate) {
      calculate(form.getValues(), state.selectedCard);
    }
  }, [state.selectedCard, hasMounted, state.isDoneCalculate, calculate, form]);

  return (
    <motion.section
      className="w-full"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <ClientTitleCard
        variants={itemVariants}
        title={`AFP ${clientType} Computation`}
        description="Calculate potential loan amount for clients with precision and ease"
      />

      <motion.div
        className="bg-card dark:bg-background rounded-xl shadow-lg border border-gray-100 dark:border-gray-800"
        variants={itemVariants}
      >
        <div className="p-6 space-y-8">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleCompute)}
              className="space-y-8"
            >
              <LoanFormRegular
                form={form}
                selectedCard={state.selectedCard}
                onCardSelect={setSelectedCard}
                hasDeduction={state.hasDeduction}
                setHasDeduction={setHasDeduction}
                clientType={clientType}
                {...(clientType === "Renewal" && {
                  maturityDate: state.loanMaturityDate,
                  setMaturityDate: setLoanMaturityDate,
                })}
                isDoneCalculate={state.isDoneCalculate}
              />

              {state.isDoneCalculate && (
                <motion.div
                  variants={fadeInVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <ResultsDisplayRegularRefactored
                    {...state.results}
                    netAmount={state.netAmount}
                    valueDate={state.valueDate}
                    setValueDate={setValueDate}
                    maturityDate={state.maturityDate}
                    setMaturityDate={setMaturityDate}
                  />
                </motion.div>
              )}

              <CalculatorActions
                isDoneCalculate={state.isDoneCalculate}
                isCalculating={state.isCalculating}
                onClear={handleClear}
                onPrint={handlePrint}
              />
            </form>
          </Form>
        </div>
      </motion.div>
    </motion.section>
  );
}
