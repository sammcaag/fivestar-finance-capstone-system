// features/clients/schema/client-zod-schema.ts
import { z } from "zod";

const today = new Date();
today.setHours(0, 0, 0, 0);

// -----------------------------
// Step 1: Client General Info
// -----------------------------
export const clientGeneralInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  suffix: z.string().optional(),
  dateOfBirth: z.date(),
  gender: z.string().refine((v) => v !== "", { message: "Gender is required" }),

  addressLine1: z.string().min(1, "Address line 1 is required"),
  addressLine2: z.string().optional(),
  barangay: z.string().optional(),
  cityOrMunicipality: z.string().min(1, "City or municipality is required"),
  province: z.string().min(1, "Province is required"),
  region: z.string().min(1, "Region is required"),
  zipCode: z.number().min(1, "Zip code is required"),

  primaryContact: z
    .string()
    .min(1, "Phone number is required")
    .refine((val) => /^\+639\d{9}$/.test(val), {
      message: "Phone number must start with +639 and have 10 digits total",
    }),
  secondaryContact: z
    .string()
    .optional()
    .refine((val) => !val || /^\+639\d{9}$/.test(val), {
      message: "Phone number must start with +639 and have 10 digits total",
    }),

  religion: z.string().min(1, "Religion is required"),
  civilStatus: z.string().refine((v) => v !== "", {
    message: "Civil status is required",
  }),
  occupation: z.string().min(1, "Occupation is required"),
  mothersMaidenName: z.string().optional(),
  placeOfBirth: z.string().min(1, "Place of birth is required"),
});

// -----------------------------
// Step 2: Client Family Info (plain object)
// -----------------------------
export const clientFamilyInfoSchema = z.object({
  // Spouse
  spouseFirstName: z.string().optional(),
  spouseMiddleName: z.string().optional(),
  spouseLastName: z.string().optional(),
  spouseDateOfBirth: z.date().optional(),

  spouseAddressSameAsClient: z.boolean().optional(),
  spouseAddressLine1: z.string().optional(),
  spouseAddressLine2: z.string().optional(),
  spouseBarangay: z.string().optional(),
  spouseCityOrMunicipality: z.string().optional(),
  spouseProvince: z.string().optional(),
  spouseRegion: z.string().optional(),
  spouseZipCode: z.number().optional(),

  spouseContactNumber: z
    .string()
    .optional()
    .refine((val) => !val || /^\+639\d{9}$/.test(val), {
      message:
        "Spouse contact number must start with +639 and have 10 digits total",
    }),

  // First child
  firstChildName: z.string().optional(),
  firstChildDateOfBirth: z.date().optional(),
  firstChildAddressSameAsClient: z.boolean().optional(),
  firstChildAddressSameAsSpouse: z.boolean().optional(),
  firstChildBirthOrder: z.number().optional().nullable(),
  firstChildAddressLine1: z.string().optional(),
  firstChildAddressLine2: z.string().optional(),
  firstChildBarangay: z.string().optional(),
  firstChildCityOrMunicipality: z.string().optional(),
  firstChildProvince: z.string().optional(),
  firstChildRegion: z.string().optional(),
  firstChildZipCode: z.number().optional(),

  // Second child
  secondChildName: z.string().optional(),
  secondChildDateOfBirth: z.date().optional(),
  secondChildAddressSameAsClient: z.boolean().optional(),
  secondChildAddressSameAsSpouse: z.boolean().optional(),
  secondChildBirthOrder: z.number().optional().nullable(),
  secondChildAddressLine1: z.string().optional(),
  secondChildAddressLine2: z.string().optional(),
  secondChildBarangay: z.string().optional(),
  secondChildCityOrMunicipality: z.string().optional(),
  secondChildProvince: z.string().optional(),
  secondChildRegion: z.string().optional(),
  secondChildZipCode: z.number().optional(),

  // Third child
  thirdChildName: z.string().optional(),
  thirdChildDateOfBirth: z.date().optional(),
  thirdChildAddressSameAsClient: z.boolean().optional(),
  thirdChildAddressSameAsSpouse: z.boolean().optional(),
  thirdChildBirthOrder: z.number().optional().nullable(),
  thirdChildAddressLine1: z.string().optional(),
  thirdChildAddressLine2: z.string().optional(),
  thirdChildBarangay: z.string().optional(),
  thirdChildCityOrMunicipality: z.string().optional(),
  thirdChildProvince: z.string().optional(),
  thirdChildRegion: z.string().optional(),
  thirdChildZipCode: z.number().optional(),
});

// -----------------------------
// Step 3: Pensioner Info
// -----------------------------
export const pensionerInfoSchema = z.object({
  rank: z.string().min(1, "Rank is required"),
  pensionType: z.string().min(1, "Pension type is required"),
  serialNumber: z.string().min(1, "Serial Number is required"),
  idNumber: z.string().min(1, "ID Number is required"),
  dateEnteredService: z.date().refine((d) => d < today, {
    message: "Date entered service must be before today",
  }),
  dateSeparationService: z.date().refine((d) => d < today, {
    message: "Date separation service must be before today",
  }),
  dateRetiredService: z.date().refine((d) => d < today, {
    message: "Date retired service must be before today",
  }),
  lengthOfService: z.number().min(1, "Length of service is required"),
  lastUnitAssigned: z.string().min(1, "Last unit assigned is required"),
  branchOfService: z.string().min(1, "Branch of service is required"),
});

// -----------------------------
// Step 4: Account Info
// -----------------------------
export const accountInfoSchema = z.object({
  monthlyPension: z.number().min(1, "Monthly pension is required"),
  monthlyDeduction: z.number().min(1, "Monthly deduction is required"),
  atmAccountNumber: z.string().min(1, "ATM account number is required"),
  bankName: z.string().min(1, "Bank name is required"),
  branchOfBank: z.string().min(1, "Branch of bank is required"),
});

// -----------------------------
// Merge all plain schemas into a base schema
// -----------------------------
const baseSchema = clientGeneralInfoSchema
  .merge(clientFamilyInfoSchema)
  .merge(pensionerInfoSchema)
  .merge(accountInfoSchema);

// -----------------------------
// Attach superRefine on the combined schema (single place for conditional rules)
// -----------------------------
export const clientFormSchema = baseSchema.superRefine((data, ctx) => {
  const hasText = (v: unknown): v is string =>
    typeof v === "string" && v.trim().length > 0;

  // -------- spouse ----------
  const spouseNamePresent =
    hasText(data.spouseFirstName) ||
    hasText(data.spouseMiddleName) ||
    hasText(data.spouseLastName);

  if (spouseNamePresent) {
    const spouseFields: Array<keyof typeof data> = [
      "spouseAddressLine1",
      "spouseCityOrMunicipality",
      "spouseProvince",
      "spouseRegion",
      "spouseZipCode",
    ];

    spouseFields.forEach((field) => {
      const val = data[field];
      const missing =
        val === undefined ||
        val === null ||
        (typeof val === "string" && val.trim() === "") ||
        (typeof val === "number" &&
          (Number.isNaN(val) || (field === "spouseZipCode" && val <= 0)));

      if (missing) {
        ctx.addIssue({
          path: [field as string],
          code: z.ZodIssueCode.custom,
          message: (() => {
            switch (field) {
              case "spouseAddressLine1":
                return "Spouse Address Line 1 is required when spouse name is provided";
              case "spouseCityOrMunicipality":
                return "Spouse City / Municipality is required when spouse name is provided";
              case "spouseProvince":
                return "Spouse Province is required when spouse name is provided";
              case "spouseRegion":
                return "Spouse Region is required when spouse name is provided";
              case "spouseZipCode":
                return "Spouse Zip Code is required when spouse name is provided";
              default:
                return "This field is required when spouse name is provided";
            }
          })(),
        });
      }
    });
  }

  // -------- children ----------
  const childRules: Array<{
    nameKey: keyof typeof data;
    addressKeys: Array<keyof typeof data>;
    label: string;
  }> = [
    {
      nameKey: "firstChildName",
      addressKeys: [
        "firstChildAddressLine1",
        "firstChildCityOrMunicipality",
        "firstChildProvince",
        "firstChildRegion",
        "firstChildZipCode",
      ],
      label: "First Child",
    },
    {
      nameKey: "secondChildName",
      addressKeys: [
        "secondChildAddressLine1",
        "secondChildCityOrMunicipality",
        "secondChildProvince",
        "secondChildRegion",
        "secondChildZipCode",
      ],
      label: "Second Child",
    },
    {
      nameKey: "thirdChildName",
      addressKeys: [
        "thirdChildAddressLine1",
        "thirdChildCityOrMunicipality",
        "thirdChildProvince",
        "thirdChildRegion",
        "thirdChildZipCode",
      ],
      label: "Third Child",
    },
  ];

  childRules.forEach(({ nameKey, addressKeys, label }) => {
    const nameVal = data[nameKey];
    if (hasText(nameVal)) {
      addressKeys.forEach((field) => {
        const val = data[field];
        const missing =
          val === undefined ||
          val === null ||
          (typeof val === "string" && val.trim() === "") ||
          (typeof val === "number" &&
            (Number.isNaN(val) ||
              (field.toString().includes("ZipCode") && val <= 0)));

        if (missing) {
          ctx.addIssue({
            path: [field as string],
            code: z.ZodIssueCode.custom,
            message: `${label} ${String(field)
              .replace(nameKey.toString().replace("Name", ""), "")
              .replace(/([A-Z])/g, " $1")
              .trim()} is required when ${label} name is provided`,
          });
        }
      });
    }
  });
});

// Export type
export type ClientFormValues = z.infer<typeof clientFormSchema>;
