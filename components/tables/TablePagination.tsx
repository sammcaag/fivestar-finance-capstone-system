import React from 'react'
import { Button } from '@/components/ui/button'
import { Table } from '@tanstack/react-table';

export default function TablePagination<TData, TValue>({
  table,
  filteredData,
}: {
  table: Table<TData>;
  filteredData: TValue[];
}) {
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <div className="flex-1 text-sm text-muted-foreground">
        Showing {table.getRowModel().rows.length} of {filteredData.length}{" "}
        clients
      </div>
      <div className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="transition-all duration-200 hover:bg-primary hover:text-white"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="transition-all duration-200 hover:bg-primary hover:text-white"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
