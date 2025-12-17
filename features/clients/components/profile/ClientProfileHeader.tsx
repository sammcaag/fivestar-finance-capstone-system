import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/features/loans/computations/utils/format-currency";
import { cn } from "@/lib/utils";
import { avatarFallBack } from "@/utils/avatar-fallback";
import { formatDateToReadable } from "@/utils/format-date-to-readable";
import { getAge } from "@/utils/get-age";
import { ApprovalStatus, statusStyles } from "../../types/client-types";

interface IClientProfile {
  birthDate: Date;
  gender: string;
  civilStatus: string;
  rank: string;
  lastUnitAssigned: string;
  address: string;
  serialNumber: string;
  branchOfService: string;
  monthlyPension: number;
  monthlyDeduction: number;
  approvalStatus: string;
  fullName: string;
  profileImageUrl?: string;
  remarks?: string;
  branchName: string;
  deceasedAt?: Date;
}

export default function ClientProfileHeader({
  birthDate,
  gender,
  rank,
  address,
  serialNumber,
  branchOfService,
  monthlyPension,
  monthlyDeduction,
  approvalStatus,
  fullName,
  profileImageUrl,
  remarks,
  branchName,
  deceasedAt = new Date(),
}: IClientProfile) {
  const age = getAge(birthDate);

  const identityHighlights = [
    { label: "Rank", value: rank },
    { label: "Age", value: age },
    { label: "Gender", value: gender },
  ].filter((item) => item.value);

  const clientBadge = [
    { label: "ID", value: serialNumber },
    {
      label: "Branch of Service",
      value: branchOfService,
    },
  ].filter((item) => item.value);

  const pensionDetails = [
    {
      id: 1,
      title: "Monthly Pension",
      details: formatCurrency(monthlyPension),
    },
    {
      id: 2,
      title: "Monthly Deduction",
      details: formatCurrency(monthlyDeduction),
    },
    {
      id: 3,
      title: "Original Account",
      details: branchName,
    },
  ].filter((item) => item.details);

  return (
    <Card className="overflow-hidden border border-border/50 shadow-md">
      <CardHeader className="relative bg-gradient-to-r from-primary via-primary/90 to-primary/70 text-primary-foreground p-8 pb-12">
        <div className="flex flex-col">
          <Badge
            className={cn(
              "absolute right-6 top-6 flex items-center gap-2 rounded-full border px-4 py-1 text-sm font-semibold uppercase tracking-[0.2em]",
              statusStyles[approvalStatus as ApprovalStatus].badge
            )}
          >
            <span
              className={cn(
                "h-2 w-2 rounded-full",
                statusStyles[approvalStatus as ApprovalStatus].dot
              )}
            />
            {approvalStatus}
          </Badge>

          <Badge
            className={cn(
              "absolute right-6 top-16 flex items-center gap-2 rounded-full border px-4 py-1 text-sm font-semibold uppercase tracking-[0.2em]",
              statusStyles[approvalStatus as ApprovalStatus].badge
            )}
          >
            <span className={cn("h-2 w-2 rounded-full")} />
            Deceased At: {formatDateToReadable(deceasedAt, true)}
          </Badge>
        </div>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:gap-10">
          <Avatar className="h-28 w-28 border-4 border-white/70 shadow-xl ring-4 ring-white/30 md:h-32 md:w-32">
            <AvatarImage src={profileImageUrl || "/placeholder.svg"} alt="Profile picture" />
            <AvatarFallback className="text-3xl bg-blue-100 text-primary">
              {avatarFallBack(fullName)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <CardTitle className="text-xs font-medium uppercase tracking-[0.3em] text-white/70">
                Client Profile
              </CardTitle>
              <CardDescription className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                {fullName}
              </CardDescription>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm font-medium uppercase tracking-wide text-white/80">
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
          <div className="grid gap-4 grid-cols-1">
            <div className="rounded-xl border border-border/60 p-4 shadow-sm hover-card">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Current Address
              </p>
              <p className="mt-2 text-lg font-semibold text-foreground line-clamp-1 capitalize">
                {address}
              </p>
            </div>
          </div>
          {/* Remarks */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-foreground">Remarks</h3>
            <div className="rounded-lg shadow-sm border border-border/60 p-4 text-sm leading-relaxed hover-card">
              <p>{remarks || "No remarks yet"}</p>
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
              <div key={detail.id} className="flex items-center justify-between gap-6 ">
                <p className="text-sm font-medium text-muted-foreground">{detail.title}</p>
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
