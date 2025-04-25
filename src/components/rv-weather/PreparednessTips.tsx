
import React from "react";
import { CheckSquare, Compass, Battery, Radio } from "lucide-react";
const PreparednessTips = () => {
  return <section className="py-16 bg-deeper-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white font-playfair text-center mb-4">
          Weather Hazards in the RVers
        </h2>
        <div className="w-24 h-1 bg-ocean-blue mx-auto mb-12"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-dark-background p-6 rounded-lg shadow flex flex-col h-full">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-red-500/20 rounded-full">
                <CheckSquare className="h-5 w-5 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-white ml-3">Before a Trip</h3>
            </div>
            <ul className="space-y-3 text-light-blue flex-grow text-left pl-5 list-disc">
              <li className="text-left">
                <span>Research typical weather patterns for your destination</span>
              </li>
              <li className="text-left">
                <span>Create an emergency contact list</span>
              </li>
              <li className="text-left">
                <span>Download offline maps and weather apps</span>
              </li>
              <li className="text-left">
                <span>Check that all weather related equipment is functioning</span>
              </li>
              <li className="text-left">
                <span>Plan alternate routes in case of weather disruptions</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-dark-background p-6 rounded-lg shadow flex flex-col h-full">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-yellow-500/20 rounded-full">
                <Compass className="h-5 w-5 text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold text-white ml-3">On the Road</h3>
            </div>
            <ul className="space-y-3 text-light-blue flex-grow text-left pl-5 list-disc">
              <li className="text-left">
                <span>Check weather forecasts every morning</span>
              </li>
              <li className="text-left">
                <span>Have a designated weather radio or alert system</span>
              </li>
              <li className="text-left">
                <span>Know locations of severe weather shelters along your route</span>
              </li>
              <li className="text-left">
                <span>Keep fuel tank at least half full</span>
              </li>
              <li className="text-left">
                <span>Have emergency supplies easily accessible</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-dark-background p-6 rounded-lg shadow flex flex-col h-full">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-green-500/20 rounded-full">
                <Battery className="h-5 w-5 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-white ml-3">Emergency Kit</h3>
            </div>
            <ul className="space-y-3 text-light-blue flex-grow text-left pl-5 list-disc">
              <li className="text-left">
                <span>Battery powered or hand crank NOAA weather radio</span>
              </li>
              <li className="text-left">
                <span>Portable power bank for devices</span>
              </li>
              <li className="text-left">
                <span>Flashlights and extra batteries</span>
              </li>
              <li className="text-left">
                <span>First aid kit with emergency blankets</span>
              </li>
              <li className="text-left">
                <span>3 day supply of water and non perishable food</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>;
};
export default PreparednessTips;
