import { Navbar } from "@/components/admin-panel/navbar";
import { cn } from "@/lib/utils";

interface ContentLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function ContentLayout({
  title,
  children,
  className,
  ...props
}: ContentLayoutProps) {
  return (
    <div>
      <Navbar title={title} />
      <main
        className={cn("container pt-8 pb-8 px-4 sm:px-8", className)}
        {...props}
      >
        {children}
      </main>
    </div>
  );
}
