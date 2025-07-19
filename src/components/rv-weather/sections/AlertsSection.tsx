
import React from "react";
import { TypographyH2, TypographyP } from "@/components/ui/typography";
import { BellRing } from "lucide-react";

const AlertsSection = () => {
  return (
    <section className="py-6 px-4 rounded-lg bg-gradient-to-b from-[#131a2a]/50 to-[#080F1F]/50 border border-[#1a202c]/40 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-6">
        <BellRing className="h-7 w-7 text-connectivity-accent" />
        <TypographyH2 className="border-none text-white">Understanding Weather Alerts</TypographyH2>
      </div>
      
      <TypographyP className="mb-6 text-light-blue text-left">
        Weather alerts can be critical for RV travelers. Understanding their meaning and appropriate responses can help keep you safe during severe weather events.
      </TypographyP>
      
      <div className="overflow-x-auto bg-[#080F1F]/80 rounded-lg border border-[#1a202c] p-4">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#1a202c]">
              <th className="px-4 py-3 text-left text-white font-bold">Alert Type</th>
              <th className="px-4 py-3 text-left text-white font-bold">What It Means</th>
              <th className="px-4 py-3 text-left text-white font-bold">RV Response</th>
            </tr>
          </thead>
          <tbody className="text-light-blue">
            <tr className="border-b border-[#1a202c]">
              <td className="px-4 py-3 text-ocean-blue font-medium">Watch</td>
              <td className="px-4 py-3">Conditions are favorable for severe weather</td>
              <td className="px-4 py-3">Monitor closely, prepare for possible relocation</td>
            </tr>
            <tr className="border-b border-[#1a202c]">
              <td className="px-4 py-3 text-ocean-blue font-medium">Warning</td>
              <td className="px-4 py-3">Severe weather is imminent or occurring</td>
              <td className="px-4 py-3">Take immediate protective action</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-ocean-blue font-medium">Advisory</td>
              <td className="px-4 py-3">Less severe but potentially hazardous conditions</td>
              <td className="px-4 py-3">Use caution, possibly adjust travel plans</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 space-y-4">
        <h3 className="text-xl font-bold text-white">Primary Alert Sources</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border border-[#1a202c] bg-[#080F1F]/70">
            <h4 className="font-semibold text-ocean-blue mb-2">NOAA Weather Radio</h4>
            <p className="text-light-blue text-sm">24/7 broadcasts of weather information and alerts. Consider a dedicated NOAA weather radio for your RV.</p>
          </div>
          
          <div className="p-4 rounded-lg border border-[#1a202c] bg-[#080F1F]/70">
            <h4 className="font-semibold text-ocean-blue mb-2">Weather Apps</h4>
            <p className="text-light-blue text-sm">Apps like Weather Channel, AccuWeather, or NOAA app provide real time alerts even when on the move.</p>
          </div>
          
          <div className="p-4 rounded-lg border border-[#1a202c] bg-[#080F1F]/70">
            <h4 className="font-semibold text-ocean-blue mb-2">Wireless Emergency Alerts</h4>
            <p className="text-light-blue text-sm">Make sure these are enabled on your mobile device for critical weather alerts in your area.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlertsSection;
