// src/features/clients/components/ClientInfoPage.tsx
"use client";
import BreadcrumbPages from "@/components/BreadcrumbPages";
import Loading from "@/components/LoadingPage";
import NotFoundPage from "@/components/NotFoundPage";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import { Button } from "@/components/ui/button";
import SecurtiyInformation from "@/features/auth/components/SecurityInformation";
import { useAuth } from "@/features/auth/context/AuthContext";
import ClientProfileHeaderSkeleton from "@/features/clients/components/skeletons/ClientProfileHeaderSkeleton";
import { getStaffByStaffId } from "@/features/staff/api/staff-service";
import StaffProfileHeader from "@/features/staff/component/StaffProfileHeader";
import { StaffPayload } from "@/features/staff/types/staff-types";
import { useQuery } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SecurityInfoPage() {
  useEffect(() => {
    document.title = "User Security | Stella - Five Star Finance Inc.";
  }, []);

  const { user, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();

  const userId = user?.id;

  const { data: ownerData, isLoading } = useQuery<StaffPayload>({
    queryKey: ["ownerByStaffId", userId],
    queryFn: () => getStaffByStaffId(userId!),
    enabled: !!userId,
  });

  if (isAuthLoading) return <Loading />;
  if (!userId) return <NotFoundPage title="User" />;

  return (
    <ContentLayout title={"Security Settings"}>
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
          disabled={isLoading || !ownerData}
        >
          <Pencil className="h-4 w-4" />
          Edit Security Info
        </Button>
      </div>
      {isLoading ? (
        <ClientProfileHeaderSkeleton />
      ) : ownerData ? (
        <>
          <StaffProfileHeader
            staffId={ownerData.staffId}
            status={ownerData.status || "INACTIVE"}
            fullName={ownerData.fullName}
            role={ownerData.userAuth.role}
            branchName={ownerData.branch!.name}
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
