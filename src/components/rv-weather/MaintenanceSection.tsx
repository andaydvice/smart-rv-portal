import React from "react";
import { Container } from "@/components/ui/container";
import { Wrench, Sun, CloudRain, Shield } from "lucide-react";

const MaintenanceSection = () => {
  return (
    <section className="py-16 bg-deeper-background">
      <Container>
        <h2 className="text-3xl md:text-4xl font-bold text-white font-playfair text-center mb-8">
          Weather Related Smart RV Maintenance
        </h2>
        
        <div className="flex flex-col space-y-12 max-w-full">
          {/* Section 1: Seasonal Maintenance Checklist */}
          <div className="bg-dark-background p-6 md:p-8 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <Wrench className="h-6 w-6 text-[#5B9BD5] mr-3" />
              Seasonal Maintenance Checklist
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-4 bg-deeper-background/80 border border-ocean-blue/30 rounded-lg">
                <h4 className="font-bold text-white mb-2 flex items-center">
                  <Sun className="h-5 w-5 mr-2 text-[#8BC34A]" />
                  Spring
                </h4>
                <ul className="space-y-2 text-light-blue text-sm">
                  <li>• Check and reseal roof seams</li>
                  <li>• Inspect window and door seals</li>
                  <li>• Test air conditioning system</li>
                  <li>• Examine awnings for winter damage</li>
                </ul>
              </div>
              
              <div className="p-4 bg-deeper-background/80 border border-ocean-blue/30 rounded-lg">
                <h4 className="font-bold text-white mb-2 flex items-center">
                  <Sun className="h-5 w-5 mr-2 text-[#FF9800]" />
                  Summer
                </h4>
                <ul className="space-y-2 text-light-blue text-sm">
                  <li>• Check tire pressure regularly</li>
                  <li>• Clean air conditioner filters monthly</li>
                  <li>• Inspect awnings and mechanisms</li>
                  <li>• Check refrigerator vents and cooling</li>
                </ul>
              </div>
              
              <div className="p-4 bg-deeper-background/80 border border-ocean-blue/30 rounded-lg">
                <h4 className="font-bold text-white mb-2 flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-[#FF5722]" />
                  Fall
                </h4>
                <ul className="space-y-2 text-light-blue text-sm">
                  <li>• Check furnace operation</li>
                  <li>• Inspect weather stripping</li>
                  <li>• Clean and check roof vents</li>
                  <li>• Apply UV protectant to rubber seals</li>
                </ul>
              </div>
              
              <div className="p-4 bg-deeper-background/80 border border-ocean-blue/30 rounded-lg">
                <h4 className="font-bold text-white mb-2 flex items-center">
                  <CloudRain className="h-5 w-5 mr-2 text-[#03A9F4]" />
                  Winter
                </h4>
                <ul className="space-y-2 text-light-blue text-sm">
                  <li>• Apply RV antifreeze to plumbing</li>
                  <li>• Check propane system and detectors</li>
                  <li>• Inspect roof for snow load capacity</li>
                  <li>• Install battery maintainer if stored</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Section 2: Weather Impact & Prevention */}
          <div className="bg-dark-background p-6 md:p-8 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <Shield className="h-6 w-6 text-[#5B9BD5] mr-3" />
              Weather Impact & Prevention
            </h3>
            
            <div className="overflow-x-auto bg-[#080F1F]/80 rounded-lg border border-[#1a202c] p-2">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#1a202c]">
                    <th className="text-left py-3 px-4 text-white font-bold">Weather Condition</th>
                    <th className="text-left py-3 px-4 text-white font-bold">Preventative Measure</th>
                  </tr>
                </thead>
                <tbody className="text-light-blue">
                  <tr className="border-b border-[#1a202c]">
                    <td className="py-3 px-4 font-medium text-ocean-blue">Extreme Heat</td>
                    <td className="py-3 px-4">Park in shade, use tire covers, check refrigerator vents</td>
                  </tr>
                  <tr className="border-b border-[#1a202c]">
                    <td className="py-3 px-4 font-medium text-ocean-blue">Freezing Temps</td>
                    <td className="py-3 px-4">Winterize systems, insulate connections</td>
                  </tr>
                  <tr className="border-b border-[#1a202c]">
                    <td className="py-3 px-4 font-medium text-ocean-blue">High Humidity</td>
                    <td className="py-3 px-4">Use dehumidifiers, check for water intrusion</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-ocean-blue">UV Exposure</td>
                    <td className="py-3 px-4">Use UV protectants, cover RV when stored</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 p-4 md:p-6 bg-deeper-background/80 rounded-lg border border-ocean-blue/30">
              {/* MODIFIED: Changed text-center to text-left */}
              <p className="italic text-white text-left">
                "Remember: Regular weather related maintenance is cheaper than emergency repairs. 
                Your Smart RV's resilience to weather extremes depends on your preventative care."
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default MaintenanceSection;
