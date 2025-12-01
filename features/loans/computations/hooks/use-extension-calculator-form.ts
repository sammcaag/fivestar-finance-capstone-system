import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { extensionCalculatorSchema } from "../schema/loan-extension-schema";
import { useExtensionCalculator } from "../hooks/use-extension-calculator";
import type {
  FormValues,
  ResultsDisplayProps,
  ReferencesDisplayProps,
} from "../types/types-extension";
import { useState } from "react";
import { useEffect } from "react";
import { extensionCalculatorDefaultValues } from "../schema/loan-extension-schema";
import { toast } from "sonner";

export const useExtensionCalculatorForm = () => {
  const extensionForm = useForm<FormValues>({
    resolver: zodResolver(extensionCalculatorSchema),
    defaultValues: extensionCalculatorDefaultValues,
    mode: "onSubmit", // Prevent premature validation
  });

  const {
    watch,
    formState: { errors },
    reset,
  } = extensionForm;

  const { calculateExtensionLoan } = useExtensionCalculator();

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

  const [extensionValueDate, setExtensionValueDate] = useState<Date>(new Date());
  const [extensionMaturityDate, setExtensionMaturityDate] = useState<Date>(new Date());
  const [renewalExtensionValueDate, setRenewalExtensionValueDate] = useState<Date>(new Date());
  const [renewalExtensionMaturityDate, setRenewalExtensionMaturityDate] = useState<Date>(
    new Date()
  );

  const [hasDeductions, setHasDeductions] = useState<boolean>(false);
  const [isDoneCalculate, setIsDoneCalculate] = useState<boolean>(false);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [netAmount, setNetAmount] = useState<string>(`₱\t0.00`);

  // Watch for form errors
  useEffect(() => {
    const subscription = watch(() => {
      // Check if there are any errors in the form
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  const handleCompute = (values: FormValues) => {
    // Check if there are any validation errors
    if (Object.keys(errors).length > 0) {
      toast.error("Please fix the form errors before computing");
      return;
    }

    try {
      setIsCalculating(true);

      // Simulate calculation delay for better UX
      setTimeout(() => {
        const calculationResults = calculateExtensionLoan(values);

        setResults(calculationResults.results);
        setReferences(calculationResults.references);
        setExtensionValueDate(calculationResults.extensionValueDate);
        setExtensionMaturityDate(calculationResults.extensionMaturityDate);
        setRenewalExtensionValueDate(calculationResults.renewalExtensionValueDate);
        setRenewalExtensionMaturityDate(calculationResults.renewalExtensionMaturityDate);
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
    reset({
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

    toast.success("Computation cleared successfully");
  };

  const handlePrint = () => {
    toast.info("Preparing document for printing...");
    setTimeout(() => {
      window.print();
    }, 500);
  };
  return {
    extensionForm,
    handleCompute,
    handleClear,
    handlePrint,
    isCalculating,
    isDoneCalculate,
    netAmount,
    results,
    references,
    extensionValueDate,
    setExtensionValueDate,
    extensionMaturityDate,
    setExtensionMaturityDate,
    renewalExtensionValueDate,
    setRenewalExtensionValueDate,
    renewalExtensionMaturityDate,
    setRenewalExtensionMaturityDate,
    hasDeductions,
    setHasDeductions,
  };
};
