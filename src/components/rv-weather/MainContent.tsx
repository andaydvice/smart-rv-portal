
import React from "react";
import { Route, Wind, CloudRain, Sun, Wrench } from "lucide-react";

const MainContent = () => {
  return (
    <div className="lg:col-span-2">
      {/* Planning Your Trip Section */}
      <div className="bg-[#151A22] rounded-lg shadow-lg p-6 mb-8 border border-[#1a202c]/30">
        <h3 className="text-2xl font-bold mb-6 relative font-playfair text-white">
          Planning Your Trip Around Weather
          <span className="absolute bottom-[-8px] left-0 w-12 h-1 bg-[#5B9BD5]"></span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-xl font-bold mb-4 font-playfair text-white">Seasonal Considerations</h4>
            
            <div className="mb-6">
              <h5 className="text-lg font-semibold mb-2 text-[#5B9BD5]">Spring Travel (March-May)</h5>
              <ul className="list-disc pl-6 space-y-2 text-[#E2E8FF]">
                <li>Variable weather, warming temperatures</li>
                <li>Watch for thunderstorms and flooding</li>
                <li>Best for Southern states, desert Southwest</li>
              </ul>
            </div>
            
            <div className="mb-6">
              <h5 className="text-lg font-semibold mb-2 text-[#5B9BD5]">Summer Travel (June-August)</h5>
              <ul className="list-disc pl-6 space-y-2 text-[#E2E8FF]">
                <li>Hot weather, ideal for northern regions</li>
                <li>Extreme heat, consider elevations</li>
                <li>Best for Mountain states, Pacific Northwest</li>
              </ul>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-4 font-playfair text-white">Route Planning Tools</h4>
            
            <div className="flex items-start mb-4">
              <Route className="h-5 w-5 text-[#5B9BD5] mr-2 mt-1 flex-shrink-0" />
              <div>
                <h5 className="font-semibold text-white">Long Range Forecasts</h5>
                <p className="text-sm text-[#E2E8FF]">AccuWeather 15-day forecast - most reliable for trip planning</p>
              </div>
            </div>
            
            <div className="flex items-start mb-4">
              <Wind className="h-5 w-5 text-[#5B9BD5] mr-2 mt-1 flex-shrink-0" />
              <div>
                <h5 className="font-semibold text-white">Wind Monitoring</h5>
                <p className="text-sm text-[#E2E8FF]">Essential for RVs due to high profile - check forecasts</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CloudRain className="h-5 w-5 text-[#5B9BD5] mr-2 mt-1 flex-shrink-0" />
              <div>
                <h5 className="font-semibold text-white">Precipitation Alerts</h5>
                <p className="text-sm text-[#E2E8FF]">Set up for severe weather warnings along your route</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Weather Hazards Section */}
      <div className="bg-[#151A22] rounded-lg shadow-lg p-6 border border-[#1a202c]/30">
        <h3 className="text-2xl font-bold mb-6 relative font-playfair text-white">
          Weather-Related RV Maintenance
          <span className="absolute bottom-[-8px] left-0 w-12 h-1 bg-[#5B9BD5]"></span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#080F1F] rounded-lg p-5 border border-[#5B9BD5]/20">
            <div className="flex items-center mb-3">
              <Sun className="h-5 w-5 text-[#5B9BD5] mr-2" />
              <h4 className="font-bold text-white">Hot Weather</h4>
            </div>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="min-w-3 h-3 mt-1.5 rounded-full bg-[#5B9BD5] flex-shrink-0"></div>
                <span className="ml-2 text-sm text-[#E2E8FF]">Check and clean air conditioners regularly</span>
              </li>
              <li className="flex items-start">
                <div className="min-w-3 h-3 mt-1.5 rounded-full bg-[#5B9BD5] flex-shrink-0"></div>
                <span className="ml-2 text-sm text-[#E2E8FF]">Inspect seals for heat damage</span>
              </li>
              <li className="flex items-start">
                <div className="min-w-3 h-3 mt-1.5 rounded-full bg-[#5B9BD5] flex-shrink-0"></div>
                <span className="ml-2 text-sm text-[#E2E8FF]">Monitor tire pressure (increases in heat)</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-[#080F1F] rounded-lg p-5 border border-[#5B9BD5]/20">
            <div className="flex items-center mb-3">
              <CloudRain className="h-5 w-5 text-[#5B9BD5] mr-2" />
              <h4 className="font-bold text-white">Rainy Weather</h4>
            </div>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="min-w-3 h-3 mt-1.5 rounded-full bg-[#5B9BD5] flex-shrink-0"></div>
                <span className="ml-2 text-sm text-[#E2E8FF]">Check roof and window seals before rainy seasons</span>
              </li>
              <li className="flex items-start">
                <div className="min-w-3 h-3 mt-1.5 rounded-full bg-[#5B9BD5] flex-shrink-0"></div>
                <span className="ml-2 text-sm text-[#E2E8FF]">Clean and treat slide-out seals</span>
              </li>
              <li className="flex items-start">
                <div className="min-w-3 h-3 mt-1.5 rounded-full bg-[#5B9BD5] flex-shrink-0"></div>
                <span className="ml-2 text-sm text-[#E2E8FF]">Test all awnings for proper drainage</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-[#080F1F] rounded-lg p-5 border border-[#5B9BD5]/20">
            <div className="flex items-center mb-3">
              <Wrench className="h-5 w-5 text-[#5B9BD5] mr-2" />
              <h4 className="font-bold text-white">Cold Weather</h4>
            </div>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="min-w-3 h-3 mt-1.5 rounded-full bg-[#5B9BD5] flex-shrink-0"></div>
                <span className="ml-2 text-sm text-[#E2E8FF]">Insulate water lines and tanks</span>
              </li>
              <li className="flex items-start">
                <div className="min-w-3 h-3 mt-1.5 rounded-full bg-[#5B9BD5] flex-shrink-0"></div>
                <span className="ml-2 text-sm text-[#E2E8FF]">Keep propane tanks at least 30% full</span>
              </li>
              <li className="flex items-start">
                <div className="min-w-3 h-3 mt-1.5 rounded-full bg-[#5B9BD5] flex-shrink-0"></div>
                <span className="ml-2 text-sm text-[#E2E8FF]">Use RV-specific antifreeze where needed</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-[#080F1F] rounded-lg p-5 border border-[#5B9BD5]/20">
            <div className="flex items-center mb-3">
              <Sun className="h-5 w-5 text-[#5B9BD5] mr-2" />
              <h4 className="font-bold text-white">UV Exposure</h4>
            </div>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="min-w-3 h-3 mt-1.5 rounded-full bg-[#5B9BD5] flex-shrink-0"></div>
                <span className="ml-2 text-sm text-[#E2E8FF]">Apply UV protectant to exterior rubber and plastic</span>
              </li>
              <li className="flex items-start">
                <div className="min-w-3 h-3 mt-1.5 rounded-full bg-[#5B9BD5] flex-shrink-0"></div>
                <span className="ml-2 text-sm text-[#E2E8FF]">Use RV covers when stored for prolonged periods</span>
              </li>
              <li className="flex items-start">
                <div className="min-w-3 h-3 mt-1.5 rounded-full bg-[#5B9BD5] flex-shrink-0"></div>
                <span className="ml-2 text-sm text-[#E2E8FF]">Install window coverings to reduce interior fading</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
