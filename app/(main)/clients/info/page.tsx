// src/features/clients/components/ClientInfoPage.tsx
"use client";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import BreadcrumbPages from "@/components/BreadcrumbPages";
import ClientInformation from "@/features/clients/components/ClientInformation";
import ClientProfileHeader from "@/features/clients/components/profile/ClientProfileHeader";
import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoanHistory } from "@/features/loans/types/loan-types";
import { mockLoanHistoryData } from "@/features/loans/data/mock-loans-data";
import { useLoanLogic } from "@/features/loans/hooks/use-loan-logic";
import { Button } from "@/components/ui/button";
import LoanHistoryTabs from "@/features/loans/components/LoanHistoryTabs";
import LoanActionModal from "@/features/loans/components/LoanActionModal";

export default function ClientInfoPage() {
  useEffect(() => {
    document.title = "Client Information | Stella - Five Star Finance Inc.";
  }, []);

  const router = useRouter();
  const [loanHistory, setLoanHistory] =
    useState<LoanHistory[]>(mockLoanHistoryData);
  const [selectedLoan, setSelectedLoan] = useState<LoanHistory | null>(null);
  const [isLoanHistory] = useState(true); // Toggle based on your logic; true for button, false for search
  const today = new Date("2025-11-13");
  today.setHours(0, 0, 0, 0);

  const { loanSets, buttonLabel } = useLoanLogic(loanHistory, today);

  const handleAddLoan = (type: string) => {
    const slug = type
      .toLowerCase()
      .replace(/ client loan$/, "")
      .replace(" ", "-");
    router.push(`/loans/computations/${slug}`);
  };

  const customHeaderRight = isLoanHistory ? (
    <Button
      variant="default"
      onClick={() => handleAddLoan(buttonLabel.replace("Add ", ""))}
    >
      {buttonLabel}
    </Button>
  ) : null;

  return (
    <ContentLayout title="Client Information">
      <BreadcrumbPages
        links={[
          { href: "/", label: "Home" },
          { href: "/clients", label: "Clients" },
          { href: "/clients/info", label: "Client Information" },
        ]}
      />
      <ClientProfileHeader />
      <ClientInfoInSuspense />
      <LoanHistoryTabs
        loanSets={loanSets}
        loanHistory={loanHistory}
        customHeaderRight={customHeaderRight}
        setSelectedLoan={setSelectedLoan}
        handleAddLoan={handleAddLoan}
        totalSets={loanSets.length}
      />
      <LoanActionModal
        selectedLoan={selectedLoan}
        setSelectedLoan={setSelectedLoan}
        today={today}
      />
    </ContentLayout>
  );
}

function ClientInfoInSuspense() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClientInformation />
    </Suspense>
  );
}
