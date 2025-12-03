// src/features/clients/components/ClientInfoPage.tsx
"use client";

import BreadcrumbPages from "@/components/BreadcrumbPages";
import NotFoundPage from "@/components/NotFoundPage";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/context/AuthContext";
import ClientProfileHeaderSkeleton from "@/features/clients/components/skeletons/ClientProfileHeaderSkeleton";
import { getStaffByStaffId } from "@/features/staff/api/staff-service";
import StaffPersonalInformation from "@/features/staff/component/StaffPersonalInformation";
import StaffProfileHeader from "@/features/staff/component/StaffProfileHeader";
import { StaffPayload } from "@/features/staff/types/staff-types";
import { formatFullAddress } from "@/utils/format-full-address";
import { useQuery } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfileInfoPage() {
  useEffect(() => {
    document.title = "User Profile | Stella - Five Star Finance Inc.";
  }, []);

  // 1. Always call hooks at the top — NEVER conditionally
  const { user, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Only compute userId when user exists
  const userId = user?.id;

  // 2. This hook is ALWAYS called (never skipped)
  const {
    data: ownerData,
    isLoading: isOwnerProfileLoading,
    refetch,
  } = useQuery<StaffPayload>({
    queryKey: ["ownerByStaffId", userId],
    queryFn: () => getStaffByStaffId(userId!),
    enabled: !!userId, // ← important: don't run query until we have userId
  });

  useEffect(() => {
    refetch();
  }, [pathname]);

  // Safe to render everything now
  return (
    <ContentLayout title={"Profile Settings"}>
      <div className="flex justify-between items-center mb-4">
        <BreadcrumbPages
          links={[
            { href: "/", label: "Home" },
            { href: "/settings", label: "Settings" },
            { href: "/settings/profile", label: "Profile" },
            { href: `/settings/profile/${userId}`, label: String(userId) },
          ]}
        />

        <Button
          variant="default"
          size="sm"
          onClick={() => router.push(`/settings/profile/edit`)}
          className="gap-2 p-5 rounded-lg"
        >
          <Pencil className="h-4 w-4" />
          Edit Profile Info
        </Button>
      </div>
      {isAuthLoading || !user || isOwnerProfileLoading ? (
        <ClientProfileHeaderSkeleton />
      ) : ownerData && !isAuthLoading && !isOwnerProfileLoading && user ? (
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
