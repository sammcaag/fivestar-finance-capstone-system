import { formatFullName } from "@/utils/format-full-name";
import { generateEmail } from "@/utils/generate-email";
import { StaffFormValues, StaffPayload } from "../types/staff-types";
import { format } from "date-fns";

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
    occupation: data.occupation,
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
