
import React from "react";
import { TypographyH2, TypographyH4 } from "@/components/ui/typography";
import { Smartphone } from "lucide-react";

const MonitoringSection = () => {
  return (
    <section className="py-6 px-4 rounded-lg bg-gradient-to-b from-[#131a2a]/50 to-[#080F1F]/50 border border-[#1a202c]/40 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-6">
        <Smartphone className="h-7 w-7 text-connectivity-accent" />
        <TypographyH2 className="border-none">Real-Time Weather Monitoring</TypographyH2>
      </div>
      
      <div className="space-y-6">
        <div>
          <TypographyH4>Essential Weather Apps</TypographyH4>
          <div className="grid gap-4 mt-4 md:grid-cols-2">
            <div className="p-4 rounded-lg border border-[#1a202c] bg-[#080F1F]/70">
              <h5 className="font-semibold text-[#5B9BD5]">Comprehensive Weather Apps</h5>
              <ul className="mt-2 space-y-1 text-sm text-light-blue list-disc list-inside">
                <li><strong>RadarScope</strong> - Professional-grade radar data</li>
                <li><strong>Weather Underground</strong> - Detailed forecasts with PWS network</li>
                <li><strong>The Weather Channel</strong> - User-friendly with good severe weather alerts</li>
              </ul>
            </div>
            
            <div className="p-4 rounded-lg border border-[#1a202c] bg-[#080F1F]/70">
              <h5 className="font-semibold text-[#5B9BD5]">RV-Specific Weather Tools</h5>
              <ul className="mt-2 space-y-1 text-sm text-light-blue list-disc list-inside">
                <li><strong>RV Weather</strong> - Weather forecasts specifically for RV routes</li>
                <li><strong>Windy</strong> - Essential for monitoring wind conditions</li>
                <li><strong>Weather Radio</strong> - NOAA weather radio alerts</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MonitoringSection;
