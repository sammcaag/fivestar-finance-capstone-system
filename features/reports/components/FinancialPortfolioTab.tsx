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
import { Progress } from "@/components/ui/progress";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
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
import { TrendingUp, TrendingDown } from "lucide-react";

// Mock data for financial portfolio
const portfolioGrowthData = [
  { month: "Apr", totalPortfolio: 142.5, outstanding: 98.3, collected: 44.2 },
  { month: "May", totalPortfolio: 156.8, outstanding: 108.7, collected: 48.1 },
  { month: "Jun", totalPortfolio: 171.2, outstanding: 115.4, collected: 55.8 },
  { month: "Jul", totalPortfolio: 183.6, outstanding: 121.9, collected: 61.7 },
  { month: "Aug", totalPortfolio: 198.4, outstanding: 127.2, collected: 71.2 },
  { month: "Sep", totalPortfolio: 215.7, outstanding: 132.6, collected: 83.1 },
];

const collectionRateData = [
  { month: "Apr", rate: 94.2 },
  { month: "May", rate: 95.1 },
  { month: "Jun", rate: 96.3 },
  { month: "Jul", rate: 95.8 },
  { month: "Aug", rate: 97.1 },
  { month: "Sep", rate: 97.8 },
];

const portfolioDistribution = [
  { category: "Personal Loans", value: 89.4, color: "#2563eb" },
  { category: "Housing Loans", value: 98.7, color: "#3b82f6" },
  { category: "Emergency Loans", value: 27.6, color: "#60a5fa" },
];

const branchPerformance = [
  {
    branch: "Manila Central",
    totalDisbursed: "₱52.3M",
    outstanding: "₱31.2M",
    collectionRate: "98.2%",
    activeLoans: 412,
    trend: "up",
  },
  {
    branch: "Quezon City",
    totalDisbursed: "₱48.7M",
    outstanding: "₱29.8M",
    collectionRate: "97.5%",
    activeLoans: 389,
    trend: "up",
  },
  {
    branch: "Cebu",
    totalDisbursed: "₱43.2M",
    outstanding: "₱28.1M",
    collectionRate: "96.8%",
    activeLoans: 342,
    trend: "down",
  },
  {
    branch: "Davao",
    totalDisbursed: "₱41.5M",
    outstanding: "₱26.4M",
    collectionRate: "97.9%",
    activeLoans: 318,
    trend: "up",
  },
];

const riskAssessment = [
  { category: "Low Risk", loans: 1847, percentage: 82.1, color: "#2563eb" },
  { category: "Medium Risk", loans: 284, percentage: 12.6, color: "#f59e0b" },
  { category: "High Risk", loans: 119, percentage: 5.3, color: "#dc2626" },
];

export default function FinancialPortfolioTab() {
  return (
    <div className="space-y-4">
      {/* Portfolio Growth */}
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Growth Overview</CardTitle>
          <CardDescription>Total portfolio value and breakdown (in millions)</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={portfolioGrowthData}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorOutstanding" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorCollected" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
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
              <Legend />
              <Area
                type="monotone"
                dataKey="totalPortfolio"
                stroke="#2563eb"
                fillOpacity={1}
                fill="url(#colorTotal)"
                name="Total Portfolio"
              />
              <Area
                type="monotone"
                dataKey="outstanding"
                stroke="#f59e0b"
                fillOpacity={1}
                fill="url(#colorOutstanding)"
                name="Outstanding"
              />
              <Area
                type="monotone"
                dataKey="collected"
                stroke="#10b981"
                fillOpacity={1}
                fill="url(#colorCollected)"
                name="Collected"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Collection Rate Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Collection Rate Trend</CardTitle>
            <CardDescription>Monthly collection efficiency</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={collectionRateData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" domain={[90, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                  formatter={(value) => `${value}%`}
                />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="#10b981"
                  strokeWidth={3}
                  name="Collection Rate"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Portfolio Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Distribution by Type</CardTitle>
            <CardDescription>Outstanding amounts per loan category (in millions)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={portfolioDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, value }) => `${category}: ₱${value}M`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {portfolioDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `₱${value}M`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Risk Assessment */}
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Risk Assessment</CardTitle>
          <CardDescription>Current loan portfolio segmented by risk level</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {riskAssessment.map((risk) => (
              <div key={risk.category} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: risk.color }} />
                    <span>{risk.category}</span>
                  </div>
                  <div className="text-right">
                    <span>{risk.loans} loans</span>
                    <span className="text-muted-foreground ml-2">({risk.percentage}%)</span>
                  </div>
                </div>
                <Progress
                  value={risk.percentage}
                  className="h-2"
                  style={{
                    backgroundColor: "#e2e8f0",
                  }}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Branch Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Branch Financial Performance</CardTitle>
          <CardDescription>Comparative analysis across all branches</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Branch</TableHead>
                <TableHead>Total Disbursed</TableHead>
                <TableHead>Outstanding</TableHead>
                <TableHead>Collection Rate</TableHead>
                <TableHead>Active Loans</TableHead>
                <TableHead>Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {branchPerformance.map((branch) => (
                <TableRow key={branch.branch}>
                  <TableCell>{branch.branch}</TableCell>
                  <TableCell>{branch.totalDisbursed}</TableCell>
                  <TableCell>{branch.outstanding}</TableCell>
                  <TableCell>
                    <Badge
                      variant={parseFloat(branch.collectionRate) > 97 ? "default" : "secondary"}
                    >
                      {branch.collectionRate}
                    </Badge>
                  </TableCell>
                  <TableCell>{branch.activeLoans}</TableCell>
                  <TableCell>
                    {branch.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    )}
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
