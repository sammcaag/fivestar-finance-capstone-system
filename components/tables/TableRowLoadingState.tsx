import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export default function TableRowLoadingState({dashboard}: {dashboard?: boolean}) {
  return (
    <div className="w-full space-y-4">
      {!dashboard && (
        <div className="flex items-center justify-between py-4">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-10 w-[100px]" />
        </div>
      )}
      <div className="rounded-md border">
        <div className="h-10 border-b bg-muted/30">
          <div className="grid grid-cols-5 gap-4 px-4 py-3">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
          </div>
        </div>
        <div className="divide-y">
          {Array(dashboard ? 3 : 5)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="grid grid-cols-5 gap-4 px-4 py-4">
                {Array(5)
                  .fill(0)
                  .map((_, j) => (
                    <Skeleton key={j} className="h-8 w-full" />
                  ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
