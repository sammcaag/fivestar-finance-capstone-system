// src/features/clients/components/LoanActionModal.tsx
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LoanHistory } from "@/features/loans/types/loan-types";
import { useRouter } from "next/navigation";
import { monthsBetween } from "../utils/loan-utils";

interface LoanActionModalProps {
  selectedLoan: LoanHistory | null;
  setSelectedLoan: (loan: LoanHistory | null) => void;
  today: Date;
}

export default function LoanActionModal({
  selectedLoan,
  setSelectedLoan,
  today,
}: LoanActionModalProps) {
  const router = useRouter();

  const handleExtensionOrRenewal = (loan: LoanHistory, type: string) => {
    const slug = type
      .toLowerCase()
      .replace(/ client loan$/, "")
      .replace(" ", "-");
    router.push(`/loans/computations/${slug}?dedCode=${loan.dedCode}`);
    setSelectedLoan(null);
  };

  const getModalContent = (loan: LoanHistory) => {
    const valueD = new Date(loan.valueDate);
    const maturityD = new Date(loan.maturityDate);
    if (today > maturityD) {
      return (
        <>
          <DialogHeader>
            <DialogTitle>Account Settled</DialogTitle>
            <DialogDescription>
              This account is already settled; no further action is needed.
            </DialogDescription>
          </DialogHeader>
        </>
      );
    }
    const monthsPaid = monthsBetween(valueD, today);
    const termNum = parseInt(loan.term);
    if (monthsPaid < 6) {
      return (
        <>
          <DialogHeader>
            <DialogTitle>Not Qualified</DialogTitle>
            <DialogDescription>
              Client is not yet qualified for another loan on this account.
            </DialogDescription>
          </DialogHeader>
        </>
      );
    } else if (monthsPaid < termNum / 2) {
      return (
        <>
          <DialogHeader>
            <DialogTitle>Add Extension</DialogTitle>
            <DialogDescription>Client has paid at least 6 months.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => handleExtensionOrRenewal(loan, "Extension Client Loan")}>
              Add Extension Client Loan
            </Button>
          </DialogFooter>
        </>
      );
    } else {
      return (
        <>
          <DialogHeader>
            <DialogTitle>Add Renewal</DialogTitle>
            <DialogDescription>Client has paid half or more of their total term.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => handleExtensionOrRenewal(loan, "Renewal Client Loan")}>
              Add Renewal Client Loan
            </Button>
          </DialogFooter>
        </>
      );
    }
  };

  return (
    <Dialog open={!!selectedLoan} onOpenChange={(open) => !open && setSelectedLoan(null)}>
      <DialogContent>{selectedLoan && getModalContent(selectedLoan)}</DialogContent>
    </Dialog>
  );
}
