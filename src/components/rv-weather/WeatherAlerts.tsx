
import React from "react";
import { AlertTriangle, Info } from "lucide-react";

const WeatherAlerts = () => {
  return (
    <section className="py-16 bg-deeper-background">
      <h2 className="text-3xl md:text-4xl font-bold text-white font-playfair text-center mb-4">
        Understanding Weather Alerts
      </h2>
      <div className="w-24 h-1 bg-ocean-blue mx-auto mb-10"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-yellow-900/20 rounded-lg border-t-4 border-yellow-500 p-6 shadow">
          <div className="flex items-center mb-4">
            <AlertTriangle className="text-yellow-500 h-6 w-6 mr-2" />
            <h3 className="text-xl font-bold text-white">Watch</h3>
          </div>
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-light-blue">What It Means:</p>
              <p className="text-light-blue">Conditions are favorable for severe weather</p>
            </div>
            <div>
              <p className="font-semibold text-light-blue">Action:</p>
              <p className="text-light-blue">Stay informed, prepare for possible action</p>
            </div>
          </div>
        </div>
        
        <div className="bg-red-900/20 rounded-lg border-t-4 border-red-500 p-6 shadow">
          <div className="flex items-center mb-4">
            <AlertTriangle className="text-red-500 h-6 w-6 mr-2" />
            <h3 className="text-xl font-bold text-white">Warning</h3>
          </div>
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-light-blue">What It Means:</p>
              <p className="text-light-blue">Severe weather is imminent or occurring</p>
            </div>
            <div>
              <p className="font-semibold text-light-blue">Action:</p>
              <p className="text-light-blue">Take immediate protective action</p>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-900/20 rounded-lg border-t-4 border-ocean-blue p-6 shadow">
          <div className="flex items-center mb-4">
            <Info className="text-ocean-blue h-6 w-6 mr-2" />
            <h3 className="text-xl font-bold text-white">Advisory</h3>
          </div>
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-light-blue">What It Means:</p>
              <p className="text-light-blue">Less dangerous but still hazardous conditions</p>
            </div>
            <div>
              <p className="font-semibold text-light-blue">Action:</p>
              <p className="text-light-blue">Use caution, possibly adjust travel plans</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-dark-background p-6 rounded-lg shadow">
        <h3 className="text-xl font-bold text-white mb-6">Weather Hazards for RVers</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-light-blue font-semibold">Alert Type</th>
                <th className="text-left py-3 px-4 text-light-blue font-semibold">What It Means</th>
                <th className="text-left py-3 px-4 text-light-blue font-semibold">RV Response</th>
              </tr>
            </thead>
            <tbody className="text-light-blue">
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4 font-medium text-ocean-blue">High Wind Warning</td>
                <td className="py-3 px-4">Sustained winds of 40+ mph or gusts of 58+ mph</td>
                <td className="py-3 px-4">Park with front facing into wind, retract slides and awnings</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4 font-medium text-ocean-blue">Flash Flood Warning</td>
                <td className="py-3 px-4">Rapid flooding is imminent or occurring</td>
                <td className="py-3 px-4">Move to higher ground immediately, avoid dry washes</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4 font-medium text-ocean-blue">Severe Thunderstorm</td>
                <td className="py-3 px-4">Winds 58+ mph and/or 1"+ hail</td>
                <td className="py-3 px-4">Seek sturdy shelter, avoid parking under trees</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-ocean-blue">Winter Storm Warning</td>
                <td className="py-3 px-4">Heavy snow, sleet, ice accumulations</td>
                <td className="py-3 px-4">Delay travel or find secure, serviced campground</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default WeatherAlerts;
