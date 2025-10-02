"use client";

import { useState, useEffect } from "react";
import { SearchInput } from "@/features/audit/components/SearchInput";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { mockStaff } from "@/features/staff/data/mock-data";
import { Staff } from "@/features/staff/types/staff-types";
import { Alert } from "@/components/ui/alert";
import { StaffTable } from "@/features/staff/component/StaffTable";
import { Modal } from "@/components/ui/modal";
import { StaffForm } from "@/features/staff/component/StaffForm";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import BreadcrumbPages from "@/components/BreadcrumbPages";

export default function UsersPage() {
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [filteredStaffs, setFIlteredStaffs] = useState<Staff[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | undefined>();
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Fetch users on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // const data = await userApi.getAll()
      // setStaffs(data)

      // Using mock data for now
      setTimeout(() => {
        setStaffs(mockStaff);
        setFIlteredStaffs(mockStaff);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setAlert({ type: "error", message: "Failed to load users" });
      setIsLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    const filtered = staffs.filter(
      (staff) =>
        staff.firstName.toLowerCase().includes(query.toLowerCase()) ||
        staff.lastName.toLowerCase().includes(query.toLowerCase()) ||
        staff.email.toLowerCase().includes(query.toLowerCase()) ||
        staff.role?.toLowerCase().includes(query.toLowerCase())
    );
    setFIlteredStaffs(filtered);
  };

  const handleUserClick = (staff: Staff) => {
    setSelectedStaff(staff);
    setIsModalOpen(true);
  };

  const handleCreateNew = () => {
    setSelectedStaff(undefined);
    setIsModalOpen(true);
  };

  const handleSubmit = async (data: Partial<Staff>) => {
    try {
      if (selectedStaff) {
        // TODO: Update existing user
        // await userApi.update(selectedUser.id, data)
        console.log("[v0] Updating user:", selectedStaff.id, data);
        setAlert({ type: "success", message: "User updated successfully" });
      } else {
        // TODO: Create new user
        // await userApi.create(data)
        console.log("[v0] Creating new user:", data);
        setAlert({ type: "success", message: "User created successfully" });
      }
      setIsModalOpen(false);
      fetchUsers();
    } catch (error) {
      console.error("Failed to save user:", error);
      setAlert({ type: "error", message: "Failed to save user" });
    }
  };

  const handleDeactivate = async (userId: string) => {
    if (!confirm("Are you sure you want to deactivate this user?")) return;

    try {
      //ongoing
      // TODO: Call deactivate API
      // await userApi.deactivate(userId)
      console.log("[v0] Deactivating user:", userId);
      setAlert({ type: "success", message: "User deactivated successfully" });
      fetchUsers();
    } catch (error) {
      console.error("Failed to deactivate user:", error);
      setAlert({ type: "error", message: "Failed to deactivate user" });
    }
  };

  return (
    <ContentLayout title="Find Client">
      <BreadcrumbPages
        links={[
          { href: "/", label: "Home" },
          { href: "/audit", label: "Audit" },
        ]}
      />
      {/* Header */}
      <div className="flex items-center justify-between mt-6">
        <div>
          <h1 className="h2">Staff Management</h1>
          <p className="text-muted-foreground">
            Manage staff accounts, roles, and permissions
          </p>
        </div>
        <button
          onClick={handleCreateNew}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Add New User
        </button>
      </div>

      {/* Alert */}
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      {/* Search */}
      <div className="max-w-md my-4">
        <SearchInput
          placeholder="Search users by name, email, or role..."
          onSearch={handleSearch}
        />
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <StaffTable staffs={filteredStaffs} onUserClick={handleUserClick} />
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedStaff ? "Edit Staff" : "Create New Staff"}
        size="lg"
      >
        <StaffForm
          staff={selectedStaff}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </ContentLayout>
  );
}
