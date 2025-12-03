// components/documents/DocumentCard.tsx
import { CheckCircle2 } from "lucide-react";

interface DocumentCardProps {
  id: string;
  label: string;
  isClicked: boolean;
  onClick: (id: string) => void;
}

export function DocumentCard({ id, label, isClicked, onClick }: DocumentCardProps) {
  return (
    <div className="group relative cursor-pointer" onClick={() => onClick(id)}>
      <div
        className={`relative w-full h-72 md:h-[300px] lg:h-[200px] rounded-xl overflow-hidden border-2 transition-all duration-300 ${
          isClicked
            ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 shadow-md shadow-emerald-500/20"
            : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg hover:shadow-2xl hover:border-slate-300 dark:hover:border-slate-600"
        }`}
      >
        <div className="w-full h-full relative bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
          <img
            src={`/pdf-document.png?key=7fqtq&height=600&width=480&query=PDF document ${label}`}
            alt={label}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center backdrop-blur-md">
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100">
              <div className="text-center">
                <p className="text-white font-semibold text-base md:text-2xl">View</p>
                <p className="text-white/90 text-sm md:text-base mt-2 px-4 line-clamp-2">{label}</p>
              </div>
            </div>
          </div>

          {isClicked && (
            <div className="absolute top-4 right-4 bg-emerald-500 rounded-full p-2 shadow-lg">
              <CheckCircle2 className="h-6 w-6 text-white" />
            </div>
          )}
        </div>
      </div>

      <p className="mt-3 text-sm md:text-base font-medium text-slate-700 dark:text-slate-300 truncate">
        {label}
      </p>
    </div>
  );
}
