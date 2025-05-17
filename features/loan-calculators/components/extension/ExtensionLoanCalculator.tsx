"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FormValues } from "../../types/types-extension";
import LoanForm from "./LoanFormExtension";
import { Form } from "@/components/ui/form";
import ResultsDisplay from "./ResultsDisplayExtension";
import { Separator } from "@/components/ui/separator";
import { ResultsDisplayProps } from "../../types/types-extension";

import { Button } from "@/components/ui/button";
import { PrinterIcon } from "lucide-react";
import { ReferencesDisplayProps } from "../../types/types-extension";
import { extensionCalculatorChecker } from "../../schema/loan-calculation-zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useExtensionCalculator } from "../../hooks/use-extension-calculator";
import { toast } from "sonner";
import ReferencesDisplay from "./References";

const ExtensionLoanCalculator = () => {
  const { calculateExtensionLoan } = useExtensionCalculator();

  const form = useForm<FormValues>({
    resolver: zodResolver(extensionCalculatorChecker),
    defaultValues: {
      monthlyAmortization: 0,
      term: 0,
      settedMaturityDate: new Date(), //it works and can be seen on the console
      settedOutstandingBalance: 0,
      otherDeduction: 0,
    },
  });

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
  const [netAmount, setNetAmount] = useState<string>(`₱\t0.00`);

  const handleCompute = (values: FormValues) => {
    try {
      const calculationResults = calculateExtensionLoan(values);

      setIsDoneCalculate(true);

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
    } catch (error) {
      toast.error(error instanceof Error ? error.message : String(error));
      setIsDoneCalculate(false);
    }
  };

  const handleClear = () => {
    resetAll();
  };

  const resetAll = () => {
    form.reset();

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
  };

  const handlePrint = () => {
    window.print();
  };
  return (
    <section
      className={`w-full ${
        !isDoneCalculate
          ? "flex flex-col justify-center min-h-[calc(100vh-35%)]"
          : ""
      }`}
    >
      <div className="mb-10 mt-6">
        <h3 className="h3">AFP Extension Computation</h3>
        <p className="text-sm text-muted-foreground">
          Calculate potential loan amount of clients
        </p>
      </div>
      <CardContent className="space-y-6">
        {/* Form Component */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCompute)}
            className="space-y-6"
          >
            <LoanForm
              form={form}
              hasDeductions={hasDeductions}
              setHasDeductions={setHasDeductions}
            />

            <Separator className="mt-2 mb-8 w-full col-span-2" />

            {isDoneCalculate && (
              <>
                <ReferencesDisplay {...references} />

                <Separator className="mt-2 mb-8 w-full col-span-2" />

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

                <Separator className="my-4" />

                <Card className="mb-4">
                  <CardContent className="p-4 flex justify-between items-center">
                    <h3 className="text-lg font-semibold">NET Amount:</h3>
                    <span className="text-xl font-bold text-green-400">
                      {netAmount}
                    </span>
                  </CardContent>
                </Card>

                <Separator className="my-4" />
              </>
            )}

            {/* CardFooter Component: Displays the buttons for the form */}
            <CardFooter className="flex justify-between px-0 algin-center">
              <Button
                type="button"
                variant="outline"
                onClick={handleClear}
                effect={"shineHover"}
              >
                Clear Computations
              </Button>
              <div className="flex items-center space-x-2">
                {isDoneCalculate && (
                  <Button type="button" onClick={handlePrint} variant="outline">
                    <PrinterIcon className="mr-2 h-4 w-4" />
                    Print Calculation
                  </Button>
                )}
                <Button
                  type="submit"
                  className="bg-black text-white hover:bg-black/90"
                  effect={"ringHover"}
                >
                  Compute
                </Button>
              </div>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </section>
  );
};

export default ExtensionLoanCalculator;
