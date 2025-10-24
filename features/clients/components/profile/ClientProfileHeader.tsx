import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { clientData } from "../../data/client-mock";
import { cn } from "@/lib/utils";
import { avatarFallBack } from "@/utils/avatar-fallback";
import { getAge } from "@/utils/get-age";
import { formatCurrency } from "@/features/loans/computations/utils/format-currency";

export default function ClientProfileHeader() {
  const age = getAge(clientData.dateOfBirth);

  const identityHighlights = [
    { label: "Age", value: age },
    { label: "Gender", value: clientData.gender },
    { label: "Civil Status", value: clientData.civilStatus },
    { label: "Rank", value: clientData.rank },
    { label: "Last Unit Assigned", value: clientData.lastUnitAssigned },
    { label: "Current Address", value: clientData.address.fullAddress },
  ].filter((item) => item.value);

  const clientBadge = [
    { label: "ID", value: clientData.id },
    { label: "Branch of Service", value: clientData.branchOfService },
    { label: "ATM Account Number", value: clientData.atmAccountNumber },
  ].filter((item) => item.value);

  const pensionDetails = [
    {
      id: 1,
      title: "Monthly Pension",
      details: formatCurrency(clientData.monthlyPension),
    },
    {
      id: 2,
      title: "Monthly Deduction",
      details: formatCurrency(clientData.monthlyDeduction),
    },
    {
      id: 3,
      title: "FI1",
      details: formatCurrency(clientData.fi1),
    },
    {
      id: 4,
      title: "Original Account",
      details: clientData.branch.name,
    },
  ].filter((item) => item.details);

  return (
    <Card className="overflow-hidden border border-border/50 shadow-md">
      <CardHeader className="relative bg-gradient-to-r from-primary via-primary/90 to-primary/70 text-primary-foreground p-8 pb-12">
        <Badge
          className={cn(
            "absolute right-6 top-6 flex items-center gap-2 rounded-full border border-white/20 px-4 py-1 text-sm font-semibold uppercase tracking-[0.2em] text-white",
            clientData.status === "ACTIVE"
              ? "bg-green-100 border-green-500 text-green-700"
              : "bg-red-100 border-red-500 text-red-700"
          )}
        >
          <span
            className={cn(
              "h-2 w-2 rounded-full",
              clientData.status === "ACTIVE" ? "bg-green-500" : "bg-red-500"
            )}
          />
          {clientData.status}
        </Badge>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:gap-10">
          <Avatar className="h-28 w-28 border-4 border-white/70 shadow-xl ring-4 ring-white/30 md:h-32 md:w-32">
            <AvatarImage
              src={clientData.profileImageUrl || "/placeholder.svg"}
              alt="Profile picture"
            />
            <AvatarFallback className="text-3xl bg-blue-100 text-primary">
              {avatarFallBack(clientData.fullName)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <CardTitle className="text-xs font-medium uppercase tracking-[0.3em] text-white/70">
                Client Profile
              </CardTitle>
              <CardDescription className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                {clientData.fullName}
              </CardDescription>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wide text-white/80">
              {clientBadge.map((item) => (
                <span
                  key={item.label}
                  className="rounded-full border border-white/20 bg-white/10 px-3 py-1"
                >
                  {item.label} • {item.value}
                </span>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)] p-6">
        <div className="space-y-6">
          {/* Identity Highlights */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {identityHighlights.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-border/60 p-4 shadow-sm hover-card"
              >
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {item.label}
                </p>
                <p className="mt-2 text-lg font-semibold text-foreground line-clamp-1 capitalize">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
          {/* Remarks */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-foreground">Remarks</h3>
            <div className="rounded-lg shadow-sm border border-border/60 p-4 text-sm leading-relaxed hover-card">
              <p>{clientData.remarks}</p>
            </div>
          </div>
        </div>
        {/* Pension Overview */}
        <Card className="border border-border/60 hover-card">
          <CardHeader>
            <CardTitle className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
              Pension Overview
            </CardTitle>
            <CardDescription className="text-lg font-semibold text-foreground">
              Financial Snapshot
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 ">
            {pensionDetails.map((detail) => (
              <div
                key={detail.id}
                className="flex items-center justify-between gap-6 "
              >
                <p className="text-sm font-medium text-muted-foreground">
                  {detail.title}
                </p>
                <p className="text-right text-lg font-semibold text-foreground">
                  {typeof detail.details === "number"
                    ? formatCurrency(detail.details)
                    : detail.details}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
