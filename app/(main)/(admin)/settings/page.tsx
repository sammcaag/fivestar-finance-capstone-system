"use client";
import { useState } from "react";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import BreadcrumbPages from "@/components/BreadcrumbPages";
import MainHeader from "@/components/MainHeader";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { PasswordChangeRequestDialog } from "@/features/settings/components/PasswordChangeRequestDialog";
import BranchName from "@/features/settings/components/BranchName";
import PersonalProfile from "@/features/settings/components/PersonalProfile";
import {
  branchInfo,
  profileInfo,
} from "@/features/settings/data/mock-settings-data";

const CardHeaderComp = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
  );
};

export default function Settings() {
  // Operational Preferences (Editable)
  const [passwordRequestPending, setPasswordRequestPending] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);

  const handlePasswordChangeRequest = () => {
    // Mock password change request
    setPasswordRequestPending(true);
    toast.success("Password change request submitted", {
      description:
        "Your request has been sent to the administrator for approval.",
    });
  };
  return (
    <ContentLayout title="Settings ">
      <BreadcrumbPages
        links={[
          { href: "/", label: "Home" },
          { href: "/settings", label: "Settings" },
        ]}
      />
      <MainHeader
        title="Settings"
        description="Update your branch details, manage notification preferences, and customize your account settings."
      />

      {/* Branch Information Section */}
      <Card>
        <CardHeaderComp
          title="Branch Information"
          description="View-only information about your branch"
        />
        <BranchName branchInfo={branchInfo} />
      </Card>

      {/* Personal Profile Section */}
      <Card>
        <CardHeaderComp
          title="Personal Profile"
          description="Your account information and security settings"
        />
        <PersonalProfile
          profileInfo={profileInfo}
          passwordRequestPending={passwordRequestPending}
          setIsPasswordDialogOpen={setIsPasswordDialogOpen}
        />
      </Card>

      {/* Password Change Request Dialog */}
      <PasswordChangeRequestDialog
        open={isPasswordDialogOpen}
        onOpenChange={setIsPasswordDialogOpen}
        onSubmit={handlePasswordChangeRequest}
      />
    </ContentLayout>
  );
}
