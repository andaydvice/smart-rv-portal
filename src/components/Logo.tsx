
import React from "react";
import { Bus } from "lucide-react";

export const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex-shrink-0">
        <div className="transform scale-x-150">
          <Bus className="w-16 h-8 text-blue-500" strokeWidth={1.2} />
        </div>
      </div>
      <div className="flex flex-col justify-center items-start">
        <span className="text-xl font-semibold text-white">Smart RV</span>
        <div className="text-sm text-white/80 leading-none whitespace-nowrap">
          RV Intelligence Drives Freedom
        </div>
      </div>
    </div>
  );
};
