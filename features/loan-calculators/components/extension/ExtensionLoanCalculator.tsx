"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { PrinterIcon, Calculator, ArrowRight, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { extensionCalculatorChecker } from "../../schema/loan-calculation-zod-schema";
import { useExtensionCalculator } from "../../hooks/use-extension-calculator";
import type {
  FormValues,
  ResultsDisplayProps,
  ReferencesDisplayProps,
} from "../../types/types-extension";
import LoanForm from "./LoanFormExtension";
import ReferencesDisplay from "./References";
import ResultsDisplay from "./ResultsDisplayExtension";

export default function ExtensionLoanCalculator() {
  const { calculateExtensionLoan } = useExtensionCalculator();

  const form = useForm<FormValues>({
    resolver: zodResolver(extensionCalculatorChecker),
    defaultValues: {
      monthlyAmortization: 0,
      term: 0,
      settedMaturityDate: new Date(),
      settedOutstandingBalance: 0,
      otherDeduction: 0,
    },
    mode: "onSubmit", // Prevent premature validation
  });

  // States
  const [results, setResults] = useState<ResultsDisplayProps>({
    extensionOiRate: "0.00",
    extensionGpFactor: "0.00",
    extensionPrincipalAmount: "0.00",
    extensionUnearnedInterest: "0.00",
    extensionGrossProceeds: "0.00",
    extensionDocumentaryStamp: "0.00",
    extensionGrossRevenueTax: "0.00",
    extensionInsurance: "0.00",
    extensionTotal: "0.00",
    renewalExtensionEffectiveInterestRate: "0.00",
    renewalExtensionGpFactor: "0.00",
    renewalExtensionPrincipalAmount: "0.00",
    renewalExtensionUnearnedInterest: "0.00",
    renewalExtensionGrossProceeds: "0.00",
    renewalExtensionDocumentaryStamp: "0.00",
    renewalExtensionGrossRevenueTax: "0.00",
    renewalExtensionInsurance: "0.00",
    renewalExtensionTotal: "0.00",
  });

  const [references, setReferences] = useState<ReferencesDisplayProps>({
    oiTerm: "0.00",
    reneTerm: "0.00",
    oiExtension: "0.00",
    proceedsOfLoan: "0.00",
    outstandingBalance: "0.00",
    rebates: "0.00",
    newUi: "0.00",
    newGp: "0.00",
  });

  const [extensionValueDate, setExtensionValueDate] = useState<Date>(
    new Date()
  );
  const [extensionMaturityDate, setExtensionMaturityDate] = useState<Date>(
    new Date()
  );
  const [renewalExtensionValueDate, setRenewalExtensionValueDate] =
    useState<Date>(new Date());
  const [renewalExtensionMaturityDate, setRenewalExtensionMaturityDate] =
    useState<Date>(new Date());

  const [hasDeductions, setHasDeductions] = useState<boolean>(false);
  const [isDoneCalculate, setIsDoneCalculate] = useState<boolean>(false);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [hasFormErrors, setHasFormErrors] = useState<boolean>(false);
  const [netAmount, setNetAmount] = useState<string>(`₱\t0.00`);

  // Watch for form errors
  useEffect(() => {
    const subscription = form.watch(() => {
      // Check if there are any errors in the form
      const hasErrors = Object.keys(form.formState.errors).length > 0;
      setHasFormErrors(hasErrors);
    });

    return () => subscription.unsubscribe();
  }, [form, form.formState, form.watch]);

  const handleCompute = (values: FormValues) => {
    // Check if there are any validation errors
    if (Object.keys(form.formState.errors).length > 0) {
      setHasFormErrors(true);
      toast.error("Please fix the form errors before computing");
      return;
    }

    try {
      setIsCalculating(true);
      setHasFormErrors(false);

      // Simulate calculation delay for better UX
      setTimeout(() => {
        const calculationResults = calculateExtensionLoan(values);

        setResults(calculationResults.results);
        setReferences(calculationResults.references);
        setExtensionValueDate(calculationResults.extensionValueDate);
        setExtensionMaturityDate(calculationResults.extensionMaturityDate);
        setRenewalExtensionValueDate(
          calculationResults.renewalExtensionValueDate
        );
        setRenewalExtensionMaturityDate(
          calculationResults.renewalExtensionMaturityDate
        );
        setNetAmount(`₱\t${calculationResults.netAmount}`);
        setIsDoneCalculate(true);
        setIsCalculating(false);
      }, 600);
    } catch (error) {
      setIsCalculating(false);
      toast.error(error instanceof Error ? error.message : String(error));
    }
  };

  const handleClear = () => {
    form.reset({
      monthlyAmortization: 0,
      term: 0,
      settedMaturityDate: new Date(),
      settedOutstandingBalance: 0,
      otherDeduction: 0,
    });
    setResults({
      extensionOiRate: "0.00",
      extensionGpFactor: "0.00",
      extensionPrincipalAmount: "0.00",
      extensionUnearnedInterest: "0.00",
      extensionGrossProceeds: "0.00",
      extensionDocumentaryStamp: "0.00",
      extensionGrossRevenueTax: "0.00",
      extensionInsurance: "0.00",
      extensionTotal: "0.00",
      renewalExtensionEffectiveInterestRate: "0.00",
      renewalExtensionGpFactor: "0.00",
      renewalExtensionPrincipalAmount: "0.00",
      renewalExtensionUnearnedInterest: "0.00",
      renewalExtensionGrossProceeds: "0.00",
      renewalExtensionDocumentaryStamp: "0.00",
      renewalExtensionGrossRevenueTax: "0.00",
      renewalExtensionInsurance: "0.00",
      renewalExtensionTotal: "0.00",
    });
    setReferences({
      oiTerm: "0.00",
      reneTerm: "0.00",
      oiExtension: "0.00",
      proceedsOfLoan: "0.00",
      outstandingBalance: "0.00",
      rebates: "0.00",
      newUi: "0.00",
      newGp: "0.00",
    });
    setExtensionValueDate(new Date());
    setExtensionMaturityDate(new Date());
    setRenewalExtensionValueDate(new Date());
    setRenewalExtensionMaturityDate(new Date());
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
      <motion.div
        className="mb-8 mt-6 relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 p-8 text-white shadow-lg"
        variants={itemVariants}
      >
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>

        <div className="relative z-10">
          <h3 className="text-3xl font-bold tracking-tight">
            AFP Extension Computation
          </h3>
          <p className="text-blue-100 mt-2">
            Calculate extension loan amount for clients with precision and ease
          </p>
        </div>
      </motion.div>

      <motion.div
        className="bg-white dark:bg-gray-950 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800"
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
                hasDeductions={hasDeductions}
                setHasDeductions={setHasDeductions}
                // hasFormErrors={hasFormErrors}
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
                    setRenewalExtensionMaturityDate={
                      setRenewalExtensionMaturityDate
                    }
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
