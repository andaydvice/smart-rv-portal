
import React from "react";
import { CalendarDays, Map } from "lucide-react";

const PlanningSection = () => {
  return (
    <section className="py-16 bg-deeper-background">
      <h2 className="text-3xl md:text-4xl font-bold text-white font-playfair text-center mb-4">
        Planning Your Trip Around Weather
      </h2>
      <div className="w-24 h-1 bg-ocean-blue mx-auto mb-10"></div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-dark-background p-6 rounded-lg shadow">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-ocean-blue/20 rounded-full mr-3">
              <CalendarDays className="h-6 w-6 text-ocean-blue" />
            </div>
            <h3 className="text-xl font-bold text-white">Seasonal Considerations</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="p-4 border border-ocean-blue/30 rounded-lg bg-deeper-background">
              <h4 className="font-semibold text-ocean-blue mb-2">Spring Travel (Mar-May)</h4>
              <ul className="space-y-2 text-light-blue text-sm">
                <li>• Variable weather, warming temperatures</li>
                <li>• Watch for thunderstorms and flooding</li>
                <li>• Best for Southern states, desert Southwest</li>
              </ul>
            </div>
            
            <div className="p-4 border border-ocean-blue/30 rounded-lg bg-deeper-background">
              <h4 className="font-semibold text-ocean-blue mb-2">Summer Travel (Jun-Aug)</h4>
              <ul className="space-y-2 text-light-blue text-sm">
                <li>• Hot weather, ideal for northern regions</li>
                <li>• Extreme heat, consider elevations</li>
                <li>• Best for Mountain states, Pacific Northwest</li>
              </ul>
            </div>
            
            <div className="p-4 border border-ocean-blue/30 rounded-lg bg-deeper-background">
              <h4 className="font-semibold text-ocean-blue mb-2">Fall Travel (Sep-Nov)</h4>
              <ul className="space-y-2 text-light-blue text-sm">
                <li>• Spectacular foliage, cooler temperatures</li>
                <li>• Variable weather patterns, shorter days</li>
                <li>• Best for New England, Appalachian Mountains</li>
              </ul>
            </div>
            
            <div className="p-4 border border-ocean-blue/30 rounded-lg bg-deeper-background">
              <h4 className="font-semibold text-ocean-blue mb-2">Winter Travel (Dec-Feb)</h4>
              <ul className="space-y-2 text-light-blue text-sm">
                <li>• Solitude, unique winter landscapes</li>
                <li>• Limited campground availability</li>
                <li>• Best for Southwest deserts, Florida, Texas</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-dark-background p-6 rounded-lg shadow">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-ocean-blue/20 rounded-full mr-3">
              <Map className="h-6 w-6 text-ocean-blue" />
            </div>
            <h3 className="text-xl font-bold text-white">Route Planning Tools</h3>
          </div>
          
          <div className="mt-6">
            <div className="mb-6">
              <h4 className="font-semibold text-white mb-2">Long-Range Forecasts</h4>
              <ul className="space-y-2 text-light-blue">
                <li className="flex items-start">
                  <span className="text-ocean-blue mr-2">•</span>
                  <span><a href="https://www.cpc.ncep.noaa.gov/" target="_blank" rel="noopener noreferrer" className="text-ocean-blue hover:underline">Climate Prediction Center</a> - 6-10 day, 8-14 day, and monthly outlooks</span>
                </li>
                <li className="flex items-start">
                  <span className="text-ocean-blue mr-2">•</span>
                  <span><a href="https://www.accuweather.com/en/weather-forecasts/month" target="_blank" rel="noopener noreferrer" className="text-ocean-blue hover:underline">AccuWeather Long-Range</a> - Monthly forecasts for planning ahead</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-2">Historical Weather Data</h4>
              <ul className="space-y-2 text-light-blue">
                <li className="flex items-start">
                  <span className="text-ocean-blue mr-2">•</span>
                  <span><a href="https://www.wunderground.com/history" target="_blank" rel="noopener noreferrer" className="text-ocean-blue hover:underline">Weather Underground Historical Data</a> - Past weather patterns for your destinations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-ocean-blue mr-2">•</span>
                  <span><a href="https://www.ncdc.noaa.gov/cdo-web/" target="_blank" rel="noopener noreferrer" className="text-ocean-blue hover:underline">NOAA Climate Data</a> - Official historical records and averages</span>
                </li>
              </ul>
            </div>
            
            <div className="mt-6 p-4 border border-ocean-blue/30 rounded-lg bg-deeper-background">
              <h4 className="font-semibold text-ocean-blue mb-2">Weather Impact on RVs</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="text-left py-2 text-light-blue">Weather</th>
                      <th className="text-left py-2 text-light-blue">Impact</th>
                    </tr>
                  </thead>
                  <tbody className="text-light-blue">
                    <tr>
                      <td className="py-2 pr-4">Heat</td>
                      <td className="py-2">AC strain, refrigerator issues</td>
                    </tr>
                    <tr>
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
    </section>
  );
};

export default PlanningSection;
