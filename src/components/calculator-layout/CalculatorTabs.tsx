import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Battery, Fuel, Scale, Settings } from "lucide-react";

const CalculatorTabs = ({ activeTab, onTabChange }: { activeTab: string; onTabChange: (value: string) => void }) => {
  return (
    <div className="sticky top-0 z-10 bg-[#091020] py-2 md:py-4 shadow-lg">
      <TabsList className="bg-[#091020] p-1 md:p-2 w-full flex flex-wrap justify-center gap-1 md:gap-2">
        <TabsTrigger 
          value="power" 
          className="data-[state=active]:bg-[#60A5FA] data-[state=active]:text-white text-gray-300 hover:text-white font-semibold text-sm md:text-base px-2 md:px-4 py-1.5 md:py-2 flex-1 min-w-[120px] md:min-w-[140px] max-w-[200px]"
          onClick={() => onTabChange("power")}
        >
          <Battery className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
          Power & Solar
        </TabsTrigger>
        <TabsTrigger 
          value="fuel" 
          className="data-[state=active]:bg-[#60A5FA] data-[state=active]:text-white text-gray-300 hover:text-white font-semibold text-sm md:text-base px-2 md:px-4 py-1.5 md:py-2 flex-1 min-w-[120px] md:min-w-[140px] max-w-[200px]"
          onClick={() => onTabChange("fuel")}
        >
          <Fuel className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
          Fuel Efficiency
        </TabsTrigger>
        <TabsTrigger 
          value="towing" 
          className="relative data-[state=active]:bg-[#60A5FA] data-[state=active]:text-white text-gray-300 hover:text-white font-semibold text-sm md:text-base px-2 md:px-4 py-1.5 md:py-2 flex-1 min-w-[120px] md:min-w-[140px] max-w-[200px]"
          onClick={() => onTabChange("towing")}
        >
          <Scale className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
          Towing Safety
        </TabsTrigger>
        <TabsTrigger 
          value="smart-systems" 
          className="relative data-[state=active]:bg-[#60A5FA] data-[state=active]:text-white text-gray-300 hover:text-white font-semibold text-sm md:text-base px-2 md:px-4 py-1.5 md:py-2 flex-1 min-w-[120px] md:min-w-[140px] max-w-[200px]"
          onClick={() => onTabChange("smart-systems")}
        >
          <Settings className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
          Smart Systems
        </TabsTrigger>
      </TabsList>
    </div>
  );
};

export default CalculatorTabs;