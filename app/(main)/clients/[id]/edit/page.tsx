"use client";

import { useEffect } from "react";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import BreadcrumbPages from "@/components/BreadcrumbPages";
import { StepIndicator } from "@/features/clients/components/StepIndicator";
import { FormNavigationButtons } from "@/features/clients/components/FormNavigationButtons";
import { useClientRegistrationForm } from "@/features/clients/hooks/use-client-registration-form";
import { Form } from "@/components/ui/form";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import ClientGeneralInformation from "@/features/clients/components/steps/ClientGeneralInformation";
import FamilyInformation from "@/features/clients/components/steps/FamilyInformation";
import PensionersInformation from "@/features/clients/components/steps/PensionersInformation";
import AccountsInformation from "@/features/clients/components/steps/AccountsInformation";
import { steps } from "@/features/clients/lib/client-registration-form";
import { DraftDialog } from "@/features/clients/components/DraftDialog";
import { getClientBySerialNumber } from "@/features/clients/api/client-service";
import type { ClientPayload } from "@/features/clients/types/client-types";
import ClientGeneralInformationSkeleton from "@/features/clients/components/ClientGeneralInformationSkeleton";

export default function EditClientPage() {
  useEffect(() => {
    document.title = "Edit Client | Stella - Five Star Finance Inc.";
  }, []);

  const params = useParams();
  const serialNumber = params.id as string;

  const {
    form,
    currentStep,
    prev,
    next,
    formModified,
    hasDraft,
    loadSavedDraft,
    deleteSavedDraft,
    handleSaveDraft,
    updateForm,
    dialogMessage,
    dialogVisible,
    resetForm,
  } = useClientRegistrationForm();

  // Fetch client data
  const { data: clientData, isLoading } = useQuery<ClientPayload>({
    queryKey: ["clientBySerialNumber", serialNumber],
    queryFn: () => getClientBySerialNumber(serialNumber),
  });

  // Reset form when clientData is loaded
  useEffect(() => {
    if (clientData) {
      resetForm(clientData);
    }
  }, [clientData, resetForm]);

  const slideVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  const formSteps = [
    { key: "step-0", component: <ClientGeneralInformation form={form} /> },
    { key: "step-1", component: <FamilyInformation form={form} /> },
    { key: "step-2", component: <PensionersInformation form={form} /> },
    { key: "step-3", component: <AccountsInformation form={form} /> },
  ];

  return (
    <ContentLayout title="Edit Client Information">
      <BreadcrumbPages
        links={[
          { href: "/", label: "Home" },
          { href: "/clients", label: "Clients" },
          { href: `/clients/${serialNumber}`, label: serialNumber },
          {
            href: `/clients/${serialNumber}/edit`,
            label: "Edit Client Information",
          },
        ]}
      />

      <motion.div
        className="w-full mx-auto mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <StepIndicator steps={steps} currentStep={currentStep} />

        <div className="bg-background rounded-lg shadow-lg border mt-10">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((formValues) => {
                if (!clientData) return; // safety check
                updateForm(formValues, clientData);
              })}
              className="p-6"
            >
              <div className="relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {isLoading || !clientData ? (
                    <ClientGeneralInformationSkeleton />
                  ) : (
                    formSteps.map(
                      (step, index) =>
                        index === currentStep && (
                          <motion.div
                            key={step.key}
                            variants={slideVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.3 }}
                          >
                            {step.component}
                          </motion.div>
                        )
                    )
                  )}
                </AnimatePresence>
              </div>

              <FormNavigationButtons
                currentStep={currentStep}
                totalSteps={steps.length}
                formModified={formModified}
                hasDraft={hasDraft}
                isSubmitting={false}
                onPrevious={prev}
                onNext={next}
                onSubmit={form.handleSubmit((formValues) => {
                  if (!clientData) return;
                  updateForm(formValues, clientData);
                })}
                onSaveDraft={handleSaveDraft}
                onLoadDraft={loadSavedDraft}
                onDeleteDraft={deleteSavedDraft}
                onClearForm={() => resetForm(clientData!)}
                isEditMode
              />
            </form>
          </Form>
        </div>

        {/* Dialog for draft actions */}
        <DraftDialog message={dialogMessage} visible={dialogVisible} />
      </motion.div>
    </ContentLayout>
  );
}
