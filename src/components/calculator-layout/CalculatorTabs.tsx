import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Battery, Fuel, Scale, Settings, Calculator } from "lucide-react";

const CalculatorTabs = ({ activeTab, onTabChange }: { activeTab: string; onTabChange: (value: string) => void }) => {
  console.log("Current active tab:", activeTab);

  const tabStyle = `
    relative 
    transition-colors 
    duration-200 
    flex-1 
    min-w-[100px] 
    md:min-w-[120px] 
    max-w-[200px]
    px-2 
    md:px-4 
    py-1.5 
    md:py-2
    text-sm 
    md:text-base 
    font-semibold
    text-gray-300
    hover:text-white
    data-[state=active]:bg-[#60A5FA]/20
    data-[state=active]:text-white
    rounded-md
  `;

  return (
    <div className="sticky top-0 z-[5] bg-[#091020] border-b border-gray-800">
      <div className="container mx-auto px-4">
        <TabsList className="bg-[#091020] p-1 md:p-2 w-full flex overflow-x-auto no-scrollbar gap-1 md:gap-2">
          <TabsTrigger 
            value="cost" 
            className={tabStyle}
            onClick={() => {
              console.log("Clicking cost tab");
              onTabChange("cost");
            }}
          >
            <Calculator className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
            Cost
          </TabsTrigger>
          <TabsTrigger 
            value="power" 
            className={tabStyle}
            onClick={() => {
              console.log("Clicking power tab");
              onTabChange("power");
            }}
          >
            <Battery className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
            Power & Solar
          </TabsTrigger>
          <TabsTrigger 
            value="fuel" 
            className={tabStyle}
            onClick={() => {
              console.log("Clicking fuel tab");
              onTabChange("fuel");
            }}
          >
            <Fuel className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
            Fuel Efficiency
          </TabsTrigger>
          <TabsTrigger 
            value="towing" 
            className={tabStyle}
            onClick={() => {
              console.log("Clicking towing tab");
              onTabChange("towing");
            }}
          >
            <Scale className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
            Towing Safety
          </TabsTrigger>
          <TabsTrigger 
            value="smart-systems" 
            className={tabStyle}
            onClick={() => {
              console.log("Clicking smart systems tab");
              onTabChange("smart-systems");
            }}
          >
            <Settings className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
            Smart Systems
          </TabsTrigger>
        </TabsList>
      </div>
    </div>
  );
};

export default CalculatorTabs;