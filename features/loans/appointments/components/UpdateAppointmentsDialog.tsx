import { FormFieldWrapper } from "@/components/FormFieldWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { getBranches } from "@/features/branch/api/branch-service";
import type { BranchTableProps } from "@/features/branch/types/branch-types";
import { getStaffs } from "@/features/staff/api/staff-service";
import type { StaffTableProps } from "@/features/staff/types/staff-types";
import { useQuery } from "@tanstack/react-query";
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

type UpdateAppointmentsDialogProps = {
  children: React.ReactNode;
  id: string;
  mode?: "confirm" | "edit";
};

export default function UpdateAppointmentsDialog({
  children,
  id,
  mode,
}: UpdateAppointmentsDialogProps) {
  const { appointmentForm, isLoading, onSubmit, appointmentIsLoading } = useAppointmentsForm(id);
  const { control, handleSubmit, watch, setValue } = appointmentForm;
  const selectedBranchId = watch("branchId");
  const isConfirmMode = mode === "confirm";

  const { data: branchesData } = useQuery<BranchTableProps[]>({
    queryKey: ["branchesToAppointments"],
    queryFn: getBranches,
  });

  const { data: staffsData } = useQuery<StaffTableProps[]>({
    queryKey: ["staffsToAppointments"],
    queryFn: getStaffs,
  });

  const branchOptions =
    branchesData?.map((branch) => ({
      label: branch.name,
      value: String(branch.id),
    })) ?? [];

  const staffOptions =
    staffsData
      ?.filter((staff) => {
        if (!selectedBranchId) {
          return true;
        }
        return (
          staff.branchName ===
          (branchesData?.find((branch) => branch.id === Number(selectedBranchId))?.name ?? "")
        );
      })
      .map((staff) => ({
        label: staff.name,
        value: String(staff.plainId),
      })) ?? [];

  const selectedStaffId = watch("staffId");
  const isSelectedStaffValid = staffOptions.some(
    (staff) => staff.value === String(selectedStaffId)
  );

  const termOptions = [12, 24, 36, 48, 60].map((months) => ({
    value: String(months),
    label: `${months} Months`,
  }));

  return (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer">
        {children}
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] min-w-[900px] overflow-auto bg-white">
        <DialogHeader>
          <DialogTitle>Update Appointment</DialogTitle>
          <DialogDescription>Update an existing appointment in the schedule.</DialogDescription>
        </DialogHeader>
        {appointmentIsLoading ? (
          <div>Loading...</div>
        ) : (
          <Form {...appointmentForm}>
            <form
              onSubmit={handleSubmit((data) =>
                onSubmit({
                  ...data,
                  status: isConfirmMode ? "CONFIRMED" : data.status,
                })
              )}
              action=""
            >
              <div className="space-y-6">
                <div>
                  <div className="text-sm font-semibold text-foreground">Assignment</div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <FormFieldWrapper
                      name="branchId"
                      control={control}
                      label="Branch"
                      required
                      type="select"
                      placeholder="Select branch"
                      options={branchOptions}
                      onChange={(value) => {
                        const branchId = Number(value);
                        setValue("branchId", branchId, { shouldDirty: true, shouldValidate: true });
                        if (Number.isFinite(branchId) && branchId > 0) {
                          setValue("staffId", 0, { shouldDirty: true, shouldValidate: true });
                        }
                      }}
                    />
                    <FormFieldWrapper
                      name="staffId"
                      control={control}
                      label="Branch Staff"
                      required
                      type="select"
                      placeholder="Select staff"
                      options={staffOptions}
                      disabled={!selectedBranchId || Number(selectedBranchId) <= 0}
                    />
                  </div>
                  {!isSelectedStaffValid && Number(selectedStaffId) > 0 ? (
                    <div className="mt-2 text-sm text-destructive">
                      Selected staff does not belong to the selected branch.
                    </div>
                  ) : null}
                </div>

                <div>
                  <div className="text-sm font-semibold text-foreground">Loan Details</div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    {isConfirmMode ? (
                      <Card className="col-span-2 border-amber-200 bg-amber-50">
                        <CardContent className="py-4">
                          <div className="text-sm font-medium text-amber-900">
                            Saving these details will automatically confirm this appointment.
                          </div>
                          <div className="mt-1 text-sm text-amber-800">
                            Status will be set to CONFIRMED.
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <FormFieldWrapper
                        name="status"
                        control={control}
                        label="Status"
                        required
                        type="select"
                        placeholder="Select status"
                        options={AppointmentSelectVersion}
                      />
                    )}
                    <FormFieldWrapper
                      name="productType"
                      control={control}
                      label="Product Type"
                      required
                      type="select"
                      placeholder="Select product type"
                      options={ProductTypeSelectVersion}
                    />
                    <FormFieldWrapper
                      name="maxLoanAmount"
                      control={control}
                      label="Max Loan Amount"
                      required
                      type="input"
                      asNumber
                      placeholder="Enter max loan amount"
                    />
                    <FormFieldWrapper
                      name="monthlyAmortization"
                      control={control}
                      label="Monthly Amortization"
                      required
                      type="input"
                      asNumber
                      placeholder="Enter monthly amortization"
                    />
                    <FormFieldWrapper
                      name="term"
                      control={control}
                      label="Term"
                      required
                      type="select"
                      placeholder="Select term"
                      options={termOptions}
                      onChange={(value, field) => {
                        field.onChange(Number(value));
                      }}
                    />
                    <FormFieldWrapper
                      name="remarks"
                      control={control}
                      label="Remarks"
                      required
                      type="input"
                      placeholder="Enter remarks"
                    />
                  </div>
                </div>

                <div>
                  <div className="text-sm font-semibold text-foreground">Schedule</div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <FormFieldWrapper
                      name="availableStartDate"
                      control={control}
                      label="Available Start Date"
                      required
                      type="date"
                      placeholder="Select available start date"
                    />
                    <FormFieldWrapper
                      name="availableEndDate"
                      control={control}
                      label="Available End Date"
                      required
                      type="date"
                      placeholder="Select available end date"
                    />
                    <FormFieldWrapper
                      name="appointmentDate"
                      control={control}
                      label="Appointment Date"
                      required
                      type="date"
                      placeholder="Select appointment date"
                    />
                    <FormFieldWrapper
                      name="scheduledDateTime"
                      control={control}
                      label="Scheduled Date & Time"
                      required
                      type="date"
                      placeholder="Select scheduled date and time"
                    />
                  </div>
                </div>
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" type="button" disabled={isLoading}>
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={isLoading || !isSelectedStaffValid}>
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
