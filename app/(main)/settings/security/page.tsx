// src/features/clients/components/ClientInfoPage.tsx
"use client";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import BreadcrumbPages from "@/components/BreadcrumbPages";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import ClientProfileHeaderSkeleton from "@/features/clients/components/skeletons/ClientProfileHeaderSkeleton";
import NotFoundPage from "@/components/NotFoundPage";
import { Pencil } from "lucide-react";
import StaffProfileHeader from "@/features/staff/component/StaffProfileHeader";
import { getStaffByStaffId } from "@/features/staff/api/staff-service";
import { StaffPayload } from "@/features/staff/types/staff-types";
import { useAuth } from "@/features/auth/context/AuthContext";
import SecurtiyInformation from "@/features/auth/components/SecurityInformation";

export default function ClientInfoPage() {
  useEffect(() => {
    document.title = "User Profile | Stella - Five Star Finance Inc.";
  }, []);

  const { user } = useAuth();

  const userId = user!.id;

  const { data: staffData, isLoading } = useQuery<StaffPayload>({
    queryKey: ["staffByStaffId", userId],
    queryFn: () => getStaffByStaffId(userId),
  });

  const router = useRouter();

  return (
    <ContentLayout title={"Security Information"}>
      <div className="flex justify-between items-center mb-4">
        <BreadcrumbPages
          links={[
            { href: "/", label: "Home" },
            { href: "/settings", label: "Settings" },
            { href: `/settings/security`, label: "Security" },
            { href: `/settings/security/${userId}`, label: userId },
          ]}
        />

        <Button
          variant="default"
          size="sm"
          onClick={() => router.push(`/settings/security/edit`)}
          className="gap-2 p-5 rounded-lg"
          disabled={isLoading || !staffData}
        >
          <Pencil className="h-4 w-4" />
          Edit Security Info
        </Button>
      </div>
      {isLoading ? (
        <ClientProfileHeaderSkeleton />
      ) : staffData ? (
        <>
          <StaffProfileHeader
            staffId={staffData.staffId}
            status={staffData.status || "INACTIVE"}
            fullName={staffData.fullName}
            role={staffData.userAuth.role}
            branchName={staffData.branch!.name}
            isOwnProfile
          />
          <SecurtiyInformation isOwnProfile />
        </>
      ) : (
        <NotFoundPage title={"Client"} />
      )}
    </ContentLayout>
  );
}
