// components/documents/DocumentCard.tsx
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

interface DocumentCardProps {
  id: string;
  label: string;
  isClicked: boolean;
  onClick: (id: string) => void;
}

export function DocumentCard({ id, label, isClicked, onClick }: DocumentCardProps) {
  return (
    <div className="group relative cursor-pointer select-none" onClick={() => onClick(id)}>
      {/* Card Container */}
      <div
        className={`
          relative w-full h-72 md:h-80 lg:h-64 
          rounded-2xl overflow-hidden border-2 
          transition-all duration-500 ease-out
          ${
            isClicked
              ? "border-emerald-500 shadow-2xl shadow-emerald-500/30 scale-[0.98]"
              : "border-gray-200 dark:border-gray-700 shadow-xl hover:shadow-2xl hover:scale-[1.02]"
          }
        `}
      >
        {/* Thumbnail Image */}
        <div className="relative w-full h-full">
          <Image
            src="/avatar.png"
            alt={label}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-105"
            priority
          />

          {/* Hover Overlay - Blur + Dim */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-500 group-hover:backdrop-blur-[2px]" />

          {/* Center Text on Hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
            <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <p className="text-white text-2xl md:text-3xl font-bold tracking-tight drop-shadow-2xl">
                View
              </p>
              <p className="text-white/90 text-sm md:text-lg font-medium mt-2 max-w-xs line-clamp-2 drop-shadow-lg">
                {label}
              </p>
            </div>
          </div>

          {/* Selected Checkmark */}
          {isClicked && (
            <div className="absolute top-4 right-4 z-10 bg-emerald-500 rounded-full p-3 shadow-2xl animate-pulse">
              <CheckCircle2 className="h-7 w-7 text-white" />
            </div>
          )}

          {/* Optional: Subtle shine effect on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-full transition-transform duration-1000" />
          </div>
        </div>
      </div>

      {/* Label Below */}
      <p className="mt-4 text-center text-base md:text-lg font-semibold text-gray-800 dark:text-gray-200 line-clamp-2 px-2">
        {label}
      </p>
    </div>
  );
}
