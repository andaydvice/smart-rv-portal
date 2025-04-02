
import React from "react";
import { TypographyH2, TypographyH4 } from "@/components/ui/typography";
import { WrenchIcon } from "lucide-react";

const MaintenanceSection = () => {
  return (
    <section className="py-6 px-4 rounded-lg bg-gradient-to-b from-[#131a2a]/50 to-[#080F1F]/50 border border-[#1a202c]/40 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-6">
        <WrenchIcon className="h-7 w-7 text-connectivity-accent" />
        <TypographyH2 className="border-none">Weather-Related RV Maintenance</TypographyH2>
      </div>
      
      <div className="space-y-6">
        <div>
          <TypographyH4>Seasonal Checklist</TypographyH4>
          <div className="grid gap-4 mt-4 md:grid-cols-2">
            <div className="p-4 rounded-lg border border-[#1a202c] bg-[#080F1F]/70">
              <h5 className="font-semibold text-[#5B9BD5]">Spring</h5>
              <ul className="mt-2 space-y-1 text-sm text-light-blue list-disc list-inside">
                <li>Check and reseal roof seams</li>
                <li>Inspect window and door seals</li>
                <li>Test air conditioning system</li>
              </ul>
            </div>
            
            <div className="p-4 rounded-lg border border-[#1a202c] bg-[#080F1F]/70">
              <h5 className="font-semibold text-[#5B9BD5]">Summer</h5>
              <ul className="mt-2 space-y-1 text-sm text-light-blue list-disc list-inside">
                <li>Check tire pressure regularly (heat increases pressure)</li>
                <li>Clean air conditioner filters monthly</li>
                <li>Inspect awnings and extend/retract mechanisms</li>
              </ul>
            </div>
            
            <div className="p-4 rounded-lg border border-[#1a202c] bg-[#080F1F]/70">
              <h5 className="font-semibold text-[#5B9BD5]">Fall</h5>
              <ul className="mt-2 space-y-1 text-sm text-light-blue list-disc list-inside">
                <li>Check furnace operation</li>
                <li>Inspect weather stripping</li>
                <li>Clean and check roof vents</li>
              </ul>
            </div>
            
            <div className="p-4 rounded-lg border border-[#1a202c] bg-[#080F1F]/70">
              <h5 className="font-semibold text-[#5B9BD5]">Winter</h5>
              <ul className="mt-2 space-y-1 text-sm text-light-blue list-disc list-inside">
                <li>Apply RV antifreeze to plumbing if needed</li>
                <li>Check propane system and detectors</li>
                <li>Inspect roof for snow load capacity</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto mt-6">
          <table className="w-full text-sm">
            <thead className="bg-[#151A22]">
              <tr>
                <th className="p-3 text-left border-b border-[#1a202c]">Weather Condition</th>
                <th className="p-3 text-left border-b border-[#1a202c]">Potential Impact</th>
                <th className="p-3 text-left border-b border-[#1a202c]">Preventative Measure</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#1a202c]">
                <td className="p-3 font-semibold text-[#5B9BD5]">Extreme Heat</td>
                <td className="p-3 text-light-blue">AC strain, refrigerator failure, tire damage</td>
                <td className="p-3 text-light-blue">Park in shade, use tire covers, check refrigerator vents</td>
              </tr>
              <tr className="border-b border-[#1a202c]">
                <td className="p-3 font-semibold text-[#5B9BD5]">Freezing Temps</td>
                <td className="p-3 text-light-blue">Plumbing damage, propane regulator issues</td>
                <td className="p-3 text-light-blue">Winterize systems, insulate connections</td>
              </tr>
              <tr className="border-b border-[#1a202c]">
                <td className="p-3 font-semibold text-[#5B9BD5]">High Humidity</td>
                <td className="p-3 text-light-blue">Mold/mildew growth, electrical issues</td>
                <td className="p-3 text-light-blue">Use dehumidifiers, check for water intrusion</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[#5B9BD5]">UV Exposure</td>
                <td className="p-3 text-light-blue">Rubber/sealant degradation, fading</td>
                <td className="p-3 text-light-blue">Use UV protectants, cover RV when stored</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default MaintenanceSection;
