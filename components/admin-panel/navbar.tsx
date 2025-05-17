import { UserNav } from "@/components/admin-panel/user-nav";
import { SheetMenu } from "@/components/admin-panel/sheet-menu";
import SearchInput from "@/components/SearchInput";

interface NavbarProps {
  title: string;
}

export function Navbar({ title }: NavbarProps) {
  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow-sm backdrop-blur-sm supports-backdrop-filter:bg-background/60 dark:shadow-secondary">
      <div className="px-4 sm:px-8 flex h-16 items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <h1 className="font-semibold text-xl tracking-wide">{title}</h1>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <SearchInput />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
