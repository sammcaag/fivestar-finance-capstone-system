import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { User } from "lucide-react";
import { MainLoansHistoryTable } from "@/features/loans/components/tables/MainLoansHistoryTable";

export default function LoanHistoryTab() {
  return (
    <TabsContent value="loan-history" className="mt-3">
      <Card className="border">
        <CardHeader className="flex gap-4 flex-row items-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <User className="h-5 w-5" />
          </span>
          <div>
            <CardTitle className="text-xl">Loan History</CardTitle>
            <CardDescription>
              Review the client's past and current loan applications, payment
              records, and status updates.
            </CardDescription>
          </div>
        </CardHeader>
        <Separator />
        <MainLoansHistoryTable />
      </Card>
    </TabsContent>
  );
}
