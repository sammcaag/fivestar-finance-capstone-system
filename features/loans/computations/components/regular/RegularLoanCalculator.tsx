"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { PrinterIcon, Calculator, ArrowRight, RefreshCw } from "lucide-react";
import LoanFormRegular from "./LoanFormRegular";
import ResultsDisplay from "./ResultsDisplayRegular";
import ClientTitleCard from "../ClientTitleCard";
import { useRegularCalculatorForm } from "../../hooks/use-regular-calculator-form";

interface RegularLoanCalculatorProps {
  clientType: "Renewal" | "New Client" | "Reloan" | "Additional";
}

export default function RegularLoanCalculator({
  clientType,
}: RegularLoanCalculatorProps) {
  const {
    calculatorForm,
    selectedCard,
    setSelectedCard,
    results,
    setHasDeduction,
    hasDeduction,
    valueDate,
    setValueDate,
    maturityDate,
    setMaturityDate,
    loanMaturityDate,
    setLoanMaturityDate,
    netAmount,
    isDoneCalculate,
    isCalculating,
    handleCompute,
    handleClear,
    handlePrint,
  } = useRegularCalculatorForm(clientType);

  const { handleSubmit } = calculatorForm;

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
        className="bg-white dark:bg-gray-950 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800"
        variants={itemVariants}
      >
        <Form {...calculatorForm}>
          <form
            onSubmit={handleSubmit(handleCompute)}
            className="p-6 space-y-8"
          >
            <LoanFormRegular
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
      </motion.div>
    </motion.section>
  );
}
