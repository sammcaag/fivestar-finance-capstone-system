// features/clients/schema/client-zod-schema.ts
import { z } from "zod";

const today = new Date();
today.setHours(0, 0, 0, 0);

// Utility for a generic text field with trim, min, max
export const createStringField = (fieldName: string, min = 8, max = 150) =>
  z
    .string()
    .trim()
    .min(min, `${fieldName} must be at least ${min} characters`)
    .max(max, `${fieldName} must be at most ${max} characters`);

// Utility for optional text field that allows empty string
export const createOptionalStringField = (fieldName: string, min = 8, max = 150) =>
  z
    .string()
    .trim()
    .min(min, `${fieldName} must be at least ${min} characters`)
    .max(max, `${fieldName} must be at most ${max} characters`)
    .optional()
    .or(z.literal(""));

// Utility for zip code

export const createZipCodeField = (fieldName: string) =>
  z
    .number()
    .int(`${fieldName} must be an integer`)
    .min(1000, `${fieldName} must be at least 1000`)
    .max(9999, `${fieldName} must be 4 digits`)
    .optional();

// -----------------------------
// Step 1: Client General Info
// -----------------------------
export const clientGeneralInfoSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name is atleast 2 characters")
    .max(50, "First name is at most 50 characters"),
  middleName: z
    .string()
    .trim()
    .min(2, "Middle name is atleast 2 characters")
    .max(50, "Middle name is at most 50 characters")
    .optional()
    .or(z.literal("")), // allow empty string
  lastName: z
    .string()
    .trim()
    .min(2, "Last name is atleast 2 characters")
    .max(50, "Last name is at most 50 characters"),
  suffix: z.string().optional(),
  dateOfBirth: z.date().refine(
    (dob) => {
      // The latest allowed birthdate (today minus 18 years)
      const minDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

      return dob <= minDate;
    },
    {
      message: "Client must be at least 18 years old.",
    }
  ),
  gender: z.string().refine((v) => v !== "", { message: "Gender is required" }),

  addressLine1: createStringField("Address line 1"),
  addressLine2: createOptionalStringField("Address line 2"),
  barangay: createOptionalStringField("Barangay"),
  cityOrMunicipality: createStringField("City or municipality"),
  province: createStringField("Province"),
  region: z.string().min(1, "Region is required"),
  zipCode: z
    .number()
    .int("Zip code must be an integer")
    .min(1000, "Zip code must be at least 1000")
    .max(9999, "Zip code must be 4 digits"),

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

  religion: z
    .string()
    .trim()
    .min(4, "Religion must be at least 8 characters")
    .max(100, "Religion must be at most 100 characters"),
  civilStatus: z.string().refine((v) => v !== "", {
    message: "Civil status is required",
  }),
  occupation: z
    .string()
    .trim()
    .min(8, "Occupation must be at least 8 characters")
    .max(200, "Occupation must be at most 200 characters"),

  mothersMaidenName: z
    .string()
    .trim()
    .min(8, "Mother's maiden name must be at least 8 characters")
    .max(200, "Mother's maiden name must be at most 200 characters")
    .optional()
    .or(z.literal("")), // allow empty string

  placeOfBirth: z
    .string()
    .trim()
    .min(8, "Place of birth must be at least 8 characters")
    .max(200, "Place of birth must be at most 200 characters"),
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
  spouseAddressLine1: createOptionalStringField("Spouse Address Line 1"),
  spouseAddressLine2: createOptionalStringField("Spouse Address Line 2"),
  spouseBarangay: createOptionalStringField("Spouse Barangay"),
  spouseCityOrMunicipality: createOptionalStringField("Spouse City or Municipality"),
  spouseProvince: createOptionalStringField("Spouse Province"),
  spouseRegion: z.string().optional(),
  spouseZipCode: z.number().optional(),

  spouseContactNumber: z
    .string()
    .optional()
    .refine((val) => !val || /^\+639\d{9}$/.test(val), {
      message: "Spouse contact number must start with +639 and have 10 digits total",
    }),

  // First child
  firstChildName: z.string().optional(),
  firstChildDateOfBirth: z.date().optional(),
  firstChildAddressSameAsClient: z.boolean().optional(),
  firstChildAddressSameAsSpouse: z.boolean().optional(),
  firstChildBirthOrder: z.number().optional().nullable(),
  firstChildAddressLine1: createOptionalStringField("First Child Address Line 1"),
  firstChildAddressLine2: createOptionalStringField("First Child Address Line 2"),
  firstChildBarangay: createOptionalStringField("First Child Barangay"),
  firstChildCityOrMunicipality: createOptionalStringField("First Child City or Municipality"),
  firstChildProvince: createOptionalStringField("First Child Province"),
  firstChildRegion: z.string().optional(),
  firstChildZipCode: z.number().optional(),

  // Second child
  secondChildName: z.string().optional(),
  secondChildDateOfBirth: z.date().optional(),
  secondChildAddressSameAsClient: z.boolean().optional(),
  secondChildAddressSameAsSpouse: z.boolean().optional(),
  secondChildBirthOrder: z.number().optional().nullable(),
  secondChildAddressLine1: createOptionalStringField("Second Child Address Line 1"),
  secondChildAddressLine2: createOptionalStringField("Second Child Address Line 2"),
  secondChildBarangay: createOptionalStringField("Second Child Barangay"),
  secondChildCityOrMunicipality: createOptionalStringField("Second Child City or Municipality"),
  secondChildProvince: createOptionalStringField("Second Child Province"),
  secondChildRegion: z.string().optional(),
  secondChildZipCode: z.number().optional(),

  // Third child
  thirdChildName: z.string().optional(),
  thirdChildDateOfBirth: z.date().optional(),
  thirdChildAddressSameAsClient: z.boolean().optional(),
  thirdChildAddressSameAsSpouse: z.boolean().optional(),
  thirdChildBirthOrder: z.number().optional().nullable(),
  thirdChildAddressLine1: createOptionalStringField("Third Child Address Line 1"),
  thirdChildAddressLine2: createOptionalStringField("Third Child Address Line 2"),
  thirdChildBarangay: createOptionalStringField("Third Child Barangay"),
  thirdChildCityOrMunicipality: createOptionalStringField("Third Child City or Municipality"),
  thirdChildProvince: createOptionalStringField("Third Child Province"),
  thirdChildRegion: z.string().optional(),
  thirdChildZipCode: z.number().optional(),
});

const oneYearAgo = new Date();
oneYearAgo.setHours(0, 0, 0, 0);
oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

// -----------------------------
// Step 3: Pensioner Info
// -----------------------------
export const pensionerInfoSchema = z.object({
  rank: z.string().min(1, "Rank is required"),
  pensionType: z.string().min(1, "Pension type is required"),
  serialNumber: createStringField("Serial number"),
  idNumber: createStringField("ID number", 4, 100),
  dateEnteredService: z.date().refine((d) => d <= oneYearAgo, {
    message: "Date entered service must be at least 1 year ago",
  }),

  dateSeparationService: z.date().refine((d) => d <= oneYearAgo, {
    message: "Date separation service must be at least 1 year ago",
  }),

  dateRetiredService: z.date().refine((d) => d <= oneYearAgo, {
    message: "Date retired service must be at least 1 year ago",
  }),
  lengthOfService: z.number().min(1, "Length of service is required"),
  lastUnitAssigned: createStringField("Last unit assigned", 3, 150),
  branchOfService: createStringField("Branch of service", 3, 150),
});

// -----------------------------
// Step 4: Account Info
// -----------------------------
export const accountInfoSchema = z.object({
  monthlyPension: z.number().min(2000, "Monthly pension is atleast 2000"),
  monthlyDeduction: z.number().min(1000, "Monthly deduction is atleast 1000"),
  atmAccountNumber: z
    .string()
    .trim()
    .min(10, "ATM account number must be at least 10 digits")
    .max(16, "ATM account number cannot exceed 16 digits")
    .regex(/^\d+$/, "ATM account number must contain only digits"),
  bankName: createStringField("Bank name", 3, 150),
  branchOfBank: createStringField("Branch of bank", 3, 150),
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
  const hasText = (v: unknown): v is string => typeof v === "string" && v.trim().length > 0;

  // -------- spouse ----------
  const spouseNamePresent =
    hasText(data.spouseFirstName) || hasText(data.spouseMiddleName) || hasText(data.spouseLastName);

  if (spouseNamePresent) {
    const spouseFields: Array<keyof typeof data> = [
      "spouseFirstName",
      "spouseLastName",
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
        (typeof val === "number" && (Number.isNaN(val) || (field === "spouseZipCode" && val <= 0)));

      if (missing) {
        ctx.addIssue({
          path: [field as string],
          code: z.ZodIssueCode.custom,
          message: (() => {
            switch (field) {
              case "spouseAddressLine1":
                return "Address Line 1 is required when spouse name is provided";
              case "spouseCityOrMunicipality":
                return "City / Municipality is required when spouse name is provided";
              case "spouseProvince":
                return "Province is required when spouse name is provided";
              case "spouseRegion":
                return "Region is required when spouse name is provided";
              case "spouseZipCode":
                return "Zip Code is required when spouse name is provided";
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
    if (!hasText(nameVal)) return; // skip if no name
    addressKeys.forEach((field) => {
      const val = data[field];
      const missing =
        val === undefined ||
        val === null ||
        (typeof val === "string" && val.trim() === "") ||
        (typeof val === "number" &&
          (Number.isNaN(val) || (field.toString().includes("ZipCode") && val <= 0)));

      if (missing) {
        ctx.addIssue({
          path: [field as string],
          code: z.ZodIssueCode.custom,
          message: `${String(field)
            .replace(nameKey.toString().replace("Name", ""), "")
            .replace(/([A-Z])/g, " $1")
            .trim()} is required when ${label} name is provided`,
        });
      }
    });
    // Validate date of birth only if name exists
    const dobField = nameKey.toString().replace("Name", "DateOfBirth") as keyof typeof data;
    const dobVal = data[dobField];

    if (!dobVal) {
      ctx.addIssue({
        path: [dobField as string],
        code: z.ZodIssueCode.custom,
        message: `${label} Date of Birth is required when name is provided`,
      });
    } else {
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

      if (dobVal > oneYearAgo) {
        ctx.addIssue({
          path: [dobField as string],
          code: z.ZodIssueCode.custom,
          message: `${label} must be at least 1 year old`,
        });
      }
    }
  });
});

// Export type
export type ClientFormValues = z.infer<typeof clientFormSchema>;
