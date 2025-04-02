
import React from "react";
import { TypographyH2, TypographyP, TypographyH4 } from "@/components/ui/typography";
import { CalendarDays } from "lucide-react";

const PlanningSection = () => {
  return (
    <section className="py-6 px-4 rounded-lg bg-gradient-to-b from-[#131a2a]/50 to-[#080F1F]/50 border border-[#1a202c]/40 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-6">
        <CalendarDays className="h-7 w-7 text-connectivity-accent" />
        <TypographyH2 className="border-none">Planning Your Trip Around Weather</TypographyH2>
      </div>
      
      <div className="space-y-6">
        <div>
          <TypographyH4>Seasonal Considerations</TypographyH4>
          <div className="grid gap-4 mt-4 md:grid-cols-2">
            <div className="p-4 rounded-lg border border-[#1a202c] bg-[#080F1F]/70">
              <h5 className="font-semibold text-[#5B9BD5]">Spring Travel (March-May)</h5>
              <ul className="mt-2 space-y-1 text-sm text-light-blue list-disc list-inside">
                <li>Smaller crowds, blooming landscapes</li>
                <li>Unpredictable rain, potential flooding</li>
                <li>Best for Southern states, desert Southwest</li>
              </ul>
            </div>
            
            <div className="p-4 rounded-lg border border-[#1a202c] bg-[#080F1F]/70">
              <h5 className="font-semibold text-[#5B9BD5]">Summer Travel (June-August)</h5>
              <ul className="mt-2 space-y-1 text-sm text-light-blue list-disc list-inside">
                <li>Longer daylight hours, access to northern regions</li>
                <li>Extreme heat, crowded destinations</li>
                <li>Best for Mountain states, Pacific Northwest</li>
              </ul>
            </div>
            
            <div className="p-4 rounded-lg border border-[#1a202c] bg-[#080F1F]/70">
              <h5 className="font-semibold text-[#5B9BD5]">Fall Travel (September-November)</h5>
              <ul className="mt-2 space-y-1 text-sm text-light-blue list-disc list-inside">
                <li>Spectacular foliage, cooler temperatures</li>
                <li>Variable weather patterns, shorter days</li>
                <li>Best for New England, Appalachian Mountains</li>
              </ul>
            </div>
            
            <div className="p-4 rounded-lg border border-[#1a202c] bg-[#080F1F]/70">
              <h5 className="font-semibold text-[#5B9BD5]">Winter Travel (December-February)</h5>
              <ul className="mt-2 space-y-1 text-sm text-light-blue list-disc list-inside">
                <li>Solitude, unique winter landscapes</li>
                <li>Cold temperatures, limited campground availability</li>
                <li>Best for Southwest deserts, Florida</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <TypographyH4>Route Planning Tools</TypographyH4>
          <div className="mt-4 space-y-4">
            <div className="p-4 rounded-lg border border-[#1a202c] bg-[#080F1F]/70">
              <h5 className="font-semibold text-[#5B9BD5]">Long-Range Forecasts</h5>
              <ul className="mt-2 space-y-1 text-sm text-light-blue list-disc list-inside">
                <li><a href="https://www.cpc.ncep.noaa.gov/" target="_blank" rel="noopener noreferrer" className="text-[#5B9BD5] hover:underline">Climate Prediction Center</a> - 6-10 day, 8-14 day outlooks</li>
                <li><a href="https://www.accuweather.com/en/weather-forecasts/month" target="_blank" rel="noopener noreferrer" className="text-[#5B9BD5] hover:underline">AccuWeather Long-Range</a> - Monthly forecasts</li>
              </ul>
            </div>
            
            <div className="p-4 rounded-lg border border-[#1a202c] bg-[#080F1F]/70">
              <h5 className="font-semibold text-[#5B9BD5]">Historical Weather Data</h5>
              <ul className="mt-2 space-y-1 text-sm text-light-blue list-disc list-inside">
                <li><a href="https://www.wunderground.com/history" target="_blank" rel="noopener noreferrer" className="text-[#5B9BD5] hover:underline">Weather Underground Historical Data</a></li>
                <li><a href="https://www.ncdc.noaa.gov/cdo-web/" target="_blank" rel="noopener noreferrer" className="text-[#5B9BD5] hover:underline">NOAA Climate Data</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlanningSection;
