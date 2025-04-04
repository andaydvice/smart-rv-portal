
import React from "react";
import { CalendarDays, Map } from "lucide-react";

const PlanningSection = () => {
  return (
    <section className="relative w-full py-16 bg-cover bg-center" style={{ backgroundImage: "url('/lovable-uploads/ad3dc693-42f4-4635-af2d-b2c4b1aafc43.png')" }}>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white font-playfair text-center mb-4">
          Planning Your Trip Around Weather
        </h2>
        <div className="w-24 h-1 bg-ocean-blue mx-auto mb-10"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-dark-background/80 p-6 rounded-lg shadow backdrop-blur-sm">
            <div className="flex items-center mb-6">
              <div className="p-2 bg-ocean-blue/20 rounded-full mr-3">
                <CalendarDays className="h-6 w-6 text-ocean-blue" />
              </div>
              <h3 className="text-xl font-bold text-white">Seasonal Considerations</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="p-4 border border-ocean-blue/30 rounded-lg bg-deeper-background/80">
                <h4 className="font-semibold text-ocean-blue mb-2 text-left">Spring Travel (Mar-May)</h4>
                <ul className="space-y-2 text-light-blue text-left text-sm">
                  <li>• Variable weather, warming temperatures</li>
                  <li>• Watch for thunderstorms and flooding</li>
                  <li>• Best for Southern states, desert Southwest</li>
                </ul>
              </div>
              
              <div className="p-4 border border-ocean-blue/30 rounded-lg bg-deeper-background/80">
                <h4 className="font-semibold text-ocean-blue mb-2 text-left">Summer Travel (Jun-Aug)</h4>
                <ul className="space-y-2 text-light-blue text-left text-sm">
                  <li>• Hot weather, ideal for northern regions</li>
                  <li>• Extreme heat in desert regions</li>
                  <li>• Best for Mountain states, Pacific Northwest</li>
                </ul>
              </div>
              
              <div className="p-4 border border-ocean-blue/30 rounded-lg bg-deeper-background/80">
                <h4 className="font-semibold text-ocean-blue mb-2 text-left">Fall Travel (Sep-Nov)</h4>
                <ul className="space-y-2 text-light-blue text-left text-sm">
                  <li>• Spectacular foliage, cooler temperatures</li>
                  <li>• Variable weather patterns</li>
                  <li>• Best for New England, Appalachian region</li>
                </ul>
              </div>
              
              <div className="p-4 border border-ocean-blue/30 rounded-lg bg-deeper-background/80">
                <h4 className="font-semibold text-ocean-blue mb-2 text-left">Winter Travel (Dec-Feb)</h4>
                <ul className="space-y-2 text-light-blue text-left text-sm">
                  <li>• Less crowded campgrounds</li>
                  <li>• Limited campground availability in North</li>
                  <li>• Best for Southwest deserts, Florida, Texas</li>
                </ul>
              </div>
            </div>
          </div>
          
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
                <ul className="space-y-3 text-light-blue text-left">
                  <li className="flex items-start">
                    <span className="text-ocean-blue mr-2">•</span>
                    <span>Climate Prediction Center - 6-10 day, 8-14 day, and monthly outlooks</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-ocean-blue mr-2">•</span>
                    <span>AccuWeather Long-Range - Monthly forecasts for planning ahead</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-3 text-left">Historical Weather Data</h4>
                <ul className="space-y-3 text-light-blue text-left">
                  <li className="flex items-start">
                    <span className="text-ocean-blue mr-2">•</span>
                    <span>Weather Underground Historical Data - Past weather patterns</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-ocean-blue mr-2">•</span>
                    <span>NOAA Climate Data - Official historical records and averages</span>
                  </li>
                </ul>
              </div>
              
              <div className="mt-6 p-4 border border-ocean-blue/30 rounded-lg bg-deeper-background/80">
                <h4 className="font-semibold text-ocean-blue mb-2 text-left">Weather Impact on RVs</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-2 text-light-blue">Weather</th>
                        <th className="text-left py-2 text-light-blue">Impact</th>
                      </tr>
                    </thead>
                    <tbody className="text-light-blue">
                      <tr className="border-b border-gray-700">
                        <td className="py-2 pr-4">Heat</td>
                        <td className="py-2">AC strain, refrigerator issues</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="py-2 pr-4">Freezing</td>
                        <td className="py-2">Plumbing damage, propane issues</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4">High Humidity</td>
                        <td className="py-2">Mold growth, electrical problems</td>
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
