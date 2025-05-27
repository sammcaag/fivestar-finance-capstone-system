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
import LoanForm from "./LoanFormRegular";
import ResultsDisplay from "./ResultsDisplayRegular";
import ClientTitleCard from "../ClientTitleCard";

interface RegularLoanCalculatorProps {
  clientType: string;
}

export default function RegularLoanCalculator({
  clientType,
}: RegularLoanCalculatorProps) {
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

  const amortizationWatch =
    clientType === "Renewal" ? form.watch("monthlyAmortization") : undefined;

  const calculate = (values: FormValues, selectedCard: string) => {
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
  };

  const handleCompute = (values: FormValues) => {
    calculate(values, selectedCard);
  };

  const handleClear = () => {
    form.reset();
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

    // Ensure outstandingBalance updates AFTER remainingMonths is set
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
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
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
              <LoanForm
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
              />

              {isDoneCalculate && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <ResultsDisplay
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
                  className="group transition-all duration-300 hover:border-red-300 hover:bg-red-50 dark:hover:bg-red-950/30"
                >
                  <RefreshCw className="mr-2 h-4 w-4 transition-transform group-hover:rotate-180" />
                  Clear Computations
                </Button>

                <div className="flex items-center gap-3">
                  {isDoneCalculate && (
                    <Button
                      type="button"
                      onClick={handlePrint}
                      variant="outline"
                      className="hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/30"
                    >
                      <PrinterIcon className="mr-2 h-4 w-4" />
                      Print Calculation
                    </Button>
                  )}

                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 transition-all duration-300"
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
