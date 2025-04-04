
import React from "react";
import { Wrench } from "lucide-react";

const MaintenanceSection = () => {
  return (
    <section className="relative w-full py-16 bg-cover bg-center" style={{ backgroundImage: "url('/lovable-uploads/ad3dc693-42f4-4635-af2d-b2c4b1aafc43.png')" }}>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white font-playfair text-center mb-4">
          Weather-Related RV Maintenance
        </h2>
        <div className="w-24 h-1 bg-ocean-blue mx-auto mb-12"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-dark-background/80 p-6 rounded-lg shadow backdrop-blur-sm">
            <div className="flex items-center mb-6">
              <div className="p-2 bg-ocean-blue/20 rounded-full mr-3">
                <Wrench className="h-6 w-6 text-ocean-blue" />
              </div>
              <h3 className="text-xl font-bold text-white">Seasonal Maintenance Checklist</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-deeper-background/80 border border-ocean-blue/30 rounded-lg">
                <h4 className="font-semibold text-ocean-blue mb-2 text-left">Spring</h4>
                <ul className="space-y-2 text-light-blue text-sm text-left">
                  <li>• Check and reseal roof seams</li>
                  <li>• Inspect window and door seals</li>
                  <li>• Test air conditioning system</li>
                  <li>• Examine awnings for winter damage</li>
                </ul>
              </div>
              
              <div className="p-4 bg-deeper-background/80 border border-ocean-blue/30 rounded-lg">
                <h4 className="font-semibold text-ocean-blue mb-2 text-left">Summer</h4>
                <ul className="space-y-2 text-light-blue text-sm text-left">
                  <li>• Check tire pressure regularly</li>
                  <li>• Clean air conditioner filters monthly</li>
                  <li>• Inspect awnings and mechanisms</li>
                  <li>• Check refrigerator vents and cooling</li>
                </ul>
              </div>
              
              <div className="p-4 bg-deeper-background/80 border border-ocean-blue/30 rounded-lg">
                <h4 className="font-semibold text-ocean-blue mb-2 text-left">Fall</h4>
                <ul className="space-y-2 text-light-blue text-sm text-left">
                  <li>• Check furnace operation</li>
                  <li>• Inspect weather stripping</li>
                  <li>• Clean and check roof vents</li>
                  <li>• Apply UV protectant to rubber seals</li>
                </ul>
              </div>
              
              <div className="p-4 bg-deeper-background/80 border border-ocean-blue/30 rounded-lg">
                <h4 className="font-semibold text-ocean-blue mb-2 text-left">Winter</h4>
                <ul className="space-y-2 text-light-blue text-sm text-left">
                  <li>• Apply RV antifreeze to plumbing</li>
                  <li>• Check propane system and detectors</li>
                  <li>• Inspect roof for snow load capacity</li>
                  <li>• Install battery maintainer if stored</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-dark-background/80 p-6 rounded-lg shadow backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-6 text-left">Weather Impact & Prevention</h3>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-light-blue font-semibold">Weather Condition</th>
                    <th className="text-left py-3 px-4 text-light-blue font-semibold">Preventative Measure</th>
                  </tr>
                </thead>
                <tbody className="text-light-blue">
                  <tr className="border-b border-gray-700">
                    <td className="py-3 px-4 font-medium text-ocean-blue">Extreme Heat</td>
                    <td className="py-3 px-4 text-left">Park in shade, use tire covers, check refrigerator vents</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-3 px-4 font-medium text-ocean-blue">Freezing Temps</td>
                    <td className="py-3 px-4 text-left">Winterize systems, insulate connections</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-3 px-4 font-medium text-ocean-blue">High Humidity</td>
                    <td className="py-3 px-4 text-left">Use dehumidifiers, check for water intrusion</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-ocean-blue">UV Exposure</td>
                    <td className="py-3 px-4 text-left">Use UV protectants, cover RV when stored</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 p-6 bg-deeper-background/80 rounded-lg border border-ocean-blue/30">
              <p className="italic text-light-blue text-left">
                "Remember: Regular weather-related maintenance is cheaper than emergency repairs. 
                Your RV's resilience to weather extremes depends on your preventative care."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MaintenanceSection;
