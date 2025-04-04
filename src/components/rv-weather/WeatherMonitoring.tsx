
import React from "react";
import { Smartphone } from "lucide-react";

const WeatherMonitoring = () => {
  return (
    <section className="py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-white font-playfair text-center mb-4">
        Real-Time Weather Monitoring
      </h2>
      <div className="w-24 h-1 bg-ocean-blue mx-auto mb-10"></div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-dark-background p-6 rounded-lg shadow">
          <div className="flex items-center mb-6">
            <div className="p-2 bg-ocean-blue/20 rounded-full mr-3">
              <Smartphone className="h-6 w-6 text-ocean-blue" />
            </div>
            <h3 className="text-xl font-bold text-white">Essential Weather Apps</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-ocean-blue mb-3">Comprehensive Apps</h4>
              <ul className="space-y-4 text-light-blue">
                <li className="flex items-center">
                  <div className="bg-ocean-blue/20 p-2 rounded-full mr-3 flex-shrink-0">
                    <svg className="h-4 w-4 text-ocean-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 001.7-.3 4 4 0 10-7.4-6 6 6 0 00-6.3 2.3 4 4 0 004 6 4 4 0 002-.3" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium block">AccuWeather</span>
                    <span className="text-sm">15-day forecast plus radar</span>
                  </div>
                </li>
                <li className="flex items-center">
                  <div className="bg-ocean-blue/20 p-2 rounded-full mr-3 flex-shrink-0">
                    <svg className="h-4 w-4 text-ocean-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 001.7-.3 1 1 0 00.3-.1 4 4 0 10-7.4-6 6 6 0 00-6.3 2.3 4 4 0 004 6 4 4 0 002-.3" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium block">Weather Underground</span>
                    <span className="text-sm">Detailed local forecasts</span>
                  </div>
                </li>
                <li className="flex items-center">
                  <div className="bg-ocean-blue/20 p-2 rounded-full mr-3 flex-shrink-0">
                    <svg className="h-4 w-4 text-ocean-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium block">The Weather Channel</span>
                    <span className="text-sm">Live interactive radar</span>
                  </div>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-ocean-blue mb-3">RV-Specific Tools</h4>
              <ul className="space-y-4 text-light-blue">
                <li className="flex items-center">
                  <div className="bg-ocean-blue/20 p-2 rounded-full mr-3 flex-shrink-0">
                    <svg className="h-4 w-4 text-ocean-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium block">RV Weather</span>
                    <span className="text-sm">Route-specific forecasts</span>
                  </div>
                </li>
                <li className="flex items-center">
                  <div className="bg-ocean-blue/20 p-2 rounded-full mr-3 flex-shrink-0">
                    <svg className="h-4 w-4 text-ocean-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium block">Wind Alerts</span>
                    <span className="text-sm">RV-specific wind warnings</span>
                  </div>
                </li>
                <li className="flex items-center">
                  <div className="bg-ocean-blue/20 p-2 rounded-full mr-3 flex-shrink-0">
                    <svg className="h-4 w-4 text-ocean-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium block">Weather Radio</span>
                    <span className="text-sm">NOAA weather radio alerts</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-dark-background p-6 rounded-lg shadow">
          <div className="border-l-4 border-ocean-blue bg-deeper-background p-6 rounded-r-lg">
            <h3 className="text-xl font-bold text-white mb-4">Weather Monitoring Tips</h3>
            
            <ul className="space-y-4 text-light-blue">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-ocean-blue mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Check forecasts at least twice daily during travel</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-ocean-blue mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Enable weather alerts for your current and upcoming locations</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-ocean-blue mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Use multiple sources to confirm severe weather forecasts</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-ocean-blue mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Keep a battery-powered NOAA weather radio as backup</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-ocean-blue mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Learn to interpret radar and satellite imagery</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeatherMonitoring;
