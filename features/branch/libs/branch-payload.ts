import { formatContactNumber } from "@/utils/format-contact-number";
import { BranchFormValues, BranchPayload } from "../types/branch-types";

export const branchPayload = (data: BranchFormValues): BranchPayload => {
  return {
    name: data.name,
    email: data.email,

    // Address
    address: {
      addressLine1: data.addressLine1,
      addressLine2: data.addressLine2 || null,
      barangay: data.barangay || null,
      cityOrMunicipality: data.cityOrMunicipality,
      province: data.province,
      region: data.region,
      zipCode: data.zipCode,
    },

    // ContactInfo
    contactInfo: {
      primary_contact: data.primaryContact,
      secondary_contact: data.secondaryContact || null,
    },
  };
};

export function mapBackendToBranchFormValues(
  staffData: BranchPayload
): BranchFormValues {
  return {
    // Client Info
    name: staffData.name,
    email: staffData.email,
    addressLine1: staffData.address.addressLine1,
    addressLine2: staffData.address.addressLine2 ?? "",
    barangay: staffData.address.barangay ?? "",
    cityOrMunicipality: staffData.address.cityOrMunicipality,
    province: staffData.address.province,
    region: staffData.address.region,
    zipCode: staffData.address.zipCode,
    primaryContact: formatContactNumber(staffData.contactInfo.primary_contact),
    secondaryContact: formatContactNumber(
      staffData.contactInfo.secondary_contact
    ),
  };
}
