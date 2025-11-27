"use client";

import { useEffect } from "react";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import BreadcrumbPages from "@/components/BreadcrumbPages";
import { Form } from "@/components/ui/form";
import { motion, AnimatePresence } from "framer-motion";

import { DraftDialog } from "@/features/clients/components/DraftDialog";
import MainHeader from "@/components/MainHeader";
import StaffGeneralInformation from "@/features/staff/component/forms/StaffGeneralInformation";
import { useStaffRegistrationForm } from "@/features/staff/hooks/use-staff-registration-form";
import { SingleStepFormButtons } from "@/features/staff/component/SingleStepNavigationButtons";

export default function RegisterClient() {
  useEffect(() => {
    document.title = "Register Client | Stella - Five Star Finance Inc.";
  }, []);

  const {
    form,
    formModified,
    hasDraft,
    loadSavedDraft,
    deleteSavedDraft,
    handleSaveDraft,
    clearForm,
    processForm,
    dialogMessage,
    dialogVisible,
    dialogVariant,
    isSubmitting,
  } = useStaffRegistrationForm();

  const slideVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <ContentLayout title="Register Staff">
      <BreadcrumbPages
        links={[
          { href: "/dashboard", label: "Home" },
          { href: "/staff", label: "Staff" },
          { href: "/staff/register", label: "Register Staff" },
        ]}
      />

      <MainHeader
        title="Register Staff"
        description="Easily onboard staff by filling in the fields with their exact information."
      />

      <motion.div
        className="w-full mx-auto mt-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-background rounded-lg shadow-lg border mt-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(processForm)} className="p-6">
              <div className="relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    variants={slideVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    <StaffGeneralInformation form={form} />
                  </motion.div>
                </AnimatePresence>
              </div>

              <SingleStepFormButtons
                isEditMode={false} // if register form
                hasDraft={hasDraft}
                formModified={formModified}
                isSubmitting={isSubmitting}
                onSubmit={form.handleSubmit(processForm)}
                onSaveDraft={handleSaveDraft}
                onLoadDraft={loadSavedDraft}
                onDeleteDraft={deleteSavedDraft}
                onClearForm={clearForm}
              />
            </form>
          </Form>
        </div>

        {/* Dialog for draft actions */}
        <DraftDialog
          message={dialogMessage}
          visible={dialogVisible}
          variant={dialogVariant}
        />
      </motion.div>
    </ContentLayout>
  );
}
