"use client";
import MainHeader from "@/components/MainHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { ArrowRight, Calculator, PrinterIcon, RefreshCw } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useExtensionCalculatorForm } from "../hooks/use-extension-calculator-form";
import LoanFormExtension from "./extension/LoanFormExtension";
import ReferencesDisplay from "./extension/References";
import ResultsDisplay from "./extension/ResultsDisplayExtension";

export default function ExtensionLoanCalculator() {
  const {
    extensionForm,
    setExtensionValueDate,
    setExtensionMaturityDate,
    setRenewalExtensionValueDate,
    setRenewalExtensionMaturityDate,
    handleCompute,
    handleClear,
    handlePrint,
    isCalculating,
    isDoneCalculate,
    netAmount,
    results,
    references,
    extensionValueDate,
    extensionMaturityDate,
    renewalExtensionValueDate,
    renewalExtensionMaturityDate,
    hasDeductions,
    setHasDeductions,
  } = useExtensionCalculatorForm();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const searchParams = useSearchParams();
  const fromClient = sessionStorage.getItem("fromClientProfile") === "true";

  useEffect(() => {
    if (fromClient) {
      sessionStorage.removeItem("fromClientProfile"); // clear after use
    }
  }, [fromClient]);

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
      className="w-full space-y-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <MainHeader
        title="AFP Extension Computation"
        description="Calculate potential extension loan amount for clients with precision and ease"
      />

      <motion.div
        className="bg-white dark:bg-gray-950 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800"
        variants={itemVariants}
      >
        <Form {...extensionForm}>
          <form onSubmit={extensionForm.handleSubmit(handleCompute)} className="space-y-8 p-6">
            <LoanFormExtension
              form={extensionForm}
              hasDeductions={hasDeductions}
              setHasDeductions={setHasDeductions}
            />

            {isDoneCalculate && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <ReferencesDisplay {...references} />

                <Separator className="my-8" />

                <ResultsDisplay
                  {...results}
                  extensionValueDate={extensionValueDate}
                  setExtensionValueDate={setExtensionValueDate}
                  extensionMaturityDate={extensionMaturityDate}
                  setExtensionMaturityDate={setExtensionMaturityDate}
                  renewalExtensionValueDate={renewalExtensionValueDate}
                  setRenewalExtensionValueDate={setRenewalExtensionValueDate}
                  renewalExtensionMaturityDate={renewalExtensionMaturityDate}
                  setRenewalExtensionMaturityDate={setRenewalExtensionMaturityDate}
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Card className="overflow-hidden border-none shadow-lg bg-gradient-to-r from-green-50 to-emerald-100 dark:from-green-950/40 dark:to-emerald-900/20">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <h3 className="text-xl font-bold">NET Amount:</h3>
                        <motion.span
                          className="text-3xl font-bold text-green-600 dark:text-green-400"
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 10,
                            delay: 0.5,
                          }}
                        >
                          {netAmount}
                        </motion.span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
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
                  ) : fromClient && isDoneCalculate ? (
                    <>
                      Proceed
                      <ArrowRight className="ml-2 h-4 w-4" />
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
