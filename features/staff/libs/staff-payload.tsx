import { formatFullName } from "@/utils/format-full-name";
import { generateEmail } from "@/utils/generate-email";
import { StaffFormValues, StaffPayload } from "../types/staff-types";
import { format } from "date-fns";
import { decodeFullName } from "@/utils/decode-full-name";
import { formatContactNumber } from "@/utils/format-contact-number";

export const staffPayload = (data: StaffFormValues): StaffPayload => {
  return {
    fullName: formatFullName({
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      suffix: data.suffix,
    }),
    gender: data.gender,
    birthDate: data.dateOfBirth,
    religion: data.religion,
    civilStatus: data.civilStatus,
    occupation: "STAFF",
    branchId: Number(data.branchId),
    placeOfBirth: data.placeOfBirth,
    staffId: data.staffId,
    userAuth: {
      email: generateEmail(
        formatFullName({
          firstName: data.firstName,
          middleName: data.middleName,
          lastName: data.lastName,
          suffix: data.suffix,
        })
      ),
      password: format(new Date(data.dateOfBirth), "yyyyMMdd"),
      role: data.role,
    },

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

export function mapBackendToStaffFormValues(staffData: StaffPayload): StaffFormValues {
  const { firstName, middleName, lastName, suffix } = decodeFullName(staffData.fullName);
  return {
    // Client Info
    firstName,
    middleName,
    lastName,
    suffix,
    dateOfBirth: new Date(staffData.birthDate),
    gender: staffData.gender.toUpperCase(),
    addressLine1: staffData.address.addressLine1,
    addressLine2: staffData.address.addressLine2 ?? "",
    barangay: staffData.address.barangay ?? "",
    cityOrMunicipality: staffData.address.cityOrMunicipality,
    province: staffData.address.province,
    region: staffData.address.region,
    zipCode: staffData.address.zipCode,
    primaryContact: formatContactNumber(staffData.contactInfo.primary_contact),
    secondaryContact: formatContactNumber(staffData.contactInfo.secondary_contact),
    religion: staffData.religion,
    civilStatus: staffData.civilStatus.toUpperCase(),
    role: staffData.userAuth?.role ?? "",
    branchId: String(staffData.branchId),
    staffId: staffData.staffId,
    placeOfBirth: staffData.placeOfBirth,
  };
}
