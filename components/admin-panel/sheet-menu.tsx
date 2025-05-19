import { MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Menu } from "@/components/admin-panel/menu";
import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import Logo from "../Logo";

export function SheetMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="h-8" variant="outline" size="icon">
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:w-72 px-0 h-full flex flex-col" side="left">
        <SheetHeader>
          <SheetTitle className="sr-only">Five Star Finance Inc.</SheetTitle>
          <Button
            className="flex justify-center items-center mb-6 pt-1"
            variant="link"
            asChild
          >
            <Logo withLabel={true} />
          </Button>
        </SheetHeader>
        <Menu isOpen={true} />
      </SheetContent>
    </Sheet>
  );
}
