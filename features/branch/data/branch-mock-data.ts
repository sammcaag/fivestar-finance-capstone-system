import { Branch } from "../components/BranchCard";

const branches: Branch[] = [
  {
    id: "1",
    name: "Main Branch",
    address: "123 Main St, Cityville",
    email: "mainbranch@company.com",
    contactNumber: "+639123456789",
    staff: [
      { id: "s1", name: "Alice Smith", role: "Manager" },
      { id: "s2", name: "Bob Johnson", role: "Teller" },
      { id: "s3", name: "Charlie Davis", role: "Security" },
    ],
    clients: [
      { id: "c1", name: "Rey Lagumbay Daug Jr" },
      { id: "c2", name: "Susette Daug" },
      { id: "c3", name: "Catherine Sapico Daug" },
    ],
  },
  {
    id: "2",
    name: "North Branch",
    address: "456 North Ave, Cityville",
    email: "northbranch@company.com",
    contactNumber: "+639987654321",
    staff: [
      { id: "s4", name: "Diana Prince", role: "Manager" },
      { id: "s5", name: "Ethan Hunt", role: "Teller" },
      { id: "s6", name: "Fiona Glenanne", role: "Security" },
    ],
    clients: [
      { id: "c4", name: "Rey Daug III" },
      { id: "c5", name: "Rey Daug IV" },
      { id: "c6", name: "John Doe" },
    ],
  },
  {
    id: "3",
    name: "East Branch",
    address: "789 East Blvd, Cityville",
    email: "eastbranch@company.com",
    contactNumber: "+639112233445",
    staff: [
      { id: "s7", name: "Grace Hopper", role: "Manager" },
      { id: "s8", name: "Alan Turing", role: "Teller" },
      { id: "s9", name: "Ada Lovelace", role: "Security" },
    ],
    clients: [
      { id: "c7", name: "Mary Jane" },
      { id: "c8", name: "Peter Parker" },
      { id: "c9", name: "Bruce Wayne" },
    ],
  },
  {
    id: "4",
    name: "West Branch",
    address: "321 West Rd, Cityville",
    email: "westbranch@company.com",
    contactNumber: "+639556677889",
    staff: [
      { id: "s10", name: "Tony Stark", role: "Manager" },
      { id: "s11", name: "Steve Rogers", role: "Teller" },
      { id: "s12", name: "Natasha Romanoff", role: "Security" },
    ],
    clients: [
      { id: "c10", name: "Clark Kent" },
      { id: "c11", name: "Diana Prince" },
      { id: "c12", name: "Barry Allen" },
    ],
  },
];

export default branches;
