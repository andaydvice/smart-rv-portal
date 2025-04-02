
import React from "react";
import { TypographyH4, TypographyP } from "@/components/ui/typography";
import { CalendarDays } from "lucide-react";

const SeasonalWeatherTips = () => {
  return (
    <div className="p-6 rounded-lg bg-gradient-to-b from-connectivity-darkBg to-[#131a2a] border border-[#1a202c]">
      <div className="flex items-center gap-2 mb-4">
        <CalendarDays className="h-5 w-5 text-connectivity-accent" />
        <TypographyH4 className="border-none">Seasonal Weather Tips</TypographyH4>
      </div>
      
      <div className="space-y-4">
        <div>
          <h5 className="text-sm font-semibold text-[#5B9BD5] mb-1">Spring</h5>
          <TypographyP className="text-sm text-light-blue mt-0">Watch for flash floods in desert areas. Thunderstorms can develop quickly.</TypographyP>
        </div>
        
        <div>
          <h5 className="text-sm font-semibold text-[#5B9BD5] mb-1">Summer</h5>
          <TypographyP className="text-sm text-light-blue mt-0">Keep RV cool by parking in shade. Use awnings to reduce solar gain.</TypographyP>
        </div>
        
        <div>
          <h5 className="text-sm font-semibold text-[#5B9BD5] mb-1">Fall</h5>
          <TypographyP className="text-sm text-light-blue mt-0">Check weather forecasts frequently as conditions can change rapidly.</TypographyP>
        </div>
        
        <div>
          <h5 className="text-sm font-semibold text-[#5B9BD5] mb-1">Winter</h5>
          <TypographyP className="text-sm text-light-blue mt-0">Insulate water pipes and tanks. Keep propane tanks at least 30% full.</TypographyP>
        </div>
      </div>
    </div>
  );
};

export default SeasonalWeatherTips;
