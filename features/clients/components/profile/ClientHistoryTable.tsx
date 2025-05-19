import { Badge } from "@/components/ui/badge";
import { ClientHistoryRecord } from "../../types/types-clients";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ClientHistoryTableProps {
  records: ClientHistoryRecord[];
}

export default function ClientHistoryTable({
  records,
}: ClientHistoryTableProps) {
  return (
    <Card className="mt-3">
      <CardHeader className="flex justify-between">
        <div className="flex items-center">
          <Building2 className="mr-2 text-primary h-5 w-5" />
          <CardTitle className="text-xl font-bold">
            Client Loan History
          </CardTitle>
        </div>
        <CardDescription className="text-muted-foreground ml-8">
          Loan history of the client
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto border rounded-lg">
          <Table className="w-full text-sm">
            <TableHeader>
              <TableRow className="border-b text-left">
                <TableHead className="px-4 py-3 font-medium">
                  DED CODE
                </TableHead>
                <TableHead className="px-4 py-3 font-medium">
                  PRODUCT TYPE
                </TableHead>
                <TableHead className="px-4 py-3 font-medium">MA</TableHead>
                <TableHead className="px-4 py-3 font-medium">TERM</TableHead>
                <TableHead className="px-4 py-3 font-medium">
                  RELEASED DATE
                </TableHead>
                <TableHead className="px-4 py-3 font-medium">VD</TableHead>
                <TableHead className="px-4 py-3 font-medium">MD</TableHead>
                <TableHead className="px-4 py-3 font-medium">
                  PN NUMBER
                </TableHead>
                <TableHead className="px-4 py-3 font-medium">STATUS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.map((record, index) => (
                <TableRow
                  key={index}
                  className={`border-b transition-colors`}
                >
                  <TableCell className="px-4 py-3">{record.dedCode}</TableCell>
                  <TableCell className="px-4 py-3">
                    {record.productType}
                  </TableCell>
                  <TableCell className="px-4 py-3">{record.amount}</TableCell>
                  <TableCell className="px-4 py-3">{record.term}</TableCell>
                  <TableCell className="px-4 py-3">
                    {record.releasedDate}
                  </TableCell>
                  <TableCell className="px-4 py-3">{record.vd}</TableCell>
                  <TableCell className="px-4 py-3">{record.md}</TableCell>
                  <TableCell className="px-4 py-3">{record.pnNumber}</TableCell>
                  <TableCell className="px-4 py-3">
                    <Badge
                      className={cn(
                        record.status === "RELEASED"
                          ? "bg-blue-100 text-primary-bold hover:bg-blue-100"
                          : "bg-white text-destructive hover:bg-white border border-red-200"
                      )}
                    >
                      {record.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
