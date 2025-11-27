import BreadcrumbPages from "@/components/BreadcrumbPages";
import MainHeader from "@/components/MainHeader";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import { BranchCard } from "@/features/branch/components/BranchCard";
import branches from "@/features/branch/data/branch-mock-data";

export default function BranchOverview() {
  return (
    <ContentLayout title="Branch Overview">
      <BreadcrumbPages
        links={[
          { href: "/", label: "Home" },
          { href: "/branch", label: "Branch" },
        ]}
      />
      <MainHeader
        title="Branch Overview"
        description="Easily manage branch information, see which staff are assigned where, and keep your branch data up to date in one place."
      />

      <div className="w-full space-y-6">
        {branches.map((branch) => (
          <BranchCard key={branch.id} branch={branch} />
        ))}
      </div>
    </ContentLayout>
  );
}
