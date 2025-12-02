// src/app/loans/add/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { mockLoanHistoryData } from "@/features/loans/data/mock-loans-data";
import { useLoanLogic } from "@/features/loans/hooks/use-loan-logic";
import { LoanHistory } from "@/features/loans/types/loan-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const addLoanSchema = z.object({
  dedCode: z.string(),
  monthlyAmortization: z.number().optional(),
  term: z.number().optional(),
  valueDate: z.string().optional(),
  maturityDate: z.string().optional(),
  // Add more fields as you need
});

type AddLoanFormValues = z.infer<typeof addLoanSchema>;

export default function AddLoanPage() {
  const router = useRouter();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [loanHistory] = useState<LoanHistory[]>(
    mockLoanHistoryData.map((l) => ({ ...l, clientId: "12345" })) // give them a clientId for demo
  );

  const { loanSets } = useLoanLogic(loanHistory, today);

  const form = useForm<AddLoanFormValues>({
    resolver: zodResolver(addLoanSchema),
    defaultValues: { dedCode: "" },
  });

  // ← THIS IS THE KEY: only run the effect once
  const hasRun = useRef(false);

  useEffect(() => {
    // Prevent double execution (React 18 StrictMode runs effects twice in dev)
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
        clientId: string;
        dedCode?: string;
        computationType: "New Client" | "Reloan" | "Additional" | "Renewal" | "Extension";
        monthlyAmortization?: number;
        term?: number;
        valueDate?: Date;
        maturityDate?: Date;
        // ... other fields from your calculator
      };

      // Determine correct DED Code
      let dedCode = "";
      if (data.computationType === "New Client" || data.computationType === "Reloan") {
        dedCode = "FI-1";
      } else if (data.computationType === "Additional") {
        const currentSet = loanSets[loanSets.length - 1] || [];
        const nextNum = currentSet.length + 1;
        dedCode = `FI-${nextNum}`;
      } else if (data.computationType === "Renewal" || data.computationType === "Extension") {
        dedCode = data.dedCode || "FI-1";
      }
      const formatDate = (date: Date | string | undefined): string | undefined => {
        if (!date) return undefined;
        if (typeof date === "string") return date.split("T")[0];
        return date.toISOString().split("T")[0];
      };
      form.reset({
        dedCode,
        monthlyAmortization: data.monthlyAmortization,
        term: data.term,
        valueDate: formatDate(data.valueDate),
        maturityDate: formatDate(data.maturityDate),
      });

      // Clean up ONLY after we successfully used the data
      sessionStorage.removeItem("pendingLoanData");
    } catch (err) {
      console.error(err);
      toast.error("Invalid computation data");
      router.replace("/clients");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (values: AddLoanFormValues) => {
    console.log("Loan created:", values);
    toast.success(`Loan ${values.dedCode} created successfully!`);
    // TODO: call your API here
    router.push("/clients/12345"); // replace with real clientId
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Add New Loan</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="dedCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>DED Code (Auto-generated)</FormLabel>
                <FormControl>
                  <Input {...field} disabled className="font-mono text-lg" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Add more fields as needed */}
          {form.watch("monthlyAmortization") && (
            <FormField
              control={form.control}
              name="monthlyAmortization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Amortization</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          )}

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" size="lg">
              Create Loan
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
