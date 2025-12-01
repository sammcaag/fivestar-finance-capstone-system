import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Mock data for loan performance
const approvalTrendData = [
  { month: "Apr", approved: 245, rejected: 38, pending: 52 },
  { month: "May", approved: 298, rejected: 42, pending: 61 },
  { month: "Jun", approved: 312, rejected: 35, pending: 48 },
  { month: "Jul", approved: 278, rejected: 40, pending: 55 },
  { month: "Aug", approved: 325, rejected: 31, pending: 67 },
  { month: "Sep", approved: 341, rejected: 29, pending: 72 },
];

const disbursementData = [
  { month: "Apr", amount: 6.8 },
  { month: "May", amount: 8.2 },
  { month: "Jun", amount: 9.1 },
  { month: "Jul", amount: 7.5 },
  { month: "Aug", amount: 10.3 },
  { month: "Sep", amount: 11.7 },
];

const repaymentStatusData = [
  { name: "On Time", value: 1843, color: "#2563eb" },
  { name: "Late (1-30 days)", value: 284, color: "#f59e0b" },
  { name: "Overdue (>30 days)", value: 127, color: "#dc2626" },
];

const loanTypePerformance = [
  {
    type: "Personal Loan",
    total: 842,
    approved: 734,
    avgAmount: "₱285,000",
    approvalRate: "87.2%",
  },
  {
    type: "Housing Loan",
    total: 267,
    approved: 241,
    avgAmount: "₱1,250,000",
    approvalRate: "90.3%",
  },
  {
    type: "Emergency Loan",
    total: 175,
    approved: 146,
    avgAmount: "₱85,000",
    approvalRate: "83.4%",
  },
];

export default function LoanPerformanceTab() {
  return (
    <div className="space-y-4">
      {/* Approval Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Loan Approval Trends</CardTitle>
          <CardDescription>Monthly approval, rejection, and pending applications</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={approvalTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="approved"
                stroke="#2563eb"
                strokeWidth={2}
                name="Approved"
              />
              <Line
                type="monotone"
                dataKey="rejected"
                stroke="#dc2626"
                strokeWidth={2}
                name="Rejected"
              />
              <Line
                type="monotone"
                dataKey="pending"
                stroke="#f59e0b"
                strokeWidth={2}
                name="Pending"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Disbursement Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Disbursement</CardTitle>
            <CardDescription>Total amount disbursed per month (in millions)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={disbursementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                  formatter={(value) => `₱${value}M`}
                />
                <Bar
                  dataKey="amount"
                  fill="#2563eb"
                  radius={[8, 8, 0, 0]}
                  name="Disbursed Amount"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Repayment Status */}
        <Card>
          <CardHeader>
            <CardTitle>Repayment Status Distribution</CardTitle>
            <CardDescription>Current status of active loans</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={repaymentStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {repaymentStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Loan Type Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Loan Type Performance</CardTitle>
          <CardDescription>Detailed breakdown by loan category</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Loan Type</TableHead>
                <TableHead>Total Applications</TableHead>
                <TableHead>Approved</TableHead>
                <TableHead>Approval Rate</TableHead>
                <TableHead>Avg. Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loanTypePerformance.map((loan) => (
                <TableRow key={loan.type}>
                  <TableCell>{loan.type}</TableCell>
                  <TableCell>{loan.total}</TableCell>
                  <TableCell>{loan.approved}</TableCell>
                  <TableCell>
                    <Badge variant={parseFloat(loan.approvalRate) > 85 ? "default" : "secondary"}>
                      {loan.approvalRate}
                    </Badge>
                  </TableCell>
                  <TableCell>{loan.avgAmount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
