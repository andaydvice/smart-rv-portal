import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Battery, Calculator, Fuel, Scale, Settings } from "lucide-react";

const CalculatorTabs = ({ activeTab, onTabChange }: { activeTab: string; onTabChange: (value: string) => void }) => {
  // Tab tracking removed for production

  const tabStyle = `
    relative 
    flex
    items-center
    justify-center
    gap-2
    px-4
    py-2.5
    text-sm
    font-medium
    text-gray-300
    hover:text-white
    data-[state=active]:bg-[#60A5FA]/20
    data-[state=active]:text-white
    rounded-md
    whitespace-nowrap
    min-w-[120px]
    transition-colors
  `;

  return (
    <div className="sticky top-16 z-[5] bg-[#091020] border-b border-gray-800">
      <div className="container mx-auto px-4">
        <TabsList className="bg-[#091020] p-2 w-full flex overflow-x-auto gap-2 no-scrollbar">
          <TabsTrigger 
            value="cost" 
            className={tabStyle}
            onClick={() => onTabChange("cost")}
          >
            <Calculator className="h-4 w-4 flex-shrink-0" />
            <span>Cost</span>
          </TabsTrigger>
          <TabsTrigger 
            value="power" 
            className={tabStyle}
            onClick={() => onTabChange("power")}
          >
            <Battery className="h-4 w-4 flex-shrink-0" />
            <span>Power</span>
          </TabsTrigger>
          <TabsTrigger 
            value="fuel" 
            className={tabStyle}
            onClick={() => onTabChange("fuel")}
          >
            <Fuel className="h-4 w-4 flex-shrink-0" />
            <span>Fuel</span>
          </TabsTrigger>
          <TabsTrigger 
            value="towing" 
            className={tabStyle}
            onClick={() => onTabChange("towing")}
          >
            <Scale className="h-4 w-4 flex-shrink-0" />
            <span>Towing</span>
          </TabsTrigger>
          <TabsTrigger 
            value="smart-systems" 
            className={tabStyle}
            onClick={() => onTabChange("smart-systems")}
          >
            <Settings className="h-4 w-4 flex-shrink-0" />
            <span>Smart</span>
          </TabsTrigger>
        </TabsList>
      </div>
    </div>
  );
};

export default CalculatorTabs;