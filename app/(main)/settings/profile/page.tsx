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
import StaffPersonalInformation from "@/features/staff/component/StaffPersonalInformation";
import { formatFullAddress } from "@/utils/format-full-address";
import { useAuth } from "@/features/auth/context/AuthContext";

export default function ClientInfoPage() {
  useEffect(() => {
    document.title = "User Profile | Stella - Five Star Finance Inc.";
  }, []);

  const { user } = useAuth();

  const userId = user!.id;

  const { data: ownerData, isLoading } = useQuery<StaffPayload>({
    queryKey: ["ownerByStaffId", userId],
    queryFn: () => getStaffByStaffId(userId),
  });

  const router = useRouter();

  return (
    <ContentLayout title={"Profile Settings"}>
      <div className="flex justify-between items-center mb-4">
        <BreadcrumbPages
          links={[
            { href: "/", label: "Home" },
            { href: "/settings", label: "Settings" },
            { href: `/settings/profile`, label: "Profile" },
            { href: `/settings/profile/${userId}`, label: userId },
          ]}
        />

        <Button
          variant="default"
          size="sm"
          onClick={() => router.push(`/settings/profile/edit`)}
          className="gap-2 p-5 rounded-lg"
          disabled={isLoading || !ownerData}
        >
          <Pencil className="h-4 w-4" />
          Edit Profile Info
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
          <StaffPersonalInformation
            birthDate={ownerData.birthDate}
            gender={ownerData.gender}
            civilStatus={ownerData.civilStatus}
            religion={ownerData.religion}
            birthPlace={ownerData.placeOfBirth}
            address={formatFullAddress(ownerData.address)}
            primaryContact={ownerData.contactInfo.primary_contact}
            secondaryContact={ownerData.contactInfo.secondary_contact}
            isOwnProfile
          />
        </>
      ) : (
        <NotFoundPage title={"Client"} />
      )}
    </ContentLayout>
  );
}
