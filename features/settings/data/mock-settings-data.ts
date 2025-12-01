// Branch Information (Read-only)
const branchInfo = {
  name: "Manila Central Branch",
  code: "MNL-001",
  address: "123 Bonifacio Avenue, Makati City, Metro Manila 1200",
  contactPerson: "Juan P. Santos",
  activeAgents: 12,
};

// Personal Profile (Read-only)
const profileInfo = {
  managerName: "Juan P. Santos",
  role: "Branch Manager",
  branchAssignment: "Manila Central Branch",
  lastLogin: "October 20, 2025 at 8:45 AM",
  lastLoginIP: "192.168.1.105 (Manila, Philippines)",
};

// Mock loan officers data
const loanOfficers = [
  { id: "officer-1", name: "Maria Teresa Cruz", agentId: "LO-001" },
  { id: "officer-2", name: "Roberto Garcia", agentId: "LO-002" },
  { id: "officer-3", name: "Carmen Reyes", agentId: "LO-003" },
  { id: "officer-4", name: "Antonio Mendoza", agentId: "LO-004" },
];

export { branchInfo, profileInfo, loanOfficers };
