// src/features/clients/components/ClientInfoPage.tsx
"use client";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import BreadcrumbPages from "@/components/BreadcrumbPages";
import ClientInformation from "@/features/clients/components/ClientInformation";
import { Suspense, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { LoanHistory } from "@/features/loans/types/loan-types";
import { mockLoanHistoryData } from "@/features/loans/data/mock-loans-data";
import { useLoanLogic } from "@/features/loans/hooks/use-loan-logic";
import { Button } from "@/components/ui/button";
import LoanHistoryTabs from "@/features/loans/components/LoanHistoryTabs";
import LoanActionModal from "@/features/loans/components/LoanActionModal";
import { useQuery } from "@tanstack/react-query";
import { ClientPayload } from "@/features/clients/types/client-types";
import { getClientBySerialNumber } from "@/features/clients/api/client-service";
import ClientProfileHeaderSkeleton from "@/features/clients/components/profile/ClientProfileHeaderSkeleton";

export default function ClientInfoPage() {
  useEffect(() => {
    document.title = "Client Information | Stella - Five Star Finance Inc.";
  }, []);

  const params = useParams();
  const serialNumber = params.id as string;

  const { data: clientData, isLoading } = useQuery<ClientPayload>({
    queryKey: ["clientBySerialNumber", serialNumber],
    queryFn: () => getClientBySerialNumber(serialNumber),
  });

  const router = useRouter();
  const [loanHistory] = useState<LoanHistory[]>(mockLoanHistoryData);
  const [selectedLoan, setSelectedLoan] = useState<LoanHistory | null>(null);
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

  const customHeaderRight = (
    <Button
      variant="default"
      onClick={() => handleAddLoan(buttonLabel.replace("Add ", ""))}
    >
      {buttonLabel}
    </Button>
  );

  return (
    <ContentLayout title="Client Information">
      <BreadcrumbPages
        links={[
          { href: "/", label: "Home" },
          { href: "/clients", label: "Clients" },
          { href: "/clients/info", label: "Client Information" },
        ]}
      />
      {!isLoading && clientData ? (
        <ClientInfoInSuspense client={clientData} />
      ) : (
        <ClientProfileHeaderSkeleton />
      )}
      <LoanHistoryTabs
        loanSets={loanSets}
        loanHistory={loanHistory}
        isLoading={isLoading}
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

const ClientInfoInSuspense = ({ client }: { client: ClientPayload }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClientInformation client={client} />
    </Suspense>
  );
};
