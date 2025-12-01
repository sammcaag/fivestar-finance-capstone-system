import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ClientProfileHeaderSkeleton() {
  return (
    <Card className="overflow-hidden border border-border/50 shadow-md">
      {/* HEADER */}
      <CardHeader className="relative bg-gradient-to-r from-primary via-primary/90 to-primary/70 text-primary-foreground p-8 pb-12">
        {/* Status Badge */}
        <div className="absolute right-6 top-6 flex items-center gap-2 rounded-full px-4 py-1">
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:gap-10">
          {/* Avatar */}
          <div>
            <Skeleton className="h-28 w-28 md:h-32 md:w-32 rounded-full border-4 border-white/40 shadow-xl ring-4 ring-white/20" />
          </div>

          {/* Title Section */}
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-8 w-64" />
            </div>

            {/* Client Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-40 rounded-full" />
            </div>
          </div>
        </div>
      </CardHeader>

      {/* BODY */}
      <CardContent className="grid gap-6 md:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)] p-6">
        {/* Left Section */}
        <div className="space-y-6">
          {/* Identity Highlights */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-border/60 p-4 shadow-sm">
                <Skeleton className="h-3 w-24 mb-3" />
                <Skeleton className="h-5 w-full" />
              </div>
            ))}
          </div>

          {/* Remarks */}
          <div className="space-y-3">
            <Skeleton className="h-4 w-28" />
            <div className="rounded-lg border border-border/60 p-4">
              <Skeleton className="h-16 w-full" />
            </div>
          </div>
        </div>

        {/* Pension Overview */}
        <Card className="border border-border/60">
          <CardHeader>
            <Skeleton className="h-3 w-40 mb-2" />
            <Skeleton className="h-5 w-48" />
          </CardHeader>
          <CardContent className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between gap-6">
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-5 w-20" />
              </div>
            ))}
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
