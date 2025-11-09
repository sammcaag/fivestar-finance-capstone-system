export type ClientSearchRecord = {
  id: string;
  fullName: string;
  branch: string;
  status: "active" | "inactive" | "pending" | "processed" | "released";
  productType:
    | "New Client"
    | "Extension"
    | "Additional"
    | "Renewal"
    | "Reloan";
};

export const clientSearchMock: ClientSearchRecord[] = [
  {
    id: "CL-0001",
    fullName: "Amelia Reyes",
    branch: "Cagayan de Oro City",
    status: "active",
    productType: "New Client",
  },
  {
    id: "CL-0002",
    fullName: "Benjamin Cruz",
    branch: "Quezon City",
    status: "pending",
    productType: "Extension",
  },
  {
    id: "CL-0003",
    fullName: "Carina Santos",
    branch: "Zamboanga City",
    status: "released",
    productType: "Renewal",
  },
  {
    id: "CL-0004",
    fullName: "Diego Villanueva",
    branch: "Iloilo City",
    status: "active",
    productType: "Reloan",
  },
  {
    id: "CL-0005",
    fullName: "Elena Navarro",
    branch: "Davao City",
    status: "inactive",
    productType: "Additional",
  },
  {
    id: "CL-0006",
    fullName: "Francis Mendoza",
    branch: "Cebu City",
    status: "processed",
    productType: "New Client",
  },
  {
    id: "CL-0007",
    fullName: "Gianna Torres",
    branch: "Bacolod City",
    status: "active",
    productType: "Extension",
  },
  {
    id: "CL-0008",
    fullName: "Hector Ramos",
    branch: "San Fernando",
    status: "pending",
    productType: "Additional",
  },
  {
    id: "CL-0009",
    fullName: "Isabelle Flores",
    branch: "Tagum City",
    status: "released",
    productType: "Renewal",
  },
  {
    id: "CL-0010",
    fullName: "Jared Bautista",
    branch: "General Santos",
    status: "processed",
    productType: "Reloan",
  },
  {
    id: "CL-0011",
    fullName: "Katrina Pangilinan",
    branch: "Tuguegarao City",
    status: "active",
    productType: "New Client",
  },
  {
    id: "CL-0012",
    fullName: "Lorenzo Escueta",
    branch: "Legazpi City",
    status: "inactive",
    productType: "Extension",
  },
  {
    id: "CL-0013",
    fullName: "Maya Castillo",
    branch: "Calapan City",
    status: "pending",
    productType: "Additional",
  },
  {
    id: "CL-0014",
    fullName: "Noah Pascual",
    branch: "Antipolo City",
    status: "released",
    productType: "Renewal",
  },
  {
    id: "CL-0015",
    fullName: "Olivia Sebastian",
    branch: "Batangas City",
    status: "active",
    productType: "Reloan",
  },
  {
    id: "CL-0016",
    fullName: "Paolo Guevarra",
    branch: "Marikina City",
    status: "processed",
    productType: "Extension",
  },
  {
    id: "CL-0017",
    fullName: "Queenie Aguilar",
    branch: "Pasig City",
    status: "pending",
    productType: "New Client",
  },
  {
    id: "CL-0018",
    fullName: "Rafael Dominguez",
    branch: "Makati City",
    status: "active",
    productType: "Additional",
  },
  {
    id: "CL-0019",
    fullName: "Sofia Velasco",
    branch: "Manila",
    status: "released",
    productType: "Renewal",
  },
  {
    id: "CL-0020",
    fullName: "Tomas Javier",
    branch: "Cavite City",
    status: "processed",
    productType: "Reloan",
  },
];
