"use client";
import { Tabs } from "@/components/ui/tabs";
import PersonalInformationTab from "./profile/PersonalInformationTab";
import FamilyInformationTab from "./profile/FamilyInformationTab";
import PensionInformationTab from "./profile/PensionInformationTab";
import AttachmentsTab from "./profile/AttachmentsTab";
import TabListCustomComp from "@/components/TabListCustomComp";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ClientPayload } from "../types/client-types";
import { formatFullAddress } from "@/utils/format-full-address";
import ClientProfileHeader from "./profile/ClientProfileHeader";
import { decodeFullName } from "@/utils/decode-full-name";
import { formatFullNameFromParts } from "@/utils/format-full-name-from-parts";

const tabs = [
  { value: "personal", label: "Personal Information" },
  { value: "family", label: "Family Information" },
  { value: "pension", label: "Pension Information" },
  { value: "attachments", label: "Attachments" },
];

export default function ClientInformation({
  client,
}: {
  client: ClientPayload;
}) {
  const router = useRouter();
  // get link details and detect if tab is present then assign it as defaultvalue
  const searchParams = useSearchParams();
  const defaultValue = searchParams.get("tab");

  const handleChange = (value: string) => {
    router.push(`?tab=${value}`, { scroll: false });
  };

  return (
    <>
      <ClientProfileHeader
        birthDate={client.birthDate}
        gender={client.gender}
        civilStatus={client.civilStatus}
        rank={client.clientPension.rank}
        lastUnitAssigned={client.clientPension.lastUnitAssigned}
        address={formatFullAddress(client.address)}
        serialNumber={client.clientPension.serialNumber}
        branchOfService={client.clientPension.branchOfService}
        monthlyPension={client.clientAccount.monthlyPension}
        monthlyDeduction={client.clientAccount.monthlyDeduction}
        status={client.status ?? "INACTIVE"}
        fullName={formatFullNameFromParts(decodeFullName(client.fullName))}
        profileImageUrl={client.profileImageUrl}
        remarks={client.remarks}
        branchName={client.branch!.name.replace(/branch/i, "").trim()}
      />
      <Tabs
        className="w-full"
        defaultValue={defaultValue || "personal"}
        onValueChange={handleChange}
      >
        <TabListCustomComp tabs={tabs} />

        {/* General Information Tab */}
        <PersonalInformationTab
          birthDate={client.birthDate}
          civilStatus={client.civilStatus}
          religion={client.religion}
          birthPlace={client.placeOfBirth}
          address={formatFullAddress(client.address)}
          primaryContact={client.contactInfo.primary_contact}
          secondaryContact={client.contactInfo.secondary_contact}
        />

        {/* Other Information Tab */}
        <FamilyInformationTab familyInfos={client.clientFamilyInfos} />

        {/* Pension Information Tab */}
        <PensionInformationTab
          clientPension={client.clientPension}
          clientAccount={client.clientAccount}
        />

        {/* Attachments Tab */}
        <AttachmentsTab />
      </Tabs>
    </>
  );
}
