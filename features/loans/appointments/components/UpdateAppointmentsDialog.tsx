import { FormFieldWrapper } from "@/components/FormFieldWrapper";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import React from "react";
import { productTypeArray } from "../../types/loan-form-types";
import { useAppointmentsForm } from "../hooks/use-appointments-form";
import { AppointmentStatusArray } from "../types/appointment-types";

const AppointmentSelectVersion: { value: string; label: string }[] = AppointmentStatusArray.map(
  (status) => ({
    value: status,
    label: status,
  })
);

const ProductTypeSelectVersion: { value: string; label: string }[] = productTypeArray.map(
  (status) => ({
    value: status,
    label: status,
  })
);

export default function UpdateAppointmentsDialog({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  const { appointmentForm, isLoading, onSubmit, appointmentIsLoading } = useAppointmentsForm(id);
  const { control, handleSubmit } = appointmentForm;
  return (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer">
        {children}
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-auto bg-white">
        <DialogHeader>
          <DialogTitle>Update Appointment</DialogTitle>
          <DialogDescription>Update an existing appointment in the schedule.</DialogDescription>
        </DialogHeader>
        {appointmentIsLoading ? (
          <div>Loading...</div>
        ) : (
          <Form {...appointmentForm}>
            <form onSubmit={handleSubmit(onSubmit)} action="">
              {/* Status Selection */}
              <FormFieldWrapper
                name="status"
                control={control}
                label="Status"
                required
                type="select"
                placeholder="Select status"
                options={AppointmentSelectVersion}
              />

              {/* Product Type  */}
              <FormFieldWrapper
                name="productType"
                control={control}
                label="Product Type"
                required
                type="select"
                placeholder="Select product type"
                options={ProductTypeSelectVersion}
              />
              {/* Max Loan Amount */}
              <FormFieldWrapper
                name="maxLoanAmount"
                control={control}
                label="Max Loan Amount"
                required
                type="input"
                asNumber
                placeholder="Enter max loan amount"
              />
              {/* Monthly Amortization */}
              <FormFieldWrapper
                name="monthlyAmortization"
                control={control}
                label="Monthly Amortization"
                required
                type="input"
                asNumber
                placeholder="Enter monthly amortization"
              />
              {/* Available Start Date */}
              <FormFieldWrapper
                name="availableStartDate"
                control={control}
                label="Available Start Date"
                required
                type="date"
                placeholder="Select available start date"
              />
              {/* Available End Date */}
              <FormFieldWrapper
                name="availableEndDate"
                control={control}
                label="Available End Date"
                required
                type="date"
                placeholder="Select available end date"
              />
              {/* Appointment Date */}
              <FormFieldWrapper
                name="appointmentDate"
                control={control}
                label="Appointment Date"
                required
                type="date"
                placeholder="Select appointment date"
              />

              {/* Term */}
              <FormFieldWrapper
                name="term"
                control={control}
                label="Term"
                required
                type="input"
                asNumber
                placeholder="Enter term"
              />
              {/* Remarks */}
              <FormFieldWrapper
                name="remarks"
                control={control}
                label="Remarks"
                required
                type="input"
                placeholder="Enter remarks"
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" type="button" disabled={isLoading}>
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Submitting..." : "Update Appointment"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
