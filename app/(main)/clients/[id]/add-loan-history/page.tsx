// src/app/loans/add/page.tsx
"use client";

import BreadcrumbPages from "@/components/BreadcrumbPages";
import MainHeader from "@/components/MainHeader";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import { Form } from "@/components/ui/form";
import { useDialog } from "@/contexts/DialogContext";
import { useAuth } from "@/features/auth/context/AuthContext";
import useClientAnimation from "@/features/clients/hooks/use-client-animation";
import { createLoanComputationApi } from "@/features/loans/computations/api/loan-computation-service";
import { loanComputationPayloadFromPendingData } from "@/features/loans/computations/utils/loan-computation-payload";
import LoanHistoryInformation from "@/features/loans/history/components/LoanHistoryInformation";
import { useLoanHistoryForm } from "@/features/loans/history/hooks/use-loan-form";
import { useLoanStore } from "@/features/loans/history/lib/loan-history-store";
import { SimpleFormButtons } from "@/features/settings/components/SimpleFormButton";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function AddLoanPage() {
  const router = useRouter();
  const hasRun = useRef(false);

  const { loanSets } = useLoanStore();

  const { form, clearForm, processForm, isSubmitting } = useLoanHistoryForm();
  const [pendingClientId, setPendingClientId] = useState<number | null>(null);
  const [loanComputationId, setLoanComputationId] = useState<number | null>(null);
  const { showDialog } = useDialog();

  const { user } = useAuth();
  const branchId = user?.branchId;
  console.log("BRANCHHHHH", branchId);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const raw = sessionStorage.getItem("pendingLoanData");
    if (!raw) {
      showDialog("No computation data found. Redirecting...");
      return router.replace("/clients");
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

      (async () => {
        try {
          const payload = loanComputationPayloadFromPendingData(data);
          const created = await createLoanComputationApi(payload);
          setLoanComputationId(created.id);
        } catch (error) {
          console.error(error);
          toast.error("Failed to save computation data");
        }
      })();

      setPendingClientId(data.id);

      // Generate DED Code
      // Get current loan set (last group)
      const currentSet = loanSets[loanSets.length - 1] ?? [];
      let dedCode = "FI-1";

      if (data.computationType === "new_client" || data.computationType === "reloan") {
        dedCode = "FI-1";
      } else if (data.computationType === "additional") {
        // Extract highest FI number inside the last set
        const maxCode = currentSet.reduce((max, loan) => {
          const match = loan.dedCode?.match(/FI-(\d+)/);
          if (!match) return max;

          const num = parseInt(match[1], 10);
          return num > max ? num : max;
        }, 0);

        dedCode = `FI-${maxCode + 1}`;
      } else if (data.computationType === "renewal" || data.computationType === "extension") {
        dedCode = data.dedCode || "FI-1";
      }

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
            processor1Id: "",
            processor2Id: "",
            contactedById: "",
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
                if (pendingClientId === null) {
                  showDialog("No client ID found. Cannot submit form.");
                  return;
                }

                if (loanComputationId === null) {
                  showDialog("Computation data is still saving. Please try again.");
                  return;
                }

                processForm(branchId!, pendingClientId, loanComputationId, formValues);
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
                  if (pendingClientId === null) {
                    showDialog("No client ID found. Cannot submit form.");
                    return;
                  }

                  if (loanComputationId === null) {
                    showDialog("Computation data is still saving. Please try again.");
                    return;
                  }

                  processForm(branchId!, pendingClientId, loanComputationId, formValues);
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
