"use client";
import { Form } from "@/components/ui/form";
import { StepIndicator } from "@/features/clients/components/StepIndicator";
import { useClientRegistrationForm } from "@/features/clients/hooks/use-client-registration-form";
import { motion, AnimatePresence } from "framer-motion";
import FamilyInformation from "@/features/clients/components/steps/FamilyInformation";
import PensionersInformation from "@/features/clients/components/steps/PensionersInformation";
import AccountsInformation from "@/features/clients/components/steps/AccountsInformation";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Eraser,
  FileUp,
  Save,
  Trash2,
  ArrowRight,
} from "lucide-react";
import { steps } from "@/features/clients/components/lib/client-registration-form";
import ClientGeneralInformation from "@/features/clients/components/steps/ClientGeneralInformation";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import BreadcrumbPages from "@/components/BreadcrumbPages";
import { cn } from "@/lib/utils";

export default function RegisterClient() {
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

  // Simple slide animation without alternating behavior
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
          {
            href: "/dashboard",
            label: "Home",
          },
          {
            href: "/dashboard",
            label: "Dashboard",
          },
          {
            href: "/clients",
            label: "Clients",
          },
          {
            href: "/clients/register",
            label: "Register Client",
          },
        ]}
      />
      <motion.div
        className="w-full mx-auto mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <StepIndicator steps={steps} currentStep={currentStep} />

        <div className="bg-card rounded-lg shadow-lg border mt-10">
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
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {formSteps[currentStep].component}
                  </motion.div>
                </AnimatePresence>
              </div>

              <motion.div
                className="flex justify-between mt-8 pt-6 border-t border-border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <div className="flex gap-3">
                  <Button
                    type="button"
                    onClick={prev}
                    disabled={currentStep === 0}
                    className={cn(
                      "min-w-24 flex items-center gap-2 rounded-md bg-primary text-primary-foreground shadow-sm hover:shadow-md hover:bg-primary/90 transition-all duration-200",
                      currentStep === 0 && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <ArrowLeft className="size-4" />
                    Previous
                  </Button>
                  <Button
                    type="reset"
                    variant="outline"
                    className="group rounded-md bg-background text-foreground border border-border hover:bg-accent hover:text-accent-foreground transition-all duration-200"
                    onClick={clearForm}
                  >
                    <div className="flex items-center gap-2">
                      <Eraser className="size-4" />
                      <span className="w-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:w-auto group-hover:opacity-100 group-hover:ml-1">
                        Clear Data
                      </span>
                    </div>
                  </Button>
                </div>
                <div className="flex gap-3">
                  {hasDraft && (
                    <div className="flex gap-3">
                      <Button
                        type="button"
                        onClick={deleteSavedDraft}
                        variant="destructive"
                        className="group flex items-center gap-1 rounded-md shadow-sm hover:shadow-md transition-all duration-200"
                      >
                        <div className="flex items-center gap-2">
                          <Trash2 className="size-4" />
                          <span className="w-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:w-auto group-hover:opacity-100 group-hover:ml-1">
                            Delete Draft
                          </span>
                        </div>
                      </Button>
                      <Button
                        type="button"
                        onClick={loadSavedDraft}
                        variant="outline"
                        className="group flex items-center gap-1 rounded-md bg-background text-foreground border border-border shadow-sm hover:shadow-md hover:bg-accent hover:text-accent-foreground transition-all duration-200"
                      >
                        <div className="flex items-center gap-2">
                          <FileUp className="size-4" />
                          <span className="w-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:w-auto group-hover:opacity-100 group-hover:ml-1">
                            Load Saved Draft
                          </span>
                        </div>
                      </Button>
                    </div>
                  )}
                  <Button
                    type="button"
                    onClick={handleSaveDraft}
                    variant="outline"
                    disabled={!formModified}
                    className={cn(
                      "group rounded-md bg-background text-foreground border border-border shadow-sm hover:shadow-md hover:bg-accent hover:text-accent-foreground transition-all duration-200",
                      !formModified && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <Save className="size-4" />
                      <span className="w-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:w-auto group-hover:opacity-100 group-hover:ml-1">
                        Save Draft
                      </span>
                    </div>
                  </Button>
                  {/*  Next/Submit Button */}
                  {currentStep < steps.length - 1 ? (
                    <Button
                      type="button"
                      onClick={() => nextButton?.props?.onClick?.()}
                      className="min-w-24 flex items-center gap-2 rounded-md bg-primary text-primary-foreground shadow-sm hover:shadow-md hover:bg-primary/90 transition-all duration-200"
                    >
                      Next
                      <ArrowRight className="size-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="min-w-24 flex items-center gap-2 rounded-md bg-primary text-primary-foreground shadow-sm hover:shadow-md hover:bg-primary/90 transition-all duration-200"
                    >
                      Submit
                      <ArrowRight className="size-4" />
                    </Button>
                  )}
                </div>
              </motion.div>
            </form>
          </Form>
        </div>
      </motion.div>
    </ContentLayout>
  );
}
