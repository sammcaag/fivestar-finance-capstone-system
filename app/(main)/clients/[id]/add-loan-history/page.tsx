// src/app/loans/add/page.tsx
"use client";

import BreadcrumbPages from "@/components/BreadcrumbPages";
import MainHeader from "@/components/MainHeader";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import { Form } from "@/components/ui/form";
import { useAuth } from "@/features/auth/context/AuthContext";
import useClientAnimation from "@/features/clients/hooks/use-client-animation";
import LoanHistoryInformation from "@/features/loans/history/components/LoanHistoryInformation";
import { useLoanHistoryForm } from "@/features/loans/history/hooks/use-loan-form";
import { useLoanLogic } from "@/features/loans/history/hooks/use-loan-logic";
import { LoanHistoryProductType } from "@/features/loans/history/types/loan-form-types";
import { SimpleFormButtons } from "@/features/settings/components/SimpleFormButton";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export default function AddLoanPage() {
  const router = useRouter();
  const hasRun = useRef(false);

  // Mock data — replace with real client loans later
  const mockLoanHistory = [{ clientId: "2", dedCode: "FI-1", term: 24, status: "active" } as any];
  const { loanSets } = useLoanLogic(mockLoanHistory, new Date());

  const { form, clearForm, processForm, isSubmitting } = useLoanHistoryForm();

  const { user } = useAuth();
  const branchId = user!.branchId;

  let id: number;

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const raw = sessionStorage.getItem("pendingLoanData");
    if (!raw) {
      toast.error("No computation data found. Redirecting...");
      router.replace("/clients");
      return;
    }

    try {
      const data = JSON.parse(raw) as {
        computationType: "New Client" | "Reloan" | "Additional" | "Renewal" | "Extension";
        id: number;
        clientId: string;
        dedCode?: string;
        monthlyAmortization?: number;
        term?: number;
        valueDate?: Date;
        maturityDate?: Date;
        netAmount?: string;
        results?: any;
      };

      id = data.id;

      // Map computation type → productType
      const productTypeMap: Record<string, LoanHistoryProductType> = {
        "New Client": "new_client",
        Reloan: "reloan",
        Additional: "additional",
        Renewal: "renewal",
        Extension: "extension",
      };
      // Generate DED Code
      let dedCode = "";
      if (data.computationType === "New Client" || data.computationType === "Reloan") {
        dedCode = "FI-1";
      } else if (data.computationType === "Additional") {
        const currentSet = loanSets[loanSets.length - 1] || [];
        dedCode = `FI-${currentSet.length + 1}`;
      } else if (data.computationType === "Renewal" || data.computationType === "Extension") {
        dedCode = data.dedCode || "FI-1";
      }

      const formatDate = (date: Date | string | undefined): string => {
        if (!date) return "";
        if (typeof date === "string") return date.split("T")[0];
        return date.toISOString().split("T")[0];
      };

      setTimeout(
        () =>
          form.reset({
            dedCode: data.dedCode || "",
            productType: productTypeMap[data.computationType],
            monthlyAmortization: data.monthlyAmortization || 0,
            term: data.term || 0,
            valueDate: data.valueDate ? new Date(data.valueDate) : undefined,
            maturityDate: data.maturityDate ? new Date(data.maturityDate) : undefined,
            settedMaturityDate: undefined,
            accountNumber: "",
            pnNumber: "",
            outstandingBalance: undefined,
            otherDeduction: undefined,
            processor1Id: 0,
            processor2Id: 0,
            contactedById: 0,
          }),
        0
      );

      sessionStorage.removeItem("pendingLoanData");
      toast.success(`Ready to create ${data.computationType} loan`);
    } catch (err) {
      console.error(err);
      toast.error("Invalid computation data");
      router.replace("/clients");
    }
  }, [form, loanSets, router]);

  const { itemVariants } = useClientAnimation();

  return (
    <ContentLayout title="Register Loan Details">
      <BreadcrumbPages
        links={[
          { href: "/dashboard", label: "Home" },
          { href: "/branch", label: "Branch" },
          { href: "/branch/register", label: "Register Branch" },
        ]}
      />

      <MainHeader
        title="Register Loan Details"
        description="Easily onboard loan history by filling in the fields with their exact information."
      />

      <motion.div
        className="w-full mx-auto mt-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-background rounded-lg shadow-lg border mt-10">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((formValues) => {
                processForm(branchId, id, formValues);
              })}
              className="p-6"
            >
              <div className="relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    variants={itemVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    <LoanHistoryInformation form={form} />
                  </motion.div>
                </AnimatePresence>
              </div>

              <SimpleFormButtons
                isEditMode={false} // if register form
                isSubmitting={isSubmitting}
                onSubmit={form.handleSubmit((formValues) => {
                  processForm(branchId, id, formValues);
                })}
                onClearForm={clearForm}
              />
            </form>
          </Form>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
