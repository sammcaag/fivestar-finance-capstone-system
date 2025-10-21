import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { clientData } from "../../data/client-mock";
import { cn } from "@/lib/utils";
import { pensionDetails } from "../../data/client-mock";
import { avatarFallBack } from "@/utils/avatar-fallback";
import { formatCurrency } from "@/lib/utils";

export default function ClientProfileHeader() {
  const identityHighlights = [
    { label: "Age", value: clientData.age },
    { label: "Gender", value: clientData.gender },
    { label: "Civil Status", value: clientData.civilStatus },
    { label: "Program", value: clientData.program },
    { label: "Last Unit Assigned", value: clientData.lastUnitAssigned },
    { label: "Location", value: clientData.location },
  ].filter((item) => item.value);

  const fullName = [
    clientData.firstName,
    clientData.midName,
    clientData.lastName,
    clientData.suffix,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Card className="overflow-hidden border border-border/50 bg-background shadow-md">
      <div className="relative bg-gradient-to-r from-primary via-primary/90 to-primary/70 text-primary-foreground">
        <div className="absolute right-6 top-6">
          <Badge
            className={cn(
              "flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-sm backdrop-blur",
              clientData.status === "ACTIVE"
                ? "text-emerald-100"
                : "text-red-200"
            )}
          >
            <span
              className={cn(
                "h-2 w-2 rounded-full",
                clientData.status === "ACTIVE" ? "bg-emerald-300" : "bg-red-300"
              )}
            />
            {clientData.status}
          </Badge>
        </div>
        <div className="flex flex-col gap-6 p-6 pb-12 md:flex-row md:items-end md:gap-10 md:p-8">
          <Avatar className="h-28 w-28 border-4 border-white/70 shadow-xl ring-4 ring-white/30 md:h-32 md:w-32">
            <AvatarImage
              src={clientData.profilePicture || "/placeholder.svg"}
              alt="Profile picture"
            />
            <AvatarFallback className="text-3xl bg-blue-100 text-primary">
              {avatarFallBack(clientData.firstName + " " + clientData.lastName)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/70">
                Client Profile
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                {fullName}
              </h1>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wide text-white/80">
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1">
                ID • {clientData.clientId}
              </span>
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1">
                {clientData.program}
              </span>
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1">
                {clientData.location}
              </span>
            </div>
          </div>
        </div>
      </div>
      <CardContent className="grid gap-6 p-6 md:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)] md:p-8">
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {identityHighlights.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-border/60 bg-muted/40 p-4 shadow-sm"
              >
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {item.label}
                </p>
                <p className="mt-2 text-lg font-semibold text-foreground">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-foreground">Remarks</h3>
            <div className="rounded-xl border border-dashed border-border/60 bg-muted/40 p-4 text-sm leading-relaxed text-muted-foreground">
              {clientData.remarks}
            </div>
          </div>
        </div>
        <div className="flex h-full flex-col justify-between space-y-5 rounded-2xl border border-border/60 bg-background/80 p-6 shadow-sm">
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
              Pension Overview
            </p>
            <p className="text-lg font-semibold text-foreground">Financial Snapshot</p>
          </div>
          <div className="space-y-4">
            {pensionDetails.map((detail) => (
              <div
                key={detail.id}
                className="flex items-center justify-between gap-6"
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
