import { UserNav } from "@/components/staff-panel/user-nav";
import { SheetMenu } from "@/components/staff-panel/sheet-menu";
import NavBarSearchInput from "@/components/NavBarSearchInput";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserPlus, Calculator } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
        <div className="flex flex-1 items-center justify-end gap-3">
          {/* Cover this button with popover */}
          <div className="mr-8">
            <NavBarSearchInput fullWidth={false} />
          </div>
          <AddClientButton />
          <NewClientComputationButton />
          <UserNav />
        </div>
      </div>
    </header>
  );
}

function AddClientButton() {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Link href="/clients/new">
            <Button
              size="icon"
              icon={UserPlus}
              iconPlacement="left"
              className="rounded-full hover:text-primary border-primary hover:bg-transparent border cursor-pointer"
            />
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add new client</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function NewClientComputationButton() {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Link href="/loans/computations/new-client">
            <Button
              size="icon"
              variant="outline"
              icon={Calculator}
              iconPlacement="left"
              className="rounded-full hover:text-primary hover:border-primary hover:bg-transparent border cursor-pointer"
            />
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>New Client computation</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
