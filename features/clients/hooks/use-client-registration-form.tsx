"use client";

import { type JSX, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { FileCheck, ArrowRight } from "lucide-react";

import { clientFormSchema } from "../schema/client-zod-schema";
import type { ClientFormValues } from "../types/client-types";
import { loadDraft, saveDraft } from "../utils/draft-computation-storage";
import {
  defaultValues,
  formDates,
  optionalFormDates,
  steps,
} from "../lib/client-registration-form";
import { Button } from "@/components/ui/button";

export function useClientRegistrationForm() {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;
  const [formModified, setFormModified] = useState(false);
  const [submitButton, setSubmitButton] = useState<JSX.Element | null>(null);
  const [nextButton, setNextButton] = useState<JSX.Element | null>(null);
  const [isClear, setIsClear] = useState<boolean>(false);
  const [hasDraft, setHasDraft] = useState(false);

  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientFormSchema),
    mode: "onBlur",
    reValidateMode: "onSubmit",
    defaultValues,
  });

  // Check for saved draft on component mount
  useEffect(() => {
    const draft = loadDraft();
    if (draft) {
      setHasDraft(true);
      setIsClear(false);
    }
  }, [isClear]);

  // Load saved draft function
  const loadSavedDraft = () => {
    const draft = loadDraft();
    if (draft) {
      // Create a new object to hold the converted dates
      const dateConversions: Partial<ClientFormValues> = {};

      // Convert date strings back to Date objects
      formDates.forEach((dateField) => {
        const fieldValue = draft.data[dateField as keyof typeof draft.data];

        if (fieldValue) {
          if (typeof fieldValue === "string") {
            // Only convert string dates that can be parsed
            const date = new Date(fieldValue);
            if (!isNaN(date.getTime())) {
              dateConversions[dateField as keyof ClientFormValues] =
                date as any;
            }
          } else if (fieldValue instanceof Date) {
            dateConversions[dateField as keyof ClientFormValues] =
              fieldValue as any;
          }
        }
      });

      // Merge the original data with the converted dates
      const formattedData = {
        ...draft.data,
        ...dateConversions,
      };

      form.reset(formattedData as ClientFormValues);
      setHasDraft(false);
      toast.success("Your saved information has been loaded.");
    }
  };

  // Delete saved draft function
  const deleteSavedDraft = () => {
    localStorage.removeItem("form-draft");
    setHasDraft(false);
    toast.success("Your saved draft has been deleted.");
  };

  // Watch for form changes
  useEffect(() => {
    const subscription = form.watch(() => {
      setFormModified(Object.keys(form.formState.dirtyFields).length > 0);
    });

    return () => subscription.unsubscribe();
  }, [form]);

  // Create step schemas
  const createStepSchemas = (clientFormSchema: z.ZodObject<any>) => {
    const schemas: z.ZodObject<any>[] = [];

    steps.forEach((step) => {
      if (step.fields && step.fields.length > 0) {
        const stepShape = Object.entries(clientFormSchema.shape)
          .filter(([key]) =>
            step.fields?.includes(key as keyof ClientFormValues)
          )
          .reduce((acc, [key, value]) => {
            acc[key] = value as z.ZodTypeAny;
            return acc;
          }, {} as Record<string, z.ZodTypeAny>);

        schemas.push(z.object(stepShape));
      } else {
        schemas.push(z.object({}));
      }
    });

    return schemas;
  };

  const stepSchemas = createStepSchemas(clientFormSchema);

  // Validate current step
  const validateCurrentStep = async () => {
    const currentSchema = stepSchemas[currentStep];

    if (!currentSchema) return true;

    const currentStepFields = steps[currentStep].fields || [];
    const values = form.getValues();
    const currentStepValues = Object.fromEntries(
      currentStepFields.map((field) => [
        field,
        values[field as keyof ClientFormValues],
      ])
    );

    const result = await currentSchema.safeParseAsync(currentStepValues);

    if (!result.success) {
      currentStepFields.forEach((field) => {
        form.clearErrors(field as keyof ClientFormValues);
      });

      result.error.errors.forEach((error) => {
        form.setError(error.path[0] as keyof ClientFormValues, {
          type: "manual",
          message: error.message,
        });
      });
      return false;
    }

    return true;
  };

  // Save draft function
  const handleSaveDraft = () => {
    const currentValues = form.getValues();
    saveDraft(currentValues);
    toast("Your information has been saved as a draft.");
  };

  // Process form data
  const processForm = (data: ClientFormValues) => {
    const cleanedData = { ...data };

    optionalFormDates.forEach((dateField) => {
      const dateValue = cleanedData[dateField as keyof ClientFormValues];

      if (dateValue instanceof Date) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const dateToCompare = new Date(dateValue);
        dateToCompare.setHours(0, 0, 0, 0);

        if (dateToCompare.getTime() === today.getTime()) {
          (cleanedData as any)[dateField] = null;
        }
      }
    });

    console.log(JSON.stringify(cleanedData, null, 2));
    toast.success(<pre>{JSON.stringify(cleanedData, null, 2)}</pre>);
  };

  // Navigation functions
  const next = async () => {
    const isValid = await validateCurrentStep();
    if (!isValid) return;

    if (currentStep < steps.length - 1) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    } else {
      await form.handleSubmit(processForm)();
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  // Handle button rendering
  useEffect(() => {
    if (currentStep === steps.length - 1) {
      const timeout = setTimeout(() => {
        setSubmitButton(
          <Button
            type="submit"
            effect="ringHover"
            className="min-w-24 flex justify-around"
          >
            <p>Submit</p>
            <FileCheck className="size-5 text-green-500" />
          </Button>
        );
        setNextButton(null);
      }, 0);

      return () => clearTimeout(timeout);
    } else {
      setSubmitButton(null);
      setNextButton(
        <Button
          type="button"
          onClick={next}
          effect="ringHover"
          className="min-w-24 flex justify-around"
        >
          <p>Next</p>
          <ArrowRight className="size-5" />
        </Button>
      );
    }
  }, [currentStep]);

  // Clear form function
  const clearForm = () => {
    form.reset(defaultValues);
    setFormModified(false);
    setIsClear(true);
    toast.success("Form has been cleared");
  };

  return {
    form,
    currentStep,
    delta,
    prev,
    next,
    submitButton,
    nextButton,
    formModified,
    hasDraft,
    loadSavedDraft,
    deleteSavedDraft,
    handleSaveDraft,
    clearForm,
    processForm,
  };
}
