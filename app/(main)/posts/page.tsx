import PlaceholderContent from "@/components/placeholder-content";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import BreadcrumbPages from "@/components/BreadcrumbPages";

export default function PostsPage() {

  const links = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/posts", label: "Posts" },
  ];

  return (
    <ContentLayout title="All Posts">
      <BreadcrumbPages links={links} />
      <PlaceholderContent />
    </ContentLayout>
  );
}
