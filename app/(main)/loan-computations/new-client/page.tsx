import RegularLoanCalculator from "@/features/loan-calculators/components/regular/RegularLoanCalculator";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import BreadcrumbPages from "@/components/BreadcrumbPages";

export default function NewClient() {
  return (
    <ContentLayout title="New Client Computation">
      <BreadcrumbPages
        links={[
          { href: "/", label: "Home" },
          { href: "/loan-computations/new-client", label: "Loan Computations" },
          { href: "/loan-computations", label: "New Client" },
        ]}
      />
      <RegularLoanCalculator clientType="New Client" />
    </ContentLayout>
  );
}
