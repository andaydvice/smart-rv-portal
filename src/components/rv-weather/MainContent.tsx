
import React from "react";
import { Container } from "@/components/ui/container"; 
import { Route, Wind, CloudRain, Sun, Wrench } from "lucide-react";

const MainContent = () => {
  return (
    <div className="lg:col-span-2">
      {/* Planning Your Trip Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h3 className="text-2xl font-bold mb-6 relative font-playfair text-left">
          Planning Your Trip Around Weather
          <span className="absolute bottom-[-8px] left-0 w-12 h-1 bg-[#3b82f6]"></span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-xl font-bold mb-4 font-playfair">Seasonal Considerations</h4>
            
            <div className="mb-6">
              <h5 className="text-lg font-semibold mb-2">Spring Travel (March-May)</h5>
              <ul className="list-disc pl-6 space-y-2">
                <li>Variable weather, warming temperatures</li>
                <li>Watch for thunderstorms and flooding</li>
                <li>Best for Southern states, desert Southwest</li>
              </ul>
            </div>
            
            <div className="mb-6">
              <h5 className="text-lg font-semibold mb-2">Summer Travel (June-August)</h5>
              <ul className="list-disc pl-6 space-y-2">
                <li>Hot weather, ideal for northern regions</li>
                <li>Extreme heat, consider elevations</li>
                <li>Best for Mountain states, Pacific Northwest</li>
              </ul>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-4 font-playfair">Route Planning Tools</h4>
            
            <div className="flex items-start mb-4">
              <Route className="h-5 w-5 text-[#3b82f6] mr-2 mt-1" />
              <div>
                <h5 className="font-semibold">Long Range Forecasts</h5>
                <p className="text-sm text-[#4a5568]">AccuWeather 15-day forecast - most reliable for trip planning</p>
              </div>
            </div>
            
            <div className="flex items-start mb-4">
              <Wind className="h-5 w-5 text-[#3b82f6] mr-2 mt-1" />
              <div>
                <h5 className="font-semibold">Wind Monitoring</h5>
                <p className="text-sm text-[#4a5568]">Essential for RVs due to high profile - check forecasts</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CloudRain className="h-5 w-5 text-[#3b82f6] mr-2 mt-1" />
              <div>
                <h5 className="font-semibold">Precipitation Alerts</h5>
                <p className="text-sm text-[#4a5568]">Set up for severe weather warnings along your route</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Weather Hazards Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-2xl font-bold mb-6 relative font-playfair text-left">
          Weather-Related RV Maintenance
          <span className="absolute bottom-[-8px] left-0 w-12 h-1 bg-[#3b82f6]"></span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 rounded-lg p-5">
            <div className="flex items-center mb-3">
              <Sun className="h-5 w-5 text-green-500 mr-2" />
              <h4 className="font-bold text-green-700">Hot Weather</h4>
            </div>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="min-w-3 h-3 mt-1.5 rounded-full bg-green-500 flex-shrink-0"></div>
                <span className="ml-2 text-sm">Check and clean air conditioners regularly</span>
              </li>
              <li className="flex items-start">
                <div className="min-w-3 h-3 mt-1.5 rounded-full bg-green-500 flex-shrink-0"></div>
                <span className="ml-2 text-sm">Inspect seals for heat damage</span>
              </li>
              <li className="flex items-start">
                <div className="min-w-3 h-3 mt-1.5 rounded-full bg-green-500 flex-shrink-0"></div>
                <span className="ml-2 text-sm">Monitor tire pressure (increases in heat)</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-5">
            <div className="flex items-center mb-3">
              <CloudRain className="h-5 w-5 text-blue-500 mr-2" />
              <h4 className="font-bold text-blue-700">Rainy Weather</h4>
            </div>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="min-w-3 h-3 mt-1.5 rounded-full bg-blue-500 flex-shrink-0"></div>
                <span className="ml-2 text-sm">Check roof and window seals before rainy seasons</span>
              </li>
              <li className="flex items-start">
                <div className="min-w-3 h-3 mt-1.5 rounded-full bg-blue-500 flex-shrink-0"></div>
                <span className="ml-2 text-sm">Clean and treat slide-out seals</span>
              </li>
              <li className="flex items-start">
                <div className="min-w-3 h-3 mt-1.5 rounded-full bg-blue-500 flex-shrink-0"></div>
                <span className="ml-2 text-sm">Test all awnings for proper drainage</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-5">
            <div className="flex items-center mb-3">
              <Wrench className="h-5 w-5 text-blue-500 mr-2" />
              <h4 className="font-bold text-blue-700">Cold Weather</h4>
            </div>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="min-w-3 h-3 mt-1.5 rounded-full bg-blue-500 flex-shrink-0"></div>
                <span className="ml-2 text-sm">Insulate water lines and tanks</span>
              </li>
              <li className="flex items-start">
                <div className="min-w-3 h-3 mt-1.5 rounded-full bg-blue-500 flex-shrink-0"></div>
                <span className="ml-2 text-sm">Keep propane tanks at least 30% full</span>
              </li>
              <li className="flex items-start">
                <div className="min-w-3 h-3 mt-1.5 rounded-full bg-blue-500 flex-shrink-0"></div>
                <span className="ml-2 text-sm">Use RV-specific antifreeze where needed</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-yellow-50 rounded-lg p-5">
            <div className="flex items-center mb-3">
              <Sun className="h-5 w-5 text-yellow-500 mr-2" />
              <h4 className="font-bold text-yellow-700">UV Exposure</h4>
            </div>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="min-w-3 h-3 mt-1.5 rounded-full bg-yellow-500 flex-shrink-0"></div>
                <span className="ml-2 text-sm">Apply UV protectant to exterior rubber and plastic</span>
              </li>
              <li className="flex items-start">
                <div className="min-w-3 h-3 mt-1.5 rounded-full bg-yellow-500 flex-shrink-0"></div>
                <span className="ml-2 text-sm">Use RV covers when stored for prolonged periods</span>
              </li>
              <li className="flex items-start">
                <div className="min-w-3 h-3 mt-1.5 rounded-full bg-yellow-500 flex-shrink-0"></div>
                <span className="ml-2 text-sm">Install window coverings to reduce interior fading</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
