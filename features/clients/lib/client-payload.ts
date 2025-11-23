import type { ClientFormValues } from "../types/client-types";

export const clientPayload = (data: ClientFormValues) => {
  return {
    fullName:
      `${data.firstName} ${data.middleName} ${data.lastName} ${data.suffix}`.trim(),
    gender: data.gender,
    birthDate: data.dateOfBirth,
    religion: data.religion,
    civilStatus: data.civilStatus,
    occupation: data.occupation,
    placeOfBirth: data.placeOfBirth,

    // Address
    address: {
      addressLine1: data.addressLine1,
      addressLine2: data.addressLine2 || null,
      barangay: data.barangay,
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

    // Pension info
    clientPension: {
      rank: data.rank,
      pensionType: data.pensionType,
      serialNumber: data.serialNumber || null,
      idNumber: data.idNumber || null,
      dateEnteredService: data.dateEnteredService,
      dateSeparationService: data.dateSeparationService,
      dateRetiredService: data.dateRetiredService,
      lengthOfService: data.lengthOfService || null,
      lastUnitAssigned: data.lastUnitAssigned || null,
      branchOfService: data.branchOfService || null,
    },

    // Account info
    clientAccount: {
      monthlyPension: data.monthlyPension || null,
      monthlyDeduction: data.monthlyDeduction || null,
      atmAccountNumber: data.atmAccountNumber || null,
      bankName: data.bankName || null,
      branchOfBank: data.branchOfBank || null,
    },

    // Family info
    clientFamilyInfos: [
      // Mother
      data.mothersMaidenName
        ? {
            name: data.mothersMaidenName,
            birthDate: null, // optional if you don't have mother's DOB
            relationship: "mother",
            address: null,
            contactInfo: null,
          }
        : null,

      // Spouse
      data.spouseFirstName
        ? {
            name: `${data.spouseFirstName} ${data.spouseMiddleName} ${data.spouseLastName}`.trim(),
            birthDate: data.spouseDateOfBirth,
            relationship: "spouse",
            addressSameAsClient: data.spouseAddressSameAsClient,
            address: {
              addressLine1: data.spouseAddressLine1,
              addressLine2: data.spouseAddressLine2 || null,
              barangay: data.spouseBarangay,
              cityOrMunicipality: data.spouseCityOrMunicipality,
              province: data.spouseProvince,
              region: data.spouseRegion,
              zipCode: data.spouseZipCode,
            },
            // Only include contactInfo if spouseContactNumber is non-empty string
            ...(typeof data.spouseContactNumber === "string" &&
            data.spouseContactNumber.trim().length > 1
              ? {
                  contactInfo: {
                    primary_contact: data.spouseContactNumber.trim(),
                  },
                }
              : {}),
          }
        : null,

      // First child
      data.firstChildName
        ? {
            name: data.firstChildName,
            birthDate: data.firstChildDateOfBirth,
            relationship: "child",
            addressSameAsClient: data.firstChildAddressSameAsClient,
            addressSameAsSpouse: data.firstChildAddressSameAsSpouse,
            address: {
              addressLine1: data.firstChildAddressLine1,
              addressLine2: data.firstChildAddressLine2 || null,
              barangay: data.firstChildBarangay,
              cityOrMunicipality: data.firstChildCityOrMunicipality,
              province: data.firstChildProvince,
              region: data.firstChildRegion,
              zipCode: data.firstChildZipCode,
            },
          }
        : null,

      // Second child
      data.secondChildName
        ? {
            name: data.secondChildName,
            birthDate: data.secondChildDateOfBirth,
            relationship: "child",
            addressSameAsClient: data.secondChildAddressSameAsClient,
            addressSameAsSpouse: data.secondChildAddressSameAsSpouse,
            address: {
              addressLine1: data.secondChildAddressLine1,
              addressLine2: data.secondChildAddressLine2 || null,
              barangay: data.secondChildBarangay,
              cityOrMunicipality: data.secondChildCityOrMunicipality,
              province: data.secondChildProvince,
              region: data.secondChildRegion,
              zipCode: data.secondChildZipCode,
            },
          }
        : null,

      // Third child
      data.thirdChildName
        ? {
            name: data.thirdChildName,
            birthDate: data.thirdChildDateOfBirth,
            relationship: "child",
            addressSameAsClient: data.thirdChildAddressSameAsClient,
            addressSameAsSpouse: data.thirdChildAddressSameAsSpouse,
            address: {
              addressLine1: data.thirdChildAddressLine1,
              addressLine2: data.thirdChildAddressLine2 || null,
              barangay: data.thirdChildBarangay,
              cityOrMunicipality: data.thirdChildCityOrMunicipality,
              province: data.thirdChildProvince,
              region: data.thirdChildRegion,
              zipCode: data.thirdChildZipCode,
            },
          }
        : null,
    ].filter(Boolean), // remove nulls
  };
};
