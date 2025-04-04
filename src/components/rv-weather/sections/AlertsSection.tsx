
import React from "react";
import { AlertTriangle } from "lucide-react";
import { TypographyH2 } from "@/components/ui/typography";
import WeatherAlertsTable from "../WeatherAlertsTable";

const AlertsSection = () => {
  return (
    <section className="py-6 px-4 rounded-lg bg-white border border-[#e2e8f0] shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <AlertTriangle className="h-7 w-7 text-[#3b82f6]" />
        <TypographyH2 className="border-none text-[#1a202c] text-left">Understanding Weather Alerts</TypographyH2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-yellow-50 rounded-lg border-t-4 border-yellow-400 p-6 shadow-md">
          <h3 className="text-xl font-bold mb-4 flex items-center text-left">
            <span className="text-yellow-500 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </span>
            Watch
          </h3>
          <p className="font-bold mb-2 text-left">What It Means:</p>
          <p className="mb-4 text-left">Conditions are favorable for severe weather</p>
          <p className="font-bold mb-2 text-left">Action:</p>
          <p className="text-left">Stay informed and monitor closely</p>
        </div>
        
        <div className="bg-red-50 rounded-lg border-t-4 border-red-500 p-6 shadow-md">
          <h3 className="text-xl font-bold mb-4 flex items-center text-left">
            <span className="text-red-500 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            Warning
          </h3>
          <p className="font-bold mb-2 text-left">What It Means:</p>
          <p className="mb-4 text-left">Severe weather is imminent or occurring</p>
          <p className="font-bold mb-2 text-left">Action:</p>
          <p className="text-left">Take immediate protective action</p>
        </div>
        
        <div className="bg-blue-50 rounded-lg border-t-4 border-blue-400 p-6 shadow-md">
          <h3 className="text-xl font-bold mb-4 flex items-center text-left">
            <span className="text-blue-500 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            Advisory
          </h3>
          <p className="font-bold mb-2 text-left">What It Means:</p>
          <p className="mb-4 text-left">Less dangerous hazardous conditions</p>
          <p className="font-bold mb-2 text-left">Action:</p>
          <p className="text-left">Use caution, possibly adjust travel plans</p>
        </div>
      </div>
      
      <WeatherAlertsTable />
    </section>
  );
};

export default AlertsSection;
