import ProtectedRoute from "@/features/auth/components/ProtectedRoute";

export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute allowedRoles={["FINANCE"]}>{children}</ProtectedRoute>;
}
