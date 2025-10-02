import { Staff } from "../types/staff-types";

export const mockStaff: Staff[] = [
  {
    id: "1",
    firstName: "Juan",
    lastName: "Dela Cruz",
    email: "juan.delacruz@fivestar.com",
    role: "admin",
    status: "active",
    createdAt: "2024-01-15T08:00:00Z",
    lastLogin: "2025-02-10T14:30:00Z",
  },
  {
    id: "2",
    firstName: "Maria",
    lastName: "Santos",
    email: "maria.santos@fivestar.com",
    role: "loans",
    status: "active",
    createdAt: "2024-02-20T09:00:00Z",
    lastLogin: "2025-02-10T10:15:00Z",
  },
  {
    id: "3",
    firstName: "Pedro",
    lastName: "Reyes",
    email: "pedro.reyes@fivestar.com",
    role: "sales",
    status: "active",
    createdAt: "2024-03-10T10:00:00Z",
    lastLogin: "2025-02-09T16:45:00Z",
  },
  {
    id: "4",
    firstName: "Ana",
    lastName: "Garcia",
    email: "ana.garcia@fivestar.com",
    role: "sales",
    status: "inactive",
    createdAt: "2024-04-05T11:00:00Z",
    lastLogin: "2025-01-20T09:00:00Z",
  },
];
