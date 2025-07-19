
import React from "react";
import { TypographyH2, TypographyH4 } from "@/components/ui/typography";
import { Smartphone, Cloud } from "lucide-react";

const MonitoringSection = () => {
  return (
    <section className="py-6 px-4 rounded-lg bg-gradient-to-b from-[#131a2a]/50 to-[#080F1F]/50 border border-[#1a202c]/40 backdrop-blur-sm">
      <div className="flex items-center justify-center gap-2 mb-6">
        <Smartphone className="h-7 w-7 text-connectivity-accent" />
        <TypographyH2 className="border-none text-white text-center">Real Time Weather Monitoring</TypographyH2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="relative overflow-hidden rounded-lg shadow-xl w-full">
          <img 
            src="/lovable-uploads/846b5be5-043e-4645-a3d9-39614d63342c.png"
            alt="Person monitoring weather radar on computer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        
        <div className="space-y-6 w-full">
          <div className="w-full">
            <TypographyH4 className="text-white text-center mb-4">Essential Weather Apps</TypographyH4>
            <div className="space-y-4">
              <div className="p-4 rounded-lg border border-[#1a202c] bg-[#080F1F]/70 w-full">
                <h5 className="font-semibold text-[#5B9BD5] text-center mb-2">Comprehensive Weather Apps</h5>
                <ul className="w-full space-y-2 text-left text-[#E2E8FF] list-disc pl-5">
                  <li className="text-left">AccuWeather - 15 day forecast plus radar</li>
                  <li className="text-left">Weather Underground - Detailed forecasts with PWS network</li>
                  <li className="text-left">The Weather Channel - Live interactive radar</li>
                </ul>
              </div>
              
              <div className="p-4 rounded-lg border border-[#1a202c] bg-[#080F1F]/70 w-full">
                <h5 className="font-semibold text-[#5B9BD5] text-center mb-2">RV Specific Weather Tools</h5>
                <ul className="w-full space-y-2 text-left text-[#E2E8FF] list-disc pl-5">
                  <li className="text-left">RV Weather - Weather for routes specifically</li>
                  <li className="text-left">Wind Alerts - Warnings for wind/driving conditions</li>
                  <li className="text-left">Weather Radio - NOAA weather radio alerts</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MonitoringSection;
