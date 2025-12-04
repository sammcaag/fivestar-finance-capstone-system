// components/documents/DocumentSections.tsx
import { CategorySection } from "./CategorySection";
import { DocumentSection } from "./document-config";

interface DocumentSectionsProps {
  sections: readonly DocumentSection[];
  clickedButtons: Record<string, boolean>;
  onButtonClick: (id: string) => void;
}

export function DocumentSections({
  sections,
  clickedButtons,
  onButtonClick,
}: DocumentSectionsProps) {
  if (sections.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500 dark:text-slate-400">
        <p className="text-lg">Unknown product type</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {sections.map((section, index) => (
        <CategorySection
          key={index}
          title={section.title}
          buttons={section.buttons}
          clickedButtons={clickedButtons}
          onButtonClick={onButtonClick}
        />
      ))}
    </div>
  );
}
