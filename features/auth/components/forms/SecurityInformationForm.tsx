"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";
import { FormFieldWrapper } from "../../../../components/FormFieldWrapper";
import useClientAnimation from "@/features/clients/hooks/use-client-animation";
import { SecurityInformationFormProps } from "@/features/settings/types/security-types";
import { StepTitleCard } from "@/features/clients/components/StepTitleCard";
import { SectionCard } from "@/features/clients/components/SectionCard";
import { PasswordFieldWrapper } from "@/components/PasswordFieldWrapper";

const SecurityInformationForm = ({ form }: SecurityInformationFormProps) => {
  const { containerVariants, itemVariants } = useClientAnimation();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <StepTitleCard
        variants={itemVariants}
        title="Security Information"
        description="Please fill out all the required information below to begin the security update process."
      />

      {/* Security Information */}
      <SectionCard variants={itemVariants} icon={User} title="Authentication Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <FormFieldWrapper
            name="email"
            control={form.control}
            label="Email Address"
            required
            type="input"
            placeholder="daug.rey@fsfi.com.ph"
          />
          <PasswordFieldWrapper
            name="oldPassword"
            control={form.control}
            label="Old Password"
            required
            placeholder="Input your old password here"
          />
          <PasswordFieldWrapper
            name="newPassword"
            control={form.control}
            label="New Password"
            required
            placeholder="Input your new password here"
          />
          <PasswordFieldWrapper
            name="confirmNewPassword"
            control={form.control}
            label="Confirm New Password"
            required
            placeholder="Confirm your new password"
          />
        </div>
      </SectionCard>
    </motion.div>
  );
};

export default SecurityInformationForm;
