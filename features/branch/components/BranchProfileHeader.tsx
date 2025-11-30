import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { avatarFallBack } from "@/utils/avatar-fallback";

interface IBranchProfile {
  id: number;
  name: string;
  email: string;
  status: string;
}

export default function BranchProfileHeader({
  id,
  name,
  email,
  status,
}: IBranchProfile) {
  const clientBadge = [
    { label: "ID", value: id },
    {
      label: "Email",
      value: email,
    },
  ].filter((item) => item.value);

  return (
    <Card className="overflow-hidden border border-border/50 shadow-md">
      <CardHeader className="relative bg-gradient-to-r from-primary via-primary/90 to-primary/70 text-primary-foreground p-8 pb-12">
        <Badge
          className={cn(
            "absolute right-6 top-6 flex items-center gap-2 rounded-full border border-white/20 px-4 py-1 text-sm font-semibold uppercase tracking-[0.2em] text-white",
            status === "ACTIVE"
              ? "bg-green-100 border-green-500 text-green-700"
              : "bg-red-100 border-red-500 text-red-700"
          )}
        >
          <span
            className={cn(
              "h-2 w-2 rounded-full",
              status === "ACTIVE" ? "bg-green-500" : "bg-red-500"
            )}
          />
          {status}
        </Badge>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:gap-10">
          <Avatar className="h-28 w-28 border-4 border-white/70 shadow-xl ring-4 ring-white/30 md:h-32 md:w-32">
            <AvatarFallback className="text-3xl bg-blue-100 text-primary">
              {avatarFallBack(name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <CardTitle className="text-xs font-medium uppercase tracking-[0.3em] text-white/70">
                Branch Profile
              </CardTitle>
              <CardDescription className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                {name}
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
    </Card>
  );
}
