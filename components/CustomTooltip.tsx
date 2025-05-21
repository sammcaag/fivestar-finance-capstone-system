import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LucideIcon } from "lucide-react";

interface CustomTooltipProps {
  icon: LucideIcon;
  description: string;
  iconClassName?: string;
  descriptionClassName?: string;
}

export function CustomTooltip({
  icon: Icon,
  description,
  iconClassName,
  descriptionClassName,
}: CustomTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Icon className={`w-4 h-4 ${iconClassName} text-[#202B61]`} />
        </TooltipTrigger>
        <TooltipContent>
          <p className={`${descriptionClassName}`}>{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
