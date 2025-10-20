import { CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Clock, MapPinned } from "lucide-react";

export default function PersonalProfile({
  profileInfo,
  passwordRequestPending,
  setIsPasswordDialogOpen,
}: {
  profileInfo: {
    managerName: string;
    role: string;
    branchAssignment: string;
    lastLogin: string;
    lastLoginIP: string;
  };
  passwordRequestPending: boolean;
  setIsPasswordDialogOpen: (open: boolean) => void;
}) {
  const labelStyle = "font-normal";
  const valueStyle =
    "px-3 flex items-center gap-2 py-2 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-md border border-border";
  return (
    <CardContent className="space-y-6">
      {/* Profile Information */}
      <div>
        <h4 className="mb-4">Profile Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label className={labelStyle}>Manager Name</Label>
            <div className={valueStyle}>{profileInfo.managerName}</div>
          </div>

          <div className="space-y-2">
            <Label className={labelStyle}>Role</Label>
            <Button variant="default">{profileInfo.role}</Button>
          </div>

          <div className="space-y-2">
            <Label className={labelStyle}>Branch Assignment</Label>
            <div className={valueStyle}>{profileInfo.branchAssignment}</div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Activity Information */}
      <div>
        <h4 className="mb-4">Activity Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className={labelStyle}>Last Login</Label>
            <div className={valueStyle}>
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              {profileInfo.lastLogin}
            </div>
          </div>

          <div className="space-y-2">
            <Label className={labelStyle}>Last Login Location</Label>
            <div className={valueStyle}>
              <MapPinned className="h-4 w-4 text-muted-foreground" />
              {profileInfo.lastLoginIP}
            </div>
          </div>
        </div>
      </div>

      <div>
        {/* Note that says only admins can edit this part */}
        <p className="text-base text-muted-foreground italic">
          *Note: Only admins can edit this part
        </p>
        <Separator />
      </div>

      {/* Security Actions */}
      <div>
        <h4 className="mb-4">Security Actions</h4>
        <div className="flex items-center justify-between p-4 rounded-lg border border-border">
          <div>
            <p className="mb-1">Password Change Request</p>
            <p className="text-sm text-muted-foreground">
              {passwordRequestPending
                ? "Your request is pending admin approval"
                : "Request a password change from the administrator"}
            </p>
          </div>
          <Button
            variant={passwordRequestPending ? "outline" : "default"}
            onClick={() => setIsPasswordDialogOpen(true)}
            disabled={passwordRequestPending}
          >
            {passwordRequestPending ? (
              <>
                <Clock className="h-4 w-4 mr-2" />
                Pending Approval
              </>
            ) : (
              "Request Password Change"
            )}
          </Button>
        </div>
      </div>
    </CardContent>
  );
}
