import { ClientTableProps } from "../types/client-types";

type AddressInfo = {
  type: "current" | "home";
  houseNumber?: string;
  buildingNumber?: string;
  street?: string;
  barangay: string;
  cityOrMunicipality: string;
  province: string;
  region: string;
  zipCode: string;
  country: string;
  fullAddress: string;
};

type FamilyInfo = {
  id: string;
  fullName: string;
  relationship: string;
  dateOfBirth: string;
  contactNumber?: string;
  address?: AddressInfo;
};

export const clientData = {
  // Client table based structure
  id: "SPKND-EJIUS",
  fullName: "John Doe",
  dateOfBirth: "1958-01-15",
  gender: "Male",
  placeOfBirth: "Springfield, USA",
  civilStatus: "married",
  religion: "Roman Catholic",
  profileImageUrl: "https://github.com/shadcn.png",
  occupation: "Software Engineer",
  remarks:
    "Client has been with us for over 10 years. Very responsive to communications.",
  contactInfo: [
    {
      id: "1",
      type: "primary",
      number: "(555) 123-4567",
    },
    {
      id: "2",
      type: "secondary",
      number: "(555) 987-6543",
    },
  ],
  branch: {
    id: "1",
    name: "Branch 1",
    code: "BR1",
    address: "123 Main St, Springfield, USA",
  },

  status: "ACTIVE", //???

  // Address Info based structure
  address: {
    type: "home",
    houseNumber: "550",
    buildingNumber: "N",
    street: "King St",
    barangay: "Honolulu",
    cityOrMunicipality: "Honolulu",
    province: "Hawaii",
    region: "Hawaii",
    zipCode: "96817",
    country: "USA",
    fullAddress: "550 N King St, Honolulu, Hawaii 96817",
  } as AddressInfo,

  // Pension Info based structure
  rank: "Captain",
  pensionType: "Military",
  serialNumber: "M12345678",
  idNumber: "12345678",
  dateEnteredService: "1980-06-10",
  dateSeparationService: "2010-06-10",
  dateRetiredService: "2010-06-15",
  lengthOfService: "30 years",
  lastUnitAssigned: "7th Infantry Division",
  branchOfService: "Army",

  // Account Information based structure
  accountNumber: "123456789",
  monthlyPension: 12870,
  monthlyDeduction: 1500,
  atmAccountNumber: "ATM123456789",
  bankName: "First National Bank",
  branchOfBank: "Downtown Branch",

  fi1: 1230, // No idea where this should be

  // Family Members
  familyMembers: [
    {
      id: "1",
      fullName: "Sarah Smith",
      relationship: "dependent",
      dateOfBirth: "March 22, 1960",
    },
    {
      id: "2",
      fullName: "Michael Smith",
      relationship: "dependent",
      dateOfBirth: "April 10, 1985",
    },
    {
      id: "3",
      fullName: "Jennifer Smith",
      relationship: "dependent",
      dateOfBirth: "July 18, 1988",
    },
    {
      id: "4",
      fullName: "Sarah Jane Smith",
      relationship: "spouse",
      dateOfBirth: "January 15, 1958",
      contactNumber: "(555) 234-5678",
      address: {
        type: "home",
        houseNumber: "550",
        buildingNumber: "N",
        street: "King St",
        barangay: "Honolulu",
        cityOrMunicipality: "Honolulu",
        province: "Hawaii",
        region: "Hawaii",
        zipCode: "96817",
        country: "USA",
        fullAddress: "550 N King St, Honolulu, Hawaii 96817",
      },
    },
    {
      id: "5",
      fullName: "Mary Johnson",
      relationship: "mother",
      dateOfBirth: "April 10, 1950",
      contactNumber: "(555) 345-6789",
    },
  ] as FamilyInfo[],

  // Attachments based structure
  attachments: [
    {
      name: "Birth Certificate.pdf",
      type: "pdf",
      date: "Jan 15, 2023",
      size: "1.2 MB",
    },
    {
      name: "Military ID Card.jpg",
      type: "image",
      date: "Feb 3, 2023",
      size: "0.8 MB",
    },
    {
      name: "Service Record.pdf",
      type: "pdf",
      date: "Mar 12, 2023",
      size: "3.5 MB",
    },
    {
      name: "Medical Report.doc",
      type: "doc",
      date: "Apr 5, 2023",
      size: "1.7 MB",
    },
    {
      name: "Pension Application.pdf",
      type: "pdf",
      date: "May 20, 2023",
      size: "2.1 MB",
    },
  ],
};

export const clientTableData: ClientTableProps[] = [
  {
    id: "728ed52f",
    name: "John Smith",
    email: "john.smith@example.com",
    status: "active",
    created_at: "2023-11-10",
    branchName: "Cagayan de Oro City",
  },
  {
    id: "489e1d42",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    status: "active",
    created_at: "2023-11-15",
    branchName: "Zamboanga City",
  },
  {
    id: "573a1a8c",
    name: "Michael Brown",
    email: "m.brown@example.com",
    status: "inactive",
    created_at: "2023-10-05",
    branchName: "Ilo-Ilo City",
  },
  {
    id: "632b9a1f",
    name: "Emily Davis",
    email: "emily.d@example.com",
    status: "pending",
    created_at: "2023-11-20",
    branchName: "Davao City",
  },
  {
    id: "892c7d3e",
    name: "Robert Wilson",
    email: "r.wilson@example.com",
    status: "active",
    created_at: "2023-11-20",
    branchName: "Quezon City",
  },
  {
    id: "912e5f8b",
    name: "Jennifer Lee",
    email: "j.lee@example.com",
    status: "inactive",
    created_at: "2023-11-25",
    branchName: "Calapan City",
  },
  {
    id: "342a9c7d",
    name: "David Martinez",
    email: "d.martinez@example.com",
    status: "processed",
    created_at: "2023-11-25",
    branchName: "Tuguegarao City",
  },
  {
    id: "762d4e8a",
    name: "Lisa Thompson",
    email: "lisa.t@example.com",
    status: "active",
    created_at: "2023-11-05",
    branchName: "Tuguegarao City",
  },
  {
    id: "219f6b3c",
    name: "James Anderson",
    email: "j.anderson@example.com",
    status: "processed",
    created_at: "2023-10-15",
    branchName: "Cagayan de Oro City",
  },
  {
    id: "538e2a7f",
    name: "Patricia Garcia",
    email: "p.garcia@example.com",
    status: "active",
    created_at: "2023-11-12",
    branchName: "Zamboanga City",
  },
];
