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
import { useLoanStore } from "@/features/loans/history/lib/loan-history-store";
import { LoanHistoryProductType } from "@/features/loans/history/types/loan-form-types";
import { SimpleFormButtons } from "@/features/settings/components/SimpleFormButton";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export default function AddLoanPage() {
  const router = useRouter();
  const hasRun = useRef(false);

  const { loanSets } = useLoanStore();

  const { form, clearForm, processForm, isSubmitting } = useLoanHistoryForm();

  const { user } = useAuth();
  const branchId = user?.branchId;
  console.log("BRANCHHHHH", branchId);

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
        computationType: "new_client" | "reloan" | "additional" | "renewal" | "extension";
        id: number;
        clientId: string;
        dedCode?: string;
        monthlyAmortization?: number;
        term?: number;
        valueDate?: Date;
        maturityDate?: Date;
        settedMaturityDate?: Date;
        netAmount?: string;
        results?: any;
        otherDeduction?: number;
        outstandingBalance?: number;
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
      if (data.computationType === "new_client" || data.computationType === "reloan") {
        dedCode = "FI-1";
      } else if (data.computationType === "additional") {
        const currentSet = loanSets[loanSets.length - 1] || [];
        dedCode = `FI-${currentSet.length + 1}`;
      } else if (data.computationType === "renewal" || data.computationType === "extension") {
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
            dedCode: dedCode,
            productType: data.computationType,
            monthlyAmortization: data.monthlyAmortization || 0,
            term: data.term || 0,
            valueDate: data.valueDate ? new Date(data.valueDate) : undefined,
            maturityDate: data.maturityDate ? new Date(data.maturityDate) : undefined,
            settedMaturityDate: data.settedMaturityDate
              ? new Date(data.settedMaturityDate)
              : undefined,
            accountNumber: "",
            pnNumber: "",
            outstandingBalance: data.outstandingBalance,
            otherDeduction: data.otherDeduction,
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
                processForm(branchId!, id, formValues);
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
                  processForm(branchId!, id, formValues);
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
