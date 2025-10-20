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
  LucideIcon,
} from "lucide-react";
import ClientGeneralInformation from "@/features/clients/components/steps/ClientGeneralInformation";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import BreadcrumbPages from "@/components/BreadcrumbPages";
import { cn } from "@/lib/utils";
import { steps } from "@/features/clients/lib/client-registration-form";
import { useEffect } from "react";

export default function RegisterClient() {
  useEffect(() => {
    document.title = "Register Client - Stella | Five Star Finance Inc.";
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

  // Simplified slide animation
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

  // Consolidated button styles
  const buttonStyles = {
    primary:
      "min-w-24 flex items-center gap-2 rounded-md bg-primary text-primary-foreground shadow-sm hover:shadow-md hover:bg-primary/90 transition-all duration-200",
    outline:
      "group flex items-center gap-1 rounded-md border border-border shadow-sm hover:shadow-md hover:bg-accent hover:text-accent-foreground transition-all duration-200",
    disabled: "opacity-50 cursor-not-allowed",
  };

  // Reusable button content component with explicit types
  const ButtonContent = ({
    icon: Icon,
    text,
  }: {
    icon: LucideIcon;
    text: string;
  }) => (
    <div className="flex items-center gap-2">
      <Icon className="size-4" />
      <span className="w-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:w-auto group-hover:opacity-100 group-hover:ml-1">
        {text}
      </span>
    </div>
  );

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
                      buttonStyles.primary,
                      currentStep === 0 && buttonStyles.disabled
                    )}
                  >
                    <ArrowLeft className="size-4" />
                    Previous
                  </Button>
                  <Button
                    type="reset"
                    variant="outline"
                    className={buttonStyles.outline}
                    onClick={clearForm}
                  >
                    <ButtonContent icon={Eraser} text="Clear Data" />
                  </Button>
                </div>
                <div className="flex gap-3">
                  {hasDraft && (
                    <>
                      <Button
                        type="button"
                        onClick={deleteSavedDraft}
                        variant="destructive"
                        className={buttonStyles.outline}
                      >
                        <ButtonContent icon={Trash2} text="Delete Draft" />
                      </Button>
                      <Button
                        type="button"
                        onClick={loadSavedDraft}
                        variant="outline"
                        className={buttonStyles.outline}
                      >
                        <ButtonContent icon={FileUp} text="Load Saved Draft" />
                      </Button>
                    </>
                  )}
                  <Button
                    type="button"
                    onClick={handleSaveDraft}
                    variant="outline"
                    disabled={!formModified}
                    className={cn(
                      buttonStyles.outline,
                      !formModified && buttonStyles.disabled
                    )}
                  >
                    <ButtonContent icon={Save} text="Save Draft" />
                  </Button>
                  {currentStep < steps.length - 1 ? (
                    <Button
                      type="button"
                      onClick={() => nextButton?.props?.onClick?.()}
                      className={buttonStyles.primary}
                    >
                      Next
                      <ArrowRight className="size-4" />
                    </Button>
                  ) : (
                    <Button type="submit" className={buttonStyles.primary}>
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
