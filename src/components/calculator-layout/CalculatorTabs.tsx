import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Battery, Calculator, Fuel, Scale, Settings } from "lucide-react";

const CalculatorTabs = ({ activeTab, onTabChange }: { activeTab: string; onTabChange: (value: string) => void }) => {
  console.log("Current active tab:", activeTab);

  const tabStyle = `
    relative 
    transition-colors 
    duration-200 
    flex-1 
    min-w-[80px] 
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
    whitespace-nowrap
    flex
    items-center
    justify-center
  `;

  return (
    <div className="sticky top-0 z-[5] bg-[#091020] border-b border-gray-800">
      <div className="container mx-auto px-2 md:px-4">
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
            <span>Cost</span>
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
            <span>Power</span>
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
            <span>Fuel</span>
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
            <span>Towing</span>
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
            <span>Smart</span>
          </TabsTrigger>
        </TabsList>
      </div>
    </div>
  );
};

export default CalculatorTabs;