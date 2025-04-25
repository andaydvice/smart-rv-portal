
import React from "react";
import { TypographyH2, TypographyH4 } from "@/components/ui/typography";
import { Smartphone, Cloud } from "lucide-react";

const MonitoringSection = () => {
  return (
    <section className="py-6 px-4 rounded-lg bg-gradient-to-b from-[#131a2a]/50 to-[#080F1F]/50 border border-[#1a202c]/40 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-6">
        <Smartphone className="h-7 w-7 text-connectivity-accent" />
        <TypographyH2 className="border-none text-white">Real-Time Weather Monitoring</TypographyH2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="relative overflow-hidden rounded-lg shadow-xl">
          <img 
            src="/lovable-uploads/846b5be5-043e-4645-a3d9-39614d63342c.png"
            alt="Person monitoring weather radar on computer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        
        <div className="space-y-6">
          <div>
            <TypographyH4 className="text-white text-left mb-4">Essential Weather Apps</TypographyH4>
            <div className="space-y-4">
              <div className="p-4 rounded-lg border border-[#1a202c] bg-[#080F1F]/70">
                <h5 className="font-semibold text-[#5B9BD5] text-left mb-2">Comprehensive Weather Apps</h5>
                <ul className="space-y-2 pl-4 text-sm text-[#E2E8FF] list-disc list-inside">
                  <li>AccuWeather - 15-day forecast plus radar</li>
                  <li>Weather Underground - Detailed forecasts with PWS network</li>
                  <li>The Weather Channel - Live interactive radar</li>
                </ul>
              </div>
              
              <div className="p-4 rounded-lg border border-[#1a202c] bg-[#080F1F]/70">
                <h5 className="font-semibold text-[#5B9BD5] text-left mb-2">RV-Specific Weather Tools</h5>
                <ul className="space-y-2 pl-4 text-sm text-[#E2E8FF] list-disc list-inside">
                  <li>RV Weather - Weather for routes specifically</li>
                  <li>Wind Alerts - Warnings for wind/driving conditions</li>
                  <li>Weather Radio - NOAA weather radio alerts</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#080F1F] p-6 rounded-lg border border-[#5B9BD5]/20 mt-8">
        <div className="flex items-center mb-4">
          <Cloud className="h-6 w-6 text-[#5B9BD5] mr-3" />
          <h4 className="text-xl font-bold text-white">RV Weather Module Features</h4>
        </div>
        <ul className="space-y-3">
          <li className="flex items-start">
            <div className="min-w-3 h-3 mt-1.5 rounded-full bg-[#5B9BD5] flex-shrink-0"></div>
            <span className="ml-2 text-sm text-[#E2E8FF]">Free weather forecasting tools specifically for RV owners</span>
          </li>
          <li className="flex items-start">
            <div className="min-w-3 h-3 mt-1.5 rounded-full bg-[#5B9BD5] flex-shrink-0"></div>
            <span className="ml-2 text-sm text-[#E2E8FF]">Alerts about potential path of storms in advance of trip planning</span>
          </li>
          <li className="flex items-start">
            <div className="min-w-3 h-3 mt-1.5 rounded-full bg-[#5B9BD5] flex-shrink-0"></div>
            <span className="ml-2 text-sm text-[#E2E8FF]">Customized weather alerts for your exact GPS coordinates</span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default MonitoringSection;
