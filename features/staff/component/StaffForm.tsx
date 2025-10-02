"use client";

import type React from "react";

import { useState } from "react";
import type {
  Staff,
  StaffRole,
  StaffStatus,
  FormErrors,
} from "../types/staff-types";
import { FormField } from "@/components/ui/form-field";
import { validateEmail } from "@/lib/utils";

interface StaffFormProps {
  staff?: Staff;
  onSubmit: (data: Partial<Staff>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function StaffForm({
  staff,
  onSubmit,
  onCancel,
  isLoading,
}: StaffFormProps) {
  const [formData, setFormData] = useState({
    firstName: staff?.firstName || "",
    lastName: staff?.lastName || "",
    email: staff?.email || "",
    role: staff?.role || ("" as StaffRole),
    status: staff?.status || ("active" as StaffStatus),
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when staff starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.role) {
      newErrors.role = "Role is required";
    }
    if (!formData.role?.trim()) {
      newErrors.role = "Role is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          error={errors.firstName}
          required
          placeholder="Juan"
        />
        <FormField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          error={errors.lastName}
          required
          placeholder="Dela Cruz"
        />
      </div>

      <FormField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        required
        placeholder="juan.delacruz@fivestar.com"
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          label="Role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          error={errors.role}
          required
          options={[
            { value: "staff", label: "Staff" },
            { value: "manager", label: "Manager" },
            { value: "admin", label: "Admin" },
          ]}
        />
        <FormField
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          options={[
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
          ]}
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? "Saving..." : staff ? "Update Staff" : "Create Staff"}
        </button>
      </div>
    </form>
  );
}
