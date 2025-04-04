
import React from "react";
import { TypographyH2, TypographyH4 } from "@/components/ui/typography";
import { Smartphone } from "lucide-react";

const MonitoringSection = () => {
  return (
    <section className="py-6 px-4 rounded-lg bg-white border border-[#e2e8f0] shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Smartphone className="h-7 w-7 text-[#3b82f6]" />
        <TypographyH2 className="border-none text-[#1a202c] text-left text-3xl">Real-Time Weather Monitoring</TypographyH2>
      </div>
      
      <div className="space-y-6">
        <div>
          <TypographyH4 className="text-[#1a202c] text-left mb-4">Essential Weather Apps</TypographyH4>
          <div className="grid gap-4 mt-4 md:grid-cols-2">
            <div className="p-6 rounded-lg border border-[#e2e8f0] bg-white shadow-sm">
              <h5 className="font-semibold text-[#3b82f6] text-left mb-4">Comprehensive Weather Apps</h5>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <span className="bg-blue-100 p-2 rounded-full mr-4 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#3b82f6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 001.7-.3 4 4 0 10-7.4-6 6 6 0 00-6.3 2.3 4 4 0 004 6 4 4 0 002-.3" />
                    </svg>
                  </span>
                  <div className="text-left">
                    <span className="font-bold">AccuWeather</span> - 15-day forecast plus radar
                  </div>
                </li>
                <li className="flex items-center">
                  <span className="bg-blue-100 p-2 rounded-full mr-4 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#3b82f6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 001.7-.3 1 1 0 00.3-.1 4 4 0 10-7.4-6 6 6 0 00-6.3 2.3 4 4 0 004 6 4 4 0 002-.3" />
                    </svg>
                  </span>
                  <div className="text-left">
                    <span className="font-bold">Weather Underground</span> - Detailed forecasts with PWS network
                  </div>
                </li>
                <li className="flex items-center">
                  <span className="bg-blue-100 p-2 rounded-full mr-4 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#3b82f6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <div className="text-left">
                    <span className="font-bold">The Weather Channel</span> - Live interactive radar
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="p-6 rounded-lg border border-[#e2e8f0] bg-white shadow-sm">
              <h5 className="font-semibold text-[#3b82f6] text-left mb-4">RV-Specific Weather Tools</h5>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <span className="bg-blue-100 p-2 rounded-full mr-4 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#3b82f6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </span>
                  <div className="text-left">
                    <span className="font-bold">RV Weather</span> - Weather for routes specifically
                  </div>
                </li>
                <li className="flex items-center">
                  <span className="bg-blue-100 p-2 rounded-full mr-4 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#3b82f6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  <div className="text-left">
                    <span className="font-bold">Wind Alerts</span> - Warnings for wind/driving conditions
                  </div>
                </li>
                <li className="flex items-center">
                  <span className="bg-blue-100 p-2 rounded-full mr-4 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#3b82f6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </span>
                  <div className="text-left">
                    <span className="font-bold">Weather Radio</span> - NOAA weather radio alerts
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500 mt-8">
          <h4 className="text-xl font-bold mb-4 text-left">RV Weather Module</h4>
          <ul className="space-y-3">
            <li className="flex items-start">
              <svg className="h-6 w-6 text-[#3b82f6] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-left">Free weather forecasting tools specifically for RV owners</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-[#3b82f6] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-left">Alerts about potential path of storms in advance of trip planning</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-[#3b82f6] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-left">Customized weather alerts for your exact GPS coordinates</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default MonitoringSection;
