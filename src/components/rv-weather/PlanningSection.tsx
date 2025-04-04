
import React from "react";
import { CalendarDays, Map, Sun, CloudRain, Leaf, Snowflake } from "lucide-react";

const PlanningSection = () => {
  return (
    <section className="relative w-full py-16 bg-cover bg-center" style={{ backgroundImage: "url('/lovable-uploads/ad3dc693-42f4-4635-af2d-b2c4b1aafc43.png')" }}>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/80"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white font-playfair text-center mb-4">
          Planning Your Trip Around Weather
        </h2>
        <div className="w-24 h-1 bg-ocean-blue mx-auto mb-10"></div>
        
        <div className="flex flex-col gap-8 max-w-4xl mx-auto">
          {/* Seasonal Considerations Section */}
          <div className="bg-dark-background/80 p-6 rounded-lg shadow backdrop-blur-sm">
            <div className="flex items-center mb-6">
              <div className="p-2 bg-ocean-blue/20 rounded-full mr-3">
                <CalendarDays className="h-6 w-6 text-ocean-blue" />
              </div>
              <h3 className="text-xl font-bold text-white">Seasonal Considerations</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="p-4 border border-ocean-blue/30 rounded-lg bg-deeper-background/80">
                <h4 className="font-semibold text-ocean-blue mb-2 text-left flex items-center">
                  <Sun className="h-4 w-4 mr-2 text-[#FFA500]" />
                  Spring Travel (Mar-May)
                </h4>
                <ul className="space-y-2 text-left text-sm ml-6">
                  <li className="font-bold text-white">Variable weather, warming temperatures</li>
                  <li className="font-bold text-white">Watch for thunderstorms and flooding</li>
                  <li className="font-bold text-white">Best for Southern states, desert Southwest</li>
                </ul>
              </div>
              
              <div className="p-4 border border-ocean-blue/30 rounded-lg bg-deeper-background/80">
                <h4 className="font-semibold text-ocean-blue mb-2 text-left flex items-center">
                  <Sun className="h-4 w-4 mr-2 text-[#FF4500]" />
                  Summer Travel (Jun-Aug)
                </h4>
                <ul className="space-y-2 text-left text-sm ml-6">
                  <li className="font-bold text-white">Hot weather, ideal for northern regions</li>
                  <li className="font-bold text-white">Extreme heat in desert regions</li>
                  <li className="font-bold text-white">Best for Mountain states, Pacific Northwest</li>
                </ul>
              </div>
              
              <div className="p-4 border border-ocean-blue/30 rounded-lg bg-deeper-background/80">
                <h4 className="font-semibold text-ocean-blue mb-2 text-left flex items-center">
                  <Leaf className="h-4 w-4 mr-2 text-[#FF8C00]" />
                  Fall Travel (Sep-Nov)
                </h4>
                <ul className="space-y-2 text-left text-sm ml-6">
                  <li className="font-bold text-white">Spectacular foliage, cooler temperatures</li>
                  <li className="font-bold text-white">Variable weather patterns</li>
                  <li className="font-bold text-white">Best for New England, Appalachian region</li>
                </ul>
              </div>
              
              <div className="p-4 border border-ocean-blue/30 rounded-lg bg-deeper-background/80">
                <h4 className="font-semibold text-ocean-blue mb-2 text-left flex items-center">
                  <Snowflake className="h-4 w-4 mr-2 text-[#ADD8E6]" />
                  Winter Travel (Dec-Feb)
                </h4>
                <ul className="space-y-2 text-left text-sm ml-6">
                  <li className="font-bold text-white">Less crowded campgrounds</li>
                  <li className="font-bold text-white">Limited campground availability in North</li>
                  <li className="font-bold text-white">Best for Southwest deserts, Florida, Texas</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Route Planning Tools Section */}
          <div className="bg-dark-background/80 p-6 rounded-lg shadow backdrop-blur-sm">
            <div className="flex items-center mb-6">
              <div className="p-2 bg-ocean-blue/20 rounded-full mr-3">
                <Map className="h-6 w-6 text-ocean-blue" />
              </div>
              <h3 className="text-xl font-bold text-white">Route Planning Tools</h3>
            </div>
            
            <div className="mt-4 space-y-6">
              <div>
                <h4 className="font-semibold text-white mb-3 text-left">Long-Range Forecasts</h4>
                <ul className="space-y-3 text-left ml-4">
                  <li className="flex items-start">
                    <span className="text-ocean-blue mr-2 font-bold">•</span>
                    <span className="font-bold text-white">Climate Prediction Center - 6-10 day, 8-14 day, and monthly outlooks</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-ocean-blue mr-2 font-bold">•</span>
                    <span className="font-bold text-white">AccuWeather Long-Range - Monthly forecasts for planning ahead</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-3 text-left">Historical Weather Data</h4>
                <ul className="space-y-3 text-left ml-4">
                  <li className="flex items-start">
                    <span className="text-ocean-blue mr-2 font-bold">•</span>
                    <span className="font-bold text-white">Weather Underground Historical Data - Past weather patterns</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-ocean-blue mr-2 font-bold">•</span>
                    <span className="font-bold text-white">NOAA Climate Data - Official historical records and averages</span>
                  </li>
                </ul>
              </div>
              
              <div className="mt-6 p-4 border border-ocean-blue/30 rounded-lg bg-deeper-background/80">
                <h4 className="font-semibold text-ocean-blue mb-2 text-left">Weather Impact on RVs</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-2 font-bold text-white">Weather</th>
                        <th className="text-left py-2 font-bold text-white">Impact</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-700">
                        <td className="py-2 pr-4 font-bold text-white">Heat</td>
                        <td className="py-2 font-bold text-white">AC strain, refrigerator issues</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="py-2 pr-4 font-bold text-white">Freezing</td>
                        <td className="py-2 font-bold text-white">Plumbing damage, propane issues</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 font-bold text-white">High Humidity</td>
                        <td className="py-2 font-bold text-white">Mold growth, electrical problems</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlanningSection;
