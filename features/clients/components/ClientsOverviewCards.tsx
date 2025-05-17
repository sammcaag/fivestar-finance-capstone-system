"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function ClientsOverviewCards() {
  const statusData = [
    {
      status: "Active Loans",
      count: 842,
      percentage: 67.5,
      color: "bg-green-500",
    },
    {
      status: "Pending Approval",
      count: 156,
      percentage: 12.5,
      color: "bg-blue-500",
    },
    {
      status: "Overdue Payments",
      count: 124,
      percentage: 9.9,
      color: "bg-red-500",
    },
    {
      status: "Completed Loans",
      count: 98,
      percentage: 7.9,
      color: "bg-gray-500",
    },
    {
      status: "Rejected Applications",
      count: 28,
      percentage: 2.2,
      color: "bg-gray-400",
    },
  ];

  return (
    <div className="space-y-4">
      {statusData.map((item) => (
        <Card key={item.status} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">{item.status}</span>
              <span className="text-sm text-muted-foreground">
                {item.count} clients
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Progress
                value={item.percentage}
                className={`h-2 ${item.color}`}
              />
              <span className="text-sm font-medium">{item.percentage}%</span>
            </div>
          </CardContent>
        </Card>
      ))}

      <Card>
        <CardContent className="p-4">
          <div className="text-sm font-medium mb-2">Loan Type Distribution</div>
          <div className="flex gap-1 h-8">
            <div
              className="bg-blue-500 w-[40%] rounded-l-sm"
              title="Mortgage: 40%"
            ></div>
            <div className="bg-green-500 w-[25%]" title="Personal: 25%"></div>
            <div className="bg-yellow-500 w-[20%]" title="Business: 20%"></div>
            <div
              className="bg-purple-500 w-[15%] rounded-r-sm"
              title="Auto: 15%"
            ></div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Mortgage</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Personal</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span>Business</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Auto</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
