import { Caravan } from "lucide-react";

export const Logo = () => {
  return (
    <div className="flex items-center gap-2 select-none">
      <div className="relative">
        <Caravan className="w-8 h-8 text-blue-500" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
      </div>
      <div className="font-bold text-2xl bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
        SmartRV
      </div>
    </div>
  );
};