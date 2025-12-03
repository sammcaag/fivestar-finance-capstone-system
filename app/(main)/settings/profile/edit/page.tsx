"use client";

import BreadcrumbPages from "@/components/BreadcrumbPages";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import { Form } from "@/components/ui/form";
import { motion } from "framer-motion";
import { useEffect } from "react";

import MainHeader from "@/components/MainHeader";
import NotFoundPage from "@/components/NotFoundPage";
import { useAuth } from "@/features/auth/context/AuthContext";
import ClientGeneralInformationSkeleton from "@/features/clients/components/skeletons/ClientGeneralInformationSkeleton";
import { FormNavigationButtonsSkeleton } from "@/features/clients/components/skeletons/FormNavigationButtonsSkeleton";
import { SimpleFormButtons } from "@/features/settings/components/SimpleFormButton";
import { getStaffByStaffId } from "@/features/staff/api/staff-service";
import StaffGeneralInformation from "@/features/staff/component/forms/StaffGeneralInformation";
import { useStaffRegistrationForm } from "@/features/staff/hooks/use-staff-registration-form";
import { StaffPayload } from "@/features/staff/types/staff-types";
import { useQuery } from "@tanstack/react-query";

export default function EditProfile() {
  useEffect(() => {
    document.title = "Edit User Profile | Stella - Five Star Finance Inc.";
  }, []);

  const { user } = useAuth();

  const staffId = user!.id;

  const { form, resetForm, updateForm } = useStaffRegistrationForm();

  // Fetch client data
  const { data: staffData, isLoading } = useQuery<StaffPayload>({
    queryKey: ["ownProfileInfo", staffId],
    queryFn: () => getStaffByStaffId(staffId),
  });

  // Reset form when clientData is loaded
  useEffect(() => {
    if (staffData) {
      setTimeout(() => resetForm(staffData, false), 0);
    }
  }, [staffData, resetForm]);

  const slideVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <ContentLayout title="Edit Profile Information">
      <BreadcrumbPages
        links={[
          { href: "/", label: "Home" },
          { href: "/settings", label: "Settings" },
          { href: `/settings/profile`, label: "Profile" },
          { href: `/settings/profile/edit`, label: "Edit Profile Information" },
        ]}
      />

      <MainHeader
        title="Edit Profile Information"
        description="Edit and update profile information efficiently, ensuring all records are accurate and up to date."
      />

      {isLoading ? (
        <div className="w-full mx-auto mt-10 space-y-10">
          <ClientGeneralInformationSkeleton />
          <FormNavigationButtonsSkeleton />
        </div>
      ) : staffData ? (
        <motion.div
          className="w-full mx-auto mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-background rounded-lg shadow-lg border mt-10">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((formValues) => {
                  if (!staffData) return; // safety check
                  updateForm(formValues, staffData);
                })}
                className="p-6"
              >
                <div className="relative overflow-hidden">
                  <motion.div
                    variants={slideVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    <StaffGeneralInformation form={form} isOwnProfile />
                  </motion.div>
                </div>

                <SimpleFormButtons
                  isEditMode={true}
                  onSubmit={form.handleSubmit((formValues) => {
                    if (!staffData) return;
                    updateForm(formValues, staffData);
                  })}
                  onClearForm={() => resetForm(staffData)}
                />
              </form>
            </Form>
          </div>
        </motion.div>
      ) : (
        <NotFoundPage title={"Staff data"} />
      )}
    </ContentLayout>
  );
}
