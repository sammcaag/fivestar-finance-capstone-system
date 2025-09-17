import { UserNav } from "@/components/staff-panel/user-nav";
import { SheetMenu } from "@/components/staff-panel/sheet-menu";
import SearchInput from "@/components/SearchInput";

export function Navbar({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow-sm backdrop-blur-sm supports-backdrop-filter:bg-background/60 dark:shadow-secondary">
      <div className="px-4 sm:px-8 flex h-16 items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          {/* Show SheetMenu on medium and smaller screens, hide on large screens */}
          <div className="block lg:hidden">
            <SheetMenu />
          </div>
          <h1 className="font-semibold text-xl tracking-wide">{title}</h1>
        </div>
        <div className="flex flex-1 items-center justify-end gap-4">
          <SearchInput fullWidth={false} />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
