import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Battery, Fuel, Scale, Settings } from "lucide-react";

const CalculatorTabs = ({ activeTab, onTabChange }: { activeTab: string; onTabChange: (value: string) => void }) => {
  return (
    <div className="sticky top-0 z-50 bg-[#091020] py-4 shadow-lg">
      <TabsList className="bg-[#091020] p-2 w-full flex justify-center">
        <TabsTrigger 
          value="power" 
          className="data-[state=active]:bg-[#60A5FA] data-[state=active]:text-white text-gray-300 hover:text-white font-semibold text-base px-6 py-3 flex-1 max-w-[200px]"
          onClick={() => onTabChange("power")}
        >
          <Battery className="mr-2 h-4 w-4" />
          Power & Solar
        </TabsTrigger>
        <TabsTrigger 
          value="fuel" 
          className="data-[state=active]:bg-[#60A5FA] data-[state=active]:text-white text-gray-300 hover:text-white font-semibold text-base px-6 py-3 flex-1 max-w-[200px]"
          onClick={() => onTabChange("fuel")}
        >
          <Fuel className="mr-2 h-4 w-4" />
          Fuel Efficiency
        </TabsTrigger>
        <TabsTrigger 
          value="towing" 
          className="data-[state=active]:bg-[#60A5FA] data-[state=active]:text-white text-gray-300 hover:text-white font-semibold text-base px-6 py-3 flex-1 max-w-[200px]"
          onClick={() => onTabChange("towing")}
        >
          <Scale className="mr-2 h-4 w-4" />
          Towing Safety
        </TabsTrigger>
        <TabsTrigger 
          value="smart-systems" 
          className="data-[state=active]:bg-[#60A5FA] data-[state=active]:text-white text-gray-300 hover:text-white font-semibold text-base px-6 py-3 flex-1 max-w-[200px]"
          onClick={() => onTabChange("smart-systems")}
        >
          <Settings className="mr-2 h-4 w-4" />
          Smart Systems
        </TabsTrigger>
      </TabsList>
    </div>
  );
};

export default CalculatorTabs;