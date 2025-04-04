
import React from "react";
import { Monitor, Download, Smartphone, Wifi } from "lucide-react";

const WeatherMonitoring = () => {
  return (
    <section className="py-16 bg-deeper-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white font-playfair text-center mb-4">
          Real-time Weather Monitoring
        </h2>
        <div className="w-24 h-1 bg-ocean-blue mx-auto mb-12"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-dark-background p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold text-white mb-6 text-left">Essential Weather Apps</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="p-2 bg-ocean-blue/20 rounded-full">
                  <Smartphone className="h-5 w-5 text-ocean-blue" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-white mb-1 text-left">NOAA Weather</h4>
                  <p className="text-light-blue text-left text-sm">
                    Official government forecasts. Most reliable for severe weather warnings and radar imagery.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="p-2 bg-ocean-blue/20 rounded-full">
                  <Wifi className="h-5 w-5 text-ocean-blue" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-white mb-1 text-left">Weather Underground</h4>
                  <p className="text-light-blue text-left text-sm">
                    Hyperlocal forecasts with crowdsourced data from personal weather stations.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="p-2 bg-ocean-blue/20 rounded-full">
                  <Download className="h-5 w-5 text-ocean-blue" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-white mb-1 text-left">Windy</h4>
                  <p className="text-light-blue text-left text-sm">
                    Interactive wind, precipitation, and temperature maps. Excellent for visualizing weather patterns.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-dark-background p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold text-white mb-6 text-left">Weather Station Tools</h3>
            
            <ul className="space-y-3 text-light-blue">
              <li className="flex items-start">
                <div className="min-w-3 h-3 mt-1.5 rounded-full bg-ocean-blue flex-shrink-0"></div>
                <span className="ml-2 text-left">Portable weather stations with smartphone integration</span>
              </li>
              <li className="flex items-start">
                <div className="min-w-3 h-3 mt-1.5 rounded-full bg-ocean-blue flex-shrink-0"></div>
                <span className="ml-2 text-left">NOAA Weather Radio for emergency alerts</span>
              </li>
              <li className="flex items-start">
                <div className="min-w-3 h-3 mt-1.5 rounded-full bg-ocean-blue flex-shrink-0"></div>
                <span className="ml-2 text-left">Lightning detectors for thunderstorm warnings</span>
              </li>
              <li className="flex items-start">
                <div className="min-w-3 h-3 mt-1.5 rounded-full bg-ocean-blue flex-shrink-0"></div>
                <span className="ml-2 text-left">Wind speed meters for RV safety thresholds</span>
              </li>
            </ul>
            
            <div className="mt-8 p-4 bg-deeper-background border border-ocean-blue/30 rounded-lg">
              <h4 className="font-semibold text-ocean-blue mb-3 text-left">Weather Monitoring Tips</h4>
              <ul className="space-y-2 text-light-blue">
                <li className="flex items-start">
                  <span className="text-ocean-blue mr-2">•</span>
                  <span className="text-left">Check forecasts at least twice daily when traveling</span>
                </li>
                <li className="flex items-start">
                  <span className="text-ocean-blue mr-2">•</span>
                  <span className="text-left">Download offline weather maps before remote travel</span>
                </li>
                <li className="flex items-start">
                  <span className="text-ocean-blue mr-2">•</span>
                  <span className="text-left">Set up weather alerts for your specific location</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeatherMonitoring;
