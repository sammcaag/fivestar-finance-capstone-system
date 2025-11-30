"use client";

import { useEffect } from "react";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import BreadcrumbPages from "@/components/BreadcrumbPages";
import { Form } from "@/components/ui/form";
import { motion } from "framer-motion";

import MainHeader from "@/components/MainHeader";
import { SingleStepFormButtons } from "@/features/staff/component/SingleStepNavigationButtons";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import ClientGeneralInformationSkeleton from "@/features/clients/components/skeletons/ClientGeneralInformationSkeleton";
import { FormNavigationButtonsSkeleton } from "@/features/clients/components/skeletons/FormNavigationButtonsSkeleton";
import NotFoundPage from "@/components/NotFoundPage";
import { useBranchRegistrationForm } from "@/features/branch/hooks/use-branch-registration-form";
import { getBranchById } from "@/features/branch/api/branch-service";
import { BranchPayload } from "@/features/branch/types/branch-types";
import BranchInformation from "@/features/branch/components/forms/BranchInformation";

export default function EditBranch() {
  useEffect(() => {
    document.title = "Register Client | Stella - Five Star Finance Inc.";
  }, []);

  const params = useParams();
  const id = Number(params.id);

  const {
    form,
    formModified,
    hasDraft,
    loadSavedDraft,
    deleteSavedDraft,
    handleSaveDraft,
    isSubmitting,
    resetForm,
    updateForm,
  } = useBranchRegistrationForm();

  // Fetch client data
  const { data: branchData, isLoading } = useQuery<BranchPayload>({
    queryKey: ["branchById", id],
    queryFn: () => getBranchById(id),
  });

  // Reset form when clientData is loaded
  useEffect(() => {
    if (branchData) {
      setTimeout(() => resetForm(branchData, false), 0);
    }
  }, [branchData, resetForm]);

  const slideVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <ContentLayout title="Edit Branch Information">
      <BreadcrumbPages
        links={[
          { href: "/dashboard", label: "Home" },
          { href: "/branch", label: "Branch" },
          { href: `/branch/${id}`, label: String(id) },
          { href: `/branch/${id}/edit`, label: "Edit Branch Information" },
        ]}
      />

      <MainHeader
        title="Edit Branch Information"
        description="Edit and update branch information efficiently, ensuring all records are accurate and up to date."
      />

      {isLoading ? (
        <div className="w-full mx-auto mt-10 space-y-10">
          <ClientGeneralInformationSkeleton />
          <FormNavigationButtonsSkeleton />
        </div>
      ) : branchData ? (
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
                  if (!branchData) return; // safety check
                  updateForm(formValues, branchData);
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
                    <BranchInformation form={form} />
                  </motion.div>
                </div>

                <SingleStepFormButtons
                  isEditMode={true} // if register form
                  hasDraft={hasDraft}
                  formModified={formModified}
                  isSubmitting={isSubmitting}
                  onSubmit={form.handleSubmit((formValues) => {
                    if (!branchData) return;
                    updateForm(formValues, branchData);
                  })}
                  onSaveDraft={handleSaveDraft}
                  onLoadDraft={loadSavedDraft}
                  onDeleteDraft={deleteSavedDraft}
                  onClearForm={() => resetForm(branchData)}
                />
              </form>
            </Form>
          </div>
        </motion.div>
      ) : (
        <NotFoundPage title={"Branch data"} />
      )}
    </ContentLayout>
  );
}
