import React from "react";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import BreadcrumbPages from "@/components/BreadcrumbPages";
import MainHeader from "@/components/MainHeader";
import TabListCustomComp from "@/components/TabListCustomComp";
import { Tabs, TabsContent } from "@radix-ui/react-tabs";
import { MainAppointmentsTable } from "@/features/loans/appointments/components/MainAppointmentsTable";

const appointmentTabs = [
  { value: "upcoming", label: "Upcoming" },
  { value: "today", label: "Today's Appointments" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
  { value: "missed", label: "No Show" },
];

export default function LoanAppointments() {
  return (
    <ContentLayout title="Loan Appointments">
      <BreadcrumbPages
        links={[
          { href: "/", label: "Home" },
          { href: "/appointments", label: "Loan Appointments" },
        ]}
      />

      <MainHeader
        title="Loan Appointments"
        description="Coordinate and review upcoming loan appointments to help your branch prepare client documents in advance."
      />
      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabListCustomComp tabs={appointmentTabs} />
        <TabsContent value="upcoming" className="space-y-4">
          <MainAppointmentsTable
            title="Upcoming Appointments"
            description="View all scheduled loan appointments that are set for future dates. Ensure all required client documents are prepared ahead of time."
          />
        </TabsContent>

        <TabsContent value="today" className="space-y-4">
          <MainAppointmentsTable
            title="Today's Appointments"
            description="Track all loan appointments scheduled for today and assist clients during their visit."
          />
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <MainAppointmentsTable
            title="Completed Appointments"
            description="Review loan appointments that have been successfully completed and verified by branch staff."
          />
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-4">
          <MainAppointmentsTable
            title="Cancelled Appointments"
            description="View appointments that were cancelled by clients or branch agents for follow-up or rescheduling."
          />
        </TabsContent>

        <TabsContent value="missed" className="space-y-4">
          <MainAppointmentsTable
            title="Missed Appointments"
            description="Identify clients who did not attend their scheduled appointments and coordinate for rebooking or follow-up."
          />
        </TabsContent>
      </Tabs>
    </ContentLayout>
  );
}
