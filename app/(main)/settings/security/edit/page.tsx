"use client";

import { useEffect } from "react";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import BreadcrumbPages from "@/components/BreadcrumbPages";
import { Form } from "@/components/ui/form";
import { motion } from "framer-motion";

import MainHeader from "@/components/MainHeader";
import ClientGeneralInformationSkeleton from "@/features/clients/components/skeletons/ClientGeneralInformationSkeleton";
import { FormNavigationButtonsSkeleton } from "@/features/clients/components/skeletons/FormNavigationButtonsSkeleton";
import NotFoundPage from "@/components/NotFoundPage";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useSecurityUpdateForm } from "@/features/settings/hooks/use-security-update-form";
import { SimpleFormButtons } from "@/features/settings/components/SimpleFormButton";
import SecurityInformationForm from "@/features/auth/components/forms/SecurityInformationForm";

export default function EditSecurity() {
  useEffect(() => {
    document.title =
      "Edit Security Information | Stella - Five Star Finance Inc.";
  }, []);

  const { form, isSubmitting, resetForm, updateForm } = useSecurityUpdateForm();

  const { user, isLoading } = useAuth();
  const userId = user!.id;
  const email = user!.email;

  // Reset form when clientData is loaded
  useEffect(() => {
    if (email) {
      setTimeout(() => resetForm(email, false), 0);
    }
  }, [email, resetForm]);

  const slideVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <ContentLayout title="Edit Staff Information">
      <BreadcrumbPages
        links={[
          { href: "/", label: "Home" },
          { href: "/settings", label: "Settings" },
          { href: `/settings/security`, label: "Security" },
          { href: `/settings/security/${userId}`, label: userId },
        ]}
      />

      <MainHeader
        title="Edit Staff Information"
        description="Edit and update staff information efficiently, ensuring all records are accurate and up to date."
      />

      {isLoading ? (
        <div className="w-full mx-auto mt-10 space-y-10">
          <ClientGeneralInformationSkeleton />
          <FormNavigationButtonsSkeleton />
        </div>
      ) : user ? (
        <motion.div
          className="w-full mx-auto mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-background rounded-lg shadow-lg border mt-10">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(updateForm)} className="p-6">
                <div className="relative overflow-hidden">
                  <motion.div
                    variants={slideVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    <SecurityInformationForm form={form} />
                  </motion.div>
                </div>

                <SimpleFormButtons
                  isEditMode={true}
                  isSubmitting={isSubmitting}
                  onSubmit={form.handleSubmit(updateForm)}
                  onClearForm={() => resetForm(user!.email)}
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
