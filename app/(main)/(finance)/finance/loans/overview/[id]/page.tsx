// src/app/(main)/clients/[id]/page.tsx
"use client";

import BreadcrumbPages from "@/components/BreadcrumbPages";
import Loading from "@/components/LoadingPage";
import NotFoundPage from "@/components/NotFoundPage";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import { Button } from "@/components/ui/button";
import { useDialog } from "@/contexts/DialogContext";
import { getClientBySerialNumber } from "@/features/clients/api/client-service";
import ClientProfileHeader from "@/features/clients/components/profile/ClientProfileHeader";
import ClientProfileHeaderSkeleton from "@/features/clients/components/skeletons/ClientProfileHeaderSkeleton";
import { ClientPayload } from "@/features/clients/types/client-types";
import AdvancedLoanActionModal from "@/features/loans/components/AdvancedLoanActionModal";
import LoanHistoryTabs from "@/features/loans/components/LoanHistoryTabs";
import { useLoanLogic } from "@/features/loans/history/hooks/use-loan-logic";
import { useLoanStore } from "@/features/loans/history/lib/loan-history-store";
import { LoanHistoryPayload } from "@/features/loans/history/types/loan-form-types";
import { decodeFullName } from "@/utils/decode-full-name";
import { formatFullAddress } from "@/utils/format-full-address";
import { formatFullNameFromParts } from "@/utils/format-full-name-from-parts";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function ClientInfoPage() {
  useEffect(() => {
    document.title = "Client Information | Stella - Five Star Finance Inc.";
  }, []);

  const params = useParams();
  const serialNumber = params.id as string;
  const router = useRouter();
  const { showDialog } = useDialog();

  const {
    data: clientData,
    isLoading,
    refetch,
  } = useQuery<ClientPayload>({
    queryKey: ["clientBySerialNumber", serialNumber],
    queryFn: () => getClientBySerialNumber(serialNumber),
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    refetch();
  }, [serialNumber]);

  const [loanHistory, setLoanHistory] = useState<LoanHistoryPayload[]>([]);
  const [selectedLoan, setSelectedLoan] = useState<LoanHistoryPayload | null>(null);
  const today = new Date("2025-11-13");
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    if (clientData?.clientLoanHistory) {
      setLoanHistory(clientData.clientLoanHistory);
    }
  }, [clientData]);

  const { loanSets, buttonLabel } = useLoanLogic(loanHistory, today);

  const { setLoanSets, setClientSerialNumber } = useLoanStore();

  useEffect(() => {
    if (serialNumber) {
      setClientSerialNumber(serialNumber);
    }
  }, [serialNumber]);

  useEffect(() => {
    if (loanSets.length > 0) {
      setLoanSets(loanSets);
    }
  }, [loanSets]);

  const canAddLoan =
    clientData?.approvalStatus?.toUpperCase() === "APPROVED" &&
    selectedLoan?.approvalStatus?.toUpperCase() === "APPROVED";

  // Unified handler — now accepts any string (matches LoanHistoryTabs props)
  const handleAddNewLoan = (type: string) => {
    if (!canAddLoan) return showDialog("Client Information is NOT APPROVED", "error", 2);

    sessionStorage.setItem("fromClientProfile", "true");
    const slug = type
      .toLowerCase()
      .replace(/ client loan$/, "")
      .replace(" ", "-");
    router.push(`/loans/computations/${slug}?id=${clientData!.id}&clientId=${serialNumber}`);
  };

  const customHeaderRight = (
    <Button
      onClick={() => {
        const lower = buttonLabel.toLowerCase();
        if (lower.includes("new")) handleAddNewLoan("new-client");
        else if (lower.includes("reloan")) handleAddNewLoan("reloan");
        else handleAddNewLoan("additional");
      }}
    >
      {buttonLabel}
    </Button>
  );

  return (
    <ContentLayout title="Client Loans Information">
      <BreadcrumbPages
        links={[
          { href: "/", label: "Verification" },
          { href: "/finance/loans", label: "Loans Overview" },
          { href: `/finance/loans/${serialNumber}`, label: serialNumber },
        ]}
      />

      {isLoading ? (
        <ClientProfileHeaderSkeleton />
      ) : clientData ? (
        <>
          <ClientInfoInSuspense client={clientData} />
          <LoanHistoryTabs
            loanSets={loanSets}
            loanHistory={loanHistory}
            isLoading={isLoading}
            customHeaderRight={customHeaderRight}
            setSelectedLoan={setSelectedLoan}
            handleAddLoan={handleAddNewLoan} // now matches the expected type
            totalSets={loanSets.length}
          />
          <AdvancedLoanActionModal
            id={clientData!.id}
            selectedLoan={selectedLoan}
            setSelectedLoan={setSelectedLoan}
            today={today}
            allLoans={loanHistory}
            canAddLoan={canAddLoan}
          />
        </>
      ) : (
        <NotFoundPage title="Client Loan History" />
      )}
    </ContentLayout>
  );
}

const ClientInfoInSuspense = ({ client }: { client: ClientPayload }) => (
  <Suspense fallback={<Loading />}>
    <ClientProfileHeader
      birthDate={client.birthDate}
      gender={client.gender}
      civilStatus={client.civilStatus}
      rank={client.clientPension.rank}
      lastUnitAssigned={client.clientPension.lastUnitAssigned}
      address={formatFullAddress(client.address)}
      serialNumber={client.clientPension.serialNumber}
      branchOfService={client.clientPension.branchOfService}
      monthlyPension={client.clientAccount.monthlyPension}
      monthlyDeduction={client.clientAccount.monthlyDeduction}
      approvalStatus={client.approvalStatus ?? "PENDING"}
      fullName={formatFullNameFromParts(decodeFullName(client.fullName))}
      profileImageUrl={client.profileImageUrl}
      remarks={client.remarks}
      branchName={client.branch!.name.replace(/branch/i, "").trim()}
    />
  </Suspense>
);
