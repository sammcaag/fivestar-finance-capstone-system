"use client";

import { useEffect } from "react";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import BreadcrumbPages from "@/components/BreadcrumbPages";
import { StepIndicator } from "@/features/clients/components/StepIndicator";
import { FormNavigationButtons } from "@/features/clients/components/FormNavigationButtons";
import { useClientRegistrationForm } from "@/features/clients/hooks/use-client-registration-form";
import { Form } from "@/components/ui/form";
import { motion, AnimatePresence } from "framer-motion";

import ClientGeneralInformation from "@/features/clients/components/steps/ClientGeneralInformation";
import FamilyInformation from "@/features/clients/components/steps/FamilyInformation";
import PensionersInformation from "@/features/clients/components/steps/PensionersInformation";
import AccountsInformation from "@/features/clients/components/steps/AccountsInformation";
import { steps } from "@/features/clients/lib/client-registration-form";

export default function RegisterClient() {
  useEffect(() => {
    document.title = "Register Client | Stella - Five Star Finance Inc.";
  }, []);

  const {
    form,
    currentStep,
    prev,
    nextButton,
    formModified,
    hasDraft,
    loadSavedDraft,
    deleteSavedDraft,
    handleSaveDraft,
    clearForm,
    processForm: formProcessor,
  } = useClientRegistrationForm();

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
    <ContentLayout title="Register Client">
      <BreadcrumbPages
        links={[
          { href: "/dashboard", label: "Home" },
          { href: "/dashboard", label: "Dashboard" },
          { href: "/clients", label: "Clients" },
          { href: "/clients/register", label: "Register Client" },
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
            <form onSubmit={form.handleSubmit(formProcessor)} className="p-6">
              <div className="relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={formSteps[currentStep].key}
                    variants={slideVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    {formSteps[currentStep].component}
                  </motion.div>
                </AnimatePresence>
              </div>

              <FormNavigationButtons
                currentStep={currentStep}
                totalSteps={steps.length}
                formModified={formModified}
                hasDraft={hasDraft}
                isSubmitting={false} // or pass from hook if you track it
                onPrevious={prev}
                onNext={() => nextButton?.props?.onClick?.()}
                onSubmit={() => void form.handleSubmit(formProcessor)()}
                onSaveDraft={handleSaveDraft}
                onLoadDraft={loadSavedDraft}
                onDeleteDraft={deleteSavedDraft}
                onClearForm={clearForm}
              />
            </form>
          </Form>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
