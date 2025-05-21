import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { reportStatusData } from "../data/client-mock-stats";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function ClientsOverviewCards() {
  return (
    <div className="space-y-4">
      {reportStatusData.map((item) => (
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

export default function ClientStatusReport() {
  return (
    <Card className="col-span-3">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="h4">Client Status Report Overview</CardTitle>
          <CardDescription>
            Distribution of clients by loan status
          </CardDescription>
        </div>
        <Button variant="outline" asChild>
          <Link href="/reports">View Reports</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <ClientsOverviewCards />
      </CardContent>
    </Card>
  );
}
