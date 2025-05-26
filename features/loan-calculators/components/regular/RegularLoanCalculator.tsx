"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { PrinterIcon, Calculator, ArrowRight, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import type { FormValues, ResultsProps } from "../../types/types-regular";
import { regularCalculatorChecker } from "../../schema/loan-calculation-zod-schema";
import { useRegularLoanCalculator } from "../../hooks/use-regular-calculator";
import LoanFormRegular from "./LoanFormRegular";
import ResultsDisplayRegular from "./ResultsDisplayRegular";

interface LoanCalculatorProps {
  clientType: string;
}

export default function LoanCalculator({ clientType }: LoanCalculatorProps) {
  const { calculateRegularLoan } = useRegularLoanCalculator();

  const form = useForm<FormValues>({
    resolver: zodResolver(regularCalculatorChecker),
    defaultValues: {
      term: 0,
      monthlyAmortization: 0,
      outstandingBalance: 0,
      otherDeduction: 0,
      remainingMonths: 0,
    },
    mode: "onSubmit",
  });

  // States
  const [selectedCard, setSelectedCard] = useState<string>("1");
  const [results, setResults] = useState<ResultsProps>({
    effectiveInterestRate: "0.00",
    gpFactor: "0.00",
    principalAmount: "0.00",
    unearnedInterest: "0.00",
    grossProceeds: "0.00",
    documentaryStamp: "0.00",
    grossRevenueTax: "0.00",
    insurance: "0.00",
    totalDeductions: "0.00",
  });
  const [hasDeduction, setHasDeduction] = useState<boolean>(false);
  const [valueDate, setValueDate] = useState<Date>(new Date());
  const [maturityDate, setMaturityDate] = useState<Date>(new Date());
  const [loanMaturityDate, setLoanMaturityDate] = useState<Date>(new Date());
  const [netAmount, setNetAmount] = useState<string>(`₱\t0.00`);
  const [isDoneCalculate, setIsDoneCalculate] = useState<boolean>(false);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [hasFormErrors, setHasFormErrors] = useState<boolean>(false);

  const amortizationWatch =
    clientType === "Renewal" ? form.watch("monthlyAmortization") : undefined;

  // Watch for form errors
  useEffect(() => {
    const subscription = form.watch(() => {
      const hasErrors = Object.keys(form.formState.errors).length > 0;
      setHasFormErrors(hasErrors);
    });

    return () => subscription.unsubscribe();
  }, [form, form.formState, form.watch]);

  const calculate = (values: FormValues, selectedCard: string) => {
    try {
      setIsCalculating(true);

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
      }, 400);
    } catch (error) {
      setIsCalculating(false);
      toast.error(error instanceof Error ? error.message : String(error));
    }
  };

  const handleCompute = (values: FormValues) => {
    if (Object.keys(form.formState.errors).length > 0) {
      setHasFormErrors(true);
      toast.error("Please fix the form errors before computing");
      return;
    }

    setHasFormErrors(false);
    calculate(values, selectedCard);
  };

  const handleClear = () => {
    form.reset({
      term: 0,
      monthlyAmortization: 0,
      outstandingBalance: 0,
      otherDeduction: 0,
      remainingMonths: 0,
    });
    setSelectedCard("1");
    setResults({
      effectiveInterestRate: "0.00",
      gpFactor: "0.00",
      principalAmount: "0.00",
      unearnedInterest: "0.00",
      grossProceeds: "0.00",
      documentaryStamp: "0.00",
      grossRevenueTax: "0.00",
      insurance: "0.00",
      totalDeductions: "0.00",
    });
    setValueDate(new Date());
    setMaturityDate(new Date());
    setNetAmount(`₱\t0.00`);
    setIsDoneCalculate(false);
    setHasFormErrors(false);

    toast.success("Computation cleared successfully");
  };

  const handlePrint = () => {
    toast.info("Preparing document for printing...");
    setTimeout(() => {
      window.print();
    }, 500);
  };

  useEffect(() => {
    if (clientType === "Renewal") {
      setHasDeduction(true);
    }
  }, [clientType]);

  useEffect(() => {
    if (clientType !== "Renewal" || !loanMaturityDate) return;

    const currentDate = new Date();
    const calculatedRemainingMonths =
      (loanMaturityDate.getFullYear() - currentDate.getFullYear()) * 12 +
      loanMaturityDate.getMonth() -
      currentDate.getMonth();
    form.setValue("remainingMonths", calculatedRemainingMonths);

    setTimeout(() => {
      const remainingMonths = form.getValues("remainingMonths") || 0;
      const monthlyAmortization = form.getValues("monthlyAmortization") || 0;
      form.setValue(
        "outstandingBalance",
        remainingMonths * monthlyAmortization
      );
    }, 0);
  }, [clientType, loanMaturityDate, amortizationWatch, form]);

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    if (!hasMounted) {
      setHasMounted(true);
      return;
    }

    if (isDoneCalculate) {
      calculate(form.getValues(), selectedCard);
    }
  }, [selectedCard]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.section
      className="w-full"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="mb-6 mt-6 relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 p-6 text-white shadow-md"
        variants={itemVariants}
      >
        <div className="relative z-10">
          <h3 className="text-2xl font-bold tracking-tight">
            AFP {clientType} Computation
          </h3>
          <p className="text-blue-100 mt-2">
            Calculate potential loan amount for clients with precision and ease
          </p>
        </div>
      </motion.div>

      <motion.div
        className="bg-white dark:bg-gray-950 rounded-lg shadow-md border border-gray-200 dark:border-gray-800"
        variants={itemVariants}
      >
        <div className="p-6 space-y-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleCompute)}
              className="space-y-6"
            >
              <LoanFormRegular
                form={form}
                selectedCard={selectedCard}
                onCardSelect={setSelectedCard}
                hasDeduction={hasDeduction}
                setHasDeduction={setHasDeduction}
                clientType={clientType}
                {...(clientType === "Renewal" && {
                  maturityDate: loanMaturityDate,
                  setMaturityDate: setLoanMaturityDate,
                })}
                isDoneCalculate={isDoneCalculate}
                hasFormErrors={hasFormErrors}
              />

              {isDoneCalculate && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ResultsDisplayRegular
                    {...results}
                    netAmount={netAmount}
                    valueDate={valueDate}
                    setValueDate={setValueDate}
                    maturityDate={maturityDate}
                    setMaturityDate={setMaturityDate}
                  />
                </motion.div>
              )}

              <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClear}
                  className="h-12 text-base transition-all duration-200 hover:border-red-300 hover:bg-red-50 dark:hover:bg-red-950/30"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Clear Computations
                </Button>

                <div className="flex items-center gap-3">
                  {isDoneCalculate && (
                    <Button
                      type="button"
                      onClick={handlePrint}
                      variant="outline"
                      className="h-12 text-base hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/30"
                    >
                      <PrinterIcon className="mr-2 h-4 w-4" />
                      Print Calculation
                    </Button>
                  )}

                  <Button
                    type="submit"
                    className="h-12 text-base bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 transition-all duration-200"
                    disabled={isCalculating}
                  >
                    {isCalculating ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Computing...
                      </>
                    ) : (
                      <>
                        <Calculator className="mr-2 h-4 w-4" />
                        Compute
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </motion.div>
    </motion.section>
  );
}
