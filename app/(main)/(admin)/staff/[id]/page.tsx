// src/features/clients/components/ClientInfoPage.tsx
"use client";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import BreadcrumbPages from "@/components/BreadcrumbPages";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
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

export default function ClientInfoPage() {
  useEffect(() => {
    document.title = "Staff Information | Stella - Five Star Finance Inc.";
  }, []);

  const params = useParams();
  const staffId = params.id as string;

  const { data: staffData, isLoading } = useQuery<StaffPayload>({
    queryKey: ["staffByStaffId", staffId],
    queryFn: () => getStaffByStaffId(staffId),
  });

  const router = useRouter();

  return (
    <ContentLayout title={"Staff Information"}>
      <div className="flex justify-between items-center mb-4">
        <BreadcrumbPages
          links={[
            { href: "/", label: "Home" },
            { href: "/staff", label: "Staff Management" },
            { href: `/staff/${staffId}`, label: staffId },
          ]}
        />

        <Button
          variant="default"
          size="sm"
          onClick={() => router.push(`/staff/${staffId}/edit`)}
          className="gap-2 p-5 rounded-lg"
          disabled={isLoading || !staffData}
        >
          <Pencil className="h-4 w-4" />
          Edit Staff Info
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
          />
          <StaffPersonalInformation
            birthDate={staffData.birthDate}
            gender={staffData.gender}
            civilStatus={staffData.civilStatus}
            religion={staffData.religion}
            birthPlace={staffData.placeOfBirth}
            address={formatFullAddress(staffData.address)}
            primaryContact={staffData.contactInfo.primary_contact}
            secondaryContact={staffData.contactInfo.secondary_contact}
          />
        </>
      ) : (
        <NotFoundPage title={"Client"} />
      )}
    </ContentLayout>
  );
}
