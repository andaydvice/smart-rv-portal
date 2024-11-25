import { Bus } from "lucide-react";

export const Logo = () => {
  return (
    <div className="flex items-center gap-2 select-none">
      <Bus className="w-8 h-8 text-blue-500" strokeWidth={1.2} />
      <span className="text-xl font-semibold text-white">Smart RV</span>
    </div>
  );
};