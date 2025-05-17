import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, MoreHorizontal, Pen } from "lucide-react";
import Link from "next/link";

const recentClients = [
  {
    id: 1,
    name: "John Doe",
    process: 5,
  },
  {
    id: 2,
    name: "Alice Smith",
    process: 3,
  },
  {
    id: 3,
    name: "Bob Johnson",
    process: 1,
  },
  {
    id: 4,
    name: "Emily Davis",
    process: 3,
  },
  {
    id: 5,
    name: "Rey Daug",
    process: 7,
  },
];

const tableHeads = [
  { acronym: "PL Details", expanded: "PL Details" },
  { acronym: "BO", expanded: "Branch Office" },
  { acronym: "COLL", expanded: "Collection" },
  { acronym: "TA", expanded: "Terms Approval" },
  { acronym: "Treasury", expanded: "Treasury" },
  { acronym: "Au1", expanded: "Audit 1" },
  { acronym: "Au2", expanded: "Audit 2" },
  { acronym: "Sig1", expanded: "Signatory 1" },
  { acronym: "Sig2", expanded: "Signatory 2" },
  { acronym: "BR", expanded: "Branch Release" },
  { acronym: "Status", expanded: "Status" },
];

const RecentProcessTrail = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="h3">Process Trail</CardTitle>
          <CardDescription>Loan Progress from CDO Branch</CardDescription>
        </div>
        <Button variant="outline" asChild>
          <Link href="/clients/process-trail">View All</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto">
          <Table className="w-full text-sm">
            <TableHeader>
              <TableRow className="border-b text-left">
                {tableHeads.map((head, index) => (
                  <TableHead
                    className="px-4 py-3 font-medium text-center"
                    key={index}
                  >
                    {head.expanded}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody className="">
              {recentClients.map((client) => (
                <TableRow
                  key={client.id}
                  className="w-full border-b transition-colors hover:bg-muted/50"
                >
                  <TableCell className="px-4 py-3 font-medium">
                    {client.name}
                  </TableCell>
                  {/* Generate all process cells regardless of client progress */}
                  {Array.from({ length: tableHeads.length - 1 }).map((_, i) => (
                    <TableCell className="py-3 text-center" key={i}>
                      {i < client.process ? (
                        // Show Check Icon for completed processes
                        <div className="flex h-8 w-8 items-center justify-center mx-auto rounded-full bg-green-100 text-green-700">
                          <Check className="h-4 w-4" />
                        </div>
                      ) : i === client.process ? (
                        // Show Pen Icon for the current step
                        <div className="flex h-8 w-8 items-center justify-center mx-auto rounded-full bg-yellow-100 text-yellow-700">
                          <Pen className="h-4 w-4" />
                        </div>
                      ) : (
                        // Empty cell for future steps - important to maintain full width hover
                        <div className="h-8"></div>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentProcessTrail;
