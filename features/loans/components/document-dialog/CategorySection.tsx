// components/documents/CategorySection.tsx (updated for readonly)
import { CheckCircle2, FileText } from "lucide-react";
import { DocumentCard } from "./DocumentCard";
import { DocumentButton } from "./document-config";

interface CategorySectionProps {
  title: string;
  buttons: readonly DocumentButton[];
  clickedButtons: Record<string, boolean>;
  onButtonClick: (id: string) => void;
}

export function CategorySection({
  title,
  buttons,
  clickedButtons,
  onButtonClick,
}: CategorySectionProps) {
  const selectedCount = buttons.filter((b) => clickedButtons[b.id]).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-slate-600 dark:text-slate-300" />
          <h3 className="text-lg md:text-2xl font-semibold text-slate-900 dark:text-slate-100">
            {title}
          </h3>
        </div>
        {selectedCount > 0 && (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 px-4 py-2 text-sm font-medium text-emerald-700 dark:text-emerald-300">
            <CheckCircle2 className="h-4 w-4" />
            {selectedCount}/{buttons.length}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {buttons.map((button) => (
          <DocumentCard
            key={button.id}
            id={button.id}
            label={button.label}
            isClicked={!!clickedButtons[button.id]}
            onClick={onButtonClick}
          />
        ))}
      </div>
    </div>
  );
}
