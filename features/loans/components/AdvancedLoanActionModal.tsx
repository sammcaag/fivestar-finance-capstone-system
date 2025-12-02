// src/features/loans/components/AdvancedLoanActionModal.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { monthsBetween } from "@/features/loans/utils/loan-utils";
import { formatToPhCurrency } from "@/utils/format-to-ph-currency";
import { CheckCircle, XCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { LoanHistoryPayload } from "../history/types/loan-form-types";

interface AdvancedLoanActionModalProps {
  selectedLoan: LoanHistoryPayload | null;
  setSelectedLoan: (loan: LoanHistoryPayload | null) => void;
  today: Date;
}

export default function AdvancedLoanActionModal({
  selectedLoan,
  setSelectedLoan,
  today,
}: AdvancedLoanActionModalProps) {
  const router = useRouter();
  const params = useParams();
  const clientId = params.id as string;

  if (!selectedLoan) return null;

  const valueDate = new Date(selectedLoan.valueDate);
  const maturityDate = new Date(selectedLoan.maturityDate);
  const monthsPaid = monthsBetween(valueDate, today);
  const termNum = parseInt(String(selectedLoan.term), 10);

  const isSettled = today > maturityDate;
  const eligibleForExtension = !isSettled && monthsPaid >= 6;
  const eligibleForRenewal = !isSettled && monthsPaid >= termNum / 2;

  const navigateToComputation = (type: "extension" | "renewal") => {
    // This flag is the key to enable "Proceed" button
    sessionStorage.setItem("fromClientProfile", "true");

    router.push(`/loans/computations/${type}?clientId=${clientId}&dedCode=${selectedLoan.dedCode}`);
    setSelectedLoan(null);
  };

  return (
    <Dialog open={!!selectedLoan} onOpenChange={() => setSelectedLoan(null)}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Loan Actions – {selectedLoan.dedCode}</DialogTitle>
          <DialogDescription>Available actions based on payment history</DialogDescription>
        </DialogHeader>

        <Separator />

        <Card className="border-none">
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Amount</p>
                <p className="font-semibold">
                  {formatToPhCurrency(selectedLoan.monthlyAmortization)}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Term</p>
                <p className="font-semibold">{selectedLoan.term} months</p>
              </div>
              <div>
                <p className="text-muted-foreground">Months Paid</p>
                <p className="font-semibold">
                  {monthsPaid} / {termNum}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Status</p>
                <Badge variant={selectedLoan.status === "PROCESS" ? "secondary" : "default"}>
                  {selectedLoan.status}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator />

        <div className="space-y-4">
          {isSettled ? (
            <div className="flex items-center gap-3 text-green-600">
              <CheckCircle className="h-6 w-6" />
              <p className="font-medium">Account is fully settled.</p>
            </div>
          ) : monthsPaid < 6 ? (
            <div className="flex items-center gap-3 text-red-600">
              <XCircle className="h-6 w-6" />
              <p className="font-medium">Not yet eligible (minimum 6 months required)</p>
            </div>
          ) : (
            <>
              {eligibleForExtension && (
                <div className="flex items-center justify-between p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-blue-600" />
                    <div>
                      <p className="font-semibold">Eligible for Extension</p>
                      <p className="text-sm text-muted-foreground">Paid ≥6 months</p>
                    </div>
                  </div>
                  <Button onClick={() => navigateToComputation("extension")}>
                    Add Extension Loan
                  </Button>
                </div>
              )}

              {eligibleForRenewal && (
                <div className="flex items-center justify-between p-4 rounded-lg bg-green-50 dark:bg-green-950/20">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <div>
                      <p className="font-semibold">Eligible for Renewal</p>
                      <p className="text-sm text-muted-foreground">Paid ≥50% of term</p>
                    </div>
                  </div>
                  <Button onClick={() => navigateToComputation("renewal")}>Add Renewal Loan</Button>
                </div>
              )}
            </>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setSelectedLoan(null)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
