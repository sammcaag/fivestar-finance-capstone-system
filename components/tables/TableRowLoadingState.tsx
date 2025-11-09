import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Table } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

interface TableRowLoadingStateProps<TData> {
  columns: ColumnDef<TData>[];
}

export default function TableRowLoadingState<TData>({
  columns,
}: TableRowLoadingStateProps<TData>) {
  return (
    <Card className="overflow-hidden border flex-1">
      <CardHeader>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <Skeleton className={"h-7 w-xs"} /> {/* Matches CardTitle */}
            <Skeleton className={"h-7 w-lg"} /> {/* Matches CardDescription */}
          </div>
          <div className="mt-4 lg:mt-0">
            <Skeleton className="h-10 w-xl" /> {/* Matches Search input */}
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-0 min-h-[500px] border-t">
        <Table className="table-fixed">
          <thead>
            <tr className="h-10 border-b bg-muted/30">
              {columns.map((col, i) => (
                <th
                  key={col.id || i.toString()}
                  style={{ width: col.size || 100 }}
                  className="px-4 py-3 text-left"
                >
                  <Skeleton className="h-4 w-full" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {Array(10)
              .fill(0)
              .map((_, i) => (
                <tr key={i} className="px-4 py-4">
                  {columns.map((col, j) => (
                    <td
                      key={col.id || j.toString()}
                      style={{ width: col.size || 100 }}
                      className={cn(
                        "px-4 py-4",
                        "max-w-[150px] overflow-hidden"
                      )}
                    >
                      <Skeleton className={cn("h-8 w-full max-w-[150px]")} />
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </Table>
      </CardContent>
      <CardFooter className="pt-4">
        <div className="flex items-center justify-between w-full">
          <Skeleton className="h-4 w-[100px]" /> {/* Matches pagination text */}
          <div className="flex gap-2">
            <Skeleton className="h-8 w-[80px]" /> {/* Matches prev button */}
            <Skeleton className="h-8 w-[80px]" /> {/* Matches next button */}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
