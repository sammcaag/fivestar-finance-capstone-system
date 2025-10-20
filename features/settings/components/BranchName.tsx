import React from "react";
import { CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { MapPin, UserCircle, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function BranchName({
  branchInfo,
}: {
  branchInfo: {
    name: string;
    code: string;
    address: string;
    contactPerson: string;
    activeAgents: number;
  };
}) {
  const labelStyle = "font-normal";
  const valueStyle =
    "px-3 flex items-center gap-2 py-2 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-md border border-border";
  return (
    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label className={labelStyle}>Branch Name</Label>
        <div className={valueStyle}>{branchInfo.name}</div>
      </div>

      <div className="space-y-2 cursor-not-allowed">
        <Label className={labelStyle}>Branch Code</Label>
        <div className={valueStyle}>{branchInfo.code}</div>
      </div>

      <div className="space-y-2 md:col-span-2">
        <Label className={labelStyle}>Branch Address</Label>
        <div className={valueStyle}>
          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
          <span>{branchInfo.address}</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label className={labelStyle}>Contact Person / Manager</Label>
        <div className={valueStyle}>
          <UserCircle className="h-4 w-4 text-muted-foreground" />
          {branchInfo.contactPerson}
        </div>
      </div>

      <div className="space-y-2">
        <Label className={labelStyle}>Number of Active Agents</Label>
        <div className={valueStyle}>
          <Users className="h-4 w-4 text-muted-foreground" />
          <span>{branchInfo.activeAgents}</span>
          <Badge variant="default" className="ml-auto bg-green-600">
            Active
          </Badge>
        </div>
      </div>
      {/* Note that says only admins can edit this part */}
      <p className="text-base text-muted-foreground italic">
        *Note: Only admins can edit this part
      </p>
    </CardContent>
  );
}
