import { Bus } from "lucide-react";

export const Logo = () => {
  return (
    <div className="flex items-center gap-2 select-none">
      <div className="relative">
        <div className="transform scale-x-150">
          <Bus className="w-16 h-8 text-blue-500" strokeWidth={1.2} />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-semibold text-white">Smart RV</span>
        <span className="text-sm text-white/80">Intelligence Drives Freedom</span>
      </div>
    </div>
  );
};