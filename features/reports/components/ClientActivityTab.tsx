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
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

// Mock data for client activity
const newClientsData = [
  { month: "Apr", newClients: 187, returning: 58 },
  { month: "May", newClients: 213, returning: 85 },
  { month: "Jun", newClients: 245, returning: 67 },
  { month: "Jul", newClients: 198, returning: 80 },
  { month: "Aug", newClients: 267, returning: 94 },
  { month: "Sep", newClients: 289, returning: 112 },
];

const applicationStagesData = [
  { stage: "Initial Submission", count: 342 },
  { stage: "Documentation", count: 287 },
  { stage: "Under Review", count: 198 },
  { stage: "Awaiting Approval", count: 127 },
  { stage: "Approved", count: 341 },
];

const conversionFunnelData = [
  { stage: "Inquiries", count: 1450, rate: 100 },
  { stage: "Applications Started", count: 1284, rate: 88.6 },
  { stage: "Submitted", count: 1121, rate: 77.3 },
  { stage: "Approved", count: 978, rate: 67.4 },
  { stage: "Disbursed", count: 892, rate: 61.5 },
];

const recentActivities = [
  {
    client: "Juan dela Cruz",
    clientId: "AFP-2024-1281",
    action: "Application Submitted",
    loanType: "Personal Loan",
    amount: "₱250,000",
    time: "2 hours ago",
    status: "pending",
  },
  {
    client: "Maria Santos",
    clientId: "AFP-2024-1280",
    action: "Documents Uploaded",
    loanType: "Housing Loan",
    amount: "₱1,500,000",
    time: "3 hours ago",
    status: "in-review",
  },
  {
    client: "Roberto Garcia",
    clientId: "AFP-2024-1279",
    action: "Approved by HQ",
    loanType: "Emergency Loan",
    amount: "₱85,000",
    time: "5 hours ago",
    status: "approved",
  },
  {
    client: "Teresa Reyes",
    clientId: "AFP-2024-1278",
    action: "Disbursement Complete",
    loanType: "Personal Loan",
    amount: "₱300,000",
    time: "6 hours ago",
    status: "completed",
  },
  {
    client: "Carlos Mendoza",
    clientId: "AFP-2024-1277",
    action: "Additional Docs Required",
    loanType: "Housing Loan",
    amount: "₱2,000,000",
    time: "8 hours ago",
    status: "action-required",
  },
];

const STAGE_COLORS = ["#2563eb", "#3b82f6", "#60a5fa", "#93c5fd", "#dbeafe"];

export default function ClientActivityTab() {
  return (
    <div className="space-y-4">
      {/* New vs Returning Clients */}
      <Card>
        <CardHeader>
          <CardTitle>Client Acquisition Trends</CardTitle>
          <CardDescription>
            New vs returning AFP retirees over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={newClientsData}>
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
              <Bar
                dataKey="newClients"
                fill="#2563eb"
                radius={[8, 8, 0, 0]}
                name="New Clients"
              />
              <Bar
                dataKey="returning"
                fill="#60a5fa"
                radius={[8, 8, 0, 0]}
                name="Returning Clients"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Application Stages */}
        <Card>
          <CardHeader>
            <CardTitle>Applications by Stage</CardTitle>
            <CardDescription>Current pipeline distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={applicationStagesData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" stroke="#64748b" />
                <YAxis
                  dataKey="stage"
                  type="category"
                  width={150}
                  stroke="#64748b"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                  {applicationStagesData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={STAGE_COLORS[index % STAGE_COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Conversion Funnel */}
        <Card>
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
            <CardDescription>From inquiry to disbursement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {conversionFunnelData.map((item, index) => (
                <div key={item.stage} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{item.stage}</span>
                    <div className="text-right">
                      <span className="text-sm">{item.count}</span>
                      <span className="text-xs text-muted-foreground ml-2">
                        ({item.rate}%)
                      </span>
                    </div>
                  </div>
                  <Progress value={item.rate} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Client Activities</CardTitle>
          <CardDescription>
            Latest updates from AFP retiree loan applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client Name</TableHead>
                <TableHead>Client ID</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Loan Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentActivities.map((activity) => (
                <TableRow key={activity.clientId}>
                  <TableCell>{activity.client}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {activity.clientId}
                  </TableCell>
                  <TableCell>{activity.action}</TableCell>
                  <TableCell>{activity.loanType}</TableCell>
                  <TableCell>{activity.amount}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {activity.time}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        activity.status === "completed"
                          ? "default"
                          : activity.status === "approved"
                          ? "default"
                          : activity.status === "action-required"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {activity.status === "pending"
                        ? "Pending"
                        : activity.status === "in-review"
                        ? "In Review"
                        : activity.status === "approved"
                        ? "Approved"
                        : activity.status === "completed"
                        ? "Completed"
                        : "Action Required"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
