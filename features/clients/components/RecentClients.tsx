import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

const recentClients = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "(123) 456-7890",
    loanAmount: "&#8369;15,000",
    status: "Active",
    createdAt: "Today",
  },
  {
    id: 2,
    name: "Alice Smith",
    email: "alice.smith@example.com",
    phone: "(987) 654-3210",
    loanAmount: "&#8369;25,000",
    status: "Pending",
    createdAt: "Yesterday",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    phone: "(555) 123-4567",
    loanAmount: "&#8369;10,000",
    status: "Active",
    createdAt: "2 days ago",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "(444) 333-2222",
    loanAmount: "&#8369;30,000",
    status: "Active",
    createdAt: "3 days ago",
  },
];

const RecentClients = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="h3">Recently Added Clients</CardTitle>
          <CardDescription>New clients from CDO Branch</CardDescription>
        </div>
        <Button variant="outline" asChild>
          <Link href="/clients">View All</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto">
          <Table className="w-full text-sm">
            <TableHeader>
              <TableRow className="border-b text-left">
                <TableHead className="px-4 py-3 font-medium">Name</TableHead>
                <TableHead className="px-4 py-3 font-medium">Contact</TableHead>
                <TableHead className="px-4 py-3 font-medium">
                  Loan Amount
                </TableHead>
                <TableHead className="px-4 py-3 font-medium">Status</TableHead>
                <TableHead className="px-4 py-3 font-medium">Added</TableHead>
                <TableHead className="px-4 py-3 font-medium sr-only">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentClients.map((client) => (
                <TableRow
                  key={client.id}
                  className="border-b transition-colors hover:bg-primary-hover"
                >
                  <TableCell className="px-4 py-3 font-medium">
                    {client.name}
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <div className="flex flex-col">
                      <span>{client.email}</span>
                      <span className="text-xs text-muted-foreground">
                        {client.phone}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    {client.loanAmount}
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <Badge
                      variant={
                        client.status === "Active" ? "outline" : "secondary"
                      }
                    >
                      {client.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-muted-foreground">
                    {client.createdAt}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Client</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View Loans</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentClients;
