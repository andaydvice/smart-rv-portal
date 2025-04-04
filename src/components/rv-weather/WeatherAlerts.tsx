
import React from "react";
import { AlertTriangle, Bell, Radio } from "lucide-react";

const WeatherAlerts = () => {
  return (
    <section className="py-16 bg-deeper-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white font-playfair text-center mb-4">
          Understanding Weather Alerts
        </h2>
        <div className="w-24 h-1 bg-ocean-blue mx-auto mb-12"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-dark-background p-6 rounded-lg shadow">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-red-500/20 rounded-full">
                <AlertTriangle className="h-5 w-5 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-white ml-3 text-left">Warning</h3>
            </div>
            <p className="text-light-blue mb-4 text-left">
              Severe weather is occurring or imminent. Take immediate action to protect yourself and your RV.
            </p>
            <ul className="space-y-2 text-light-blue text-left text-sm">
              <li>• Tornado Warning</li>
              <li>• Flash Flood Warning</li>
              <li>• Severe Thunderstorm Warning</li>
            </ul>
          </div>
          
          <div className="bg-dark-background p-6 rounded-lg shadow">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-yellow-500/20 rounded-full">
                <Bell className="h-5 w-5 text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold text-white ml-3 text-left">Watch</h3>
            </div>
            <p className="text-light-blue mb-4 text-left">
              Conditions are favorable for severe weather. Stay alert and be prepared to act if warnings are issued.
            </p>
            <ul className="space-y-2 text-light-blue text-left text-sm">
              <li>• Tornado Watch</li>
              <li>• Flood Watch</li>
              <li>• Severe Thunderstorm Watch</li>
            </ul>
          </div>
          
          <div className="bg-dark-background p-6 rounded-lg shadow">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-500/20 rounded-full">
                <Radio className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-white ml-3 text-left">Advisory</h3>
            </div>
            <p className="text-light-blue mb-4 text-left">
              Weather conditions that are less serious but may cause significant inconvenience or hazards.
            </p>
            <ul className="space-y-2 text-light-blue text-left text-sm">
              <li>• Wind Advisory</li>
              <li>• Winter Weather Advisory</li>
              <li>• Heat Advisory</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 bg-dark-background p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold text-white mb-6 text-left">Alert Response Actions</h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-light-blue font-semibold">Alert Type</th>
                  <th className="text-left py-3 px-4 text-light-blue font-semibold">Recommended Action</th>
                </tr>
              </thead>
              <tbody className="text-light-blue">
                <tr className="border-b border-gray-700">
                  <td className="py-3 px-4 font-medium text-red-400">Tornado Warning</td>
                  <td className="py-3 px-4 text-left">Seek immediate shelter in a sturdy building, away from windows. If no building is available, lie flat in a ditch or low-lying area.</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-3 px-4 font-medium text-red-400">Flash Flood Warning</td>
                  <td className="py-3 px-4 text-left">Move to higher ground immediately. Never drive through flooded roads.</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-3 px-4 font-medium text-yellow-400">High Wind Advisory</td>
                  <td className="py-3 px-4 text-left">Secure loose items around your RV. Consider retracting awnings and slide-outs. Park vehicle with front facing into the wind if possible.</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-ocean-blue">Heat Advisory</td>
                  <td className="py-3 px-4 text-left">Ensure AC is functioning properly. Use reflective window coverings. Stay hydrated and limit outdoor activities.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeatherAlerts;
