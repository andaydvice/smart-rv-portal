
import React from "react";
import { AlertTriangle } from "lucide-react";
import { TypographyH2 } from "@/components/ui/typography";

const AlertsSection = () => {
  return (
    <section className="py-6 px-4 rounded-lg bg-gradient-to-b from-[#131a2a]/50 to-[#080F1F]/50 border border-[#1a202c]/40 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-6">
        <AlertTriangle className="h-7 w-7 text-[#5B9BD5]" />
        <TypographyH2 className="border-none text-white">Understanding Weather Alerts</TypographyH2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-[#151A22]/80 rounded-lg border-t-4 border-yellow-400 p-6 shadow-md">
          <h3 className="text-xl font-bold mb-4 flex items-center text-white text-left">
            <span className="text-yellow-500 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </span>
            Watch
          </h3>
          <p className="font-bold mb-2 text-left text-light-blue">What It Means:</p>
          <p className="mb-4 text-left text-light-blue">Conditions are favorable for severe weather</p>
          <p className="font-bold mb-2 text-left text-light-blue">Action:</p>
          <p className="text-left text-light-blue">Stay informed and monitor closely</p>
        </div>
        
        <div className="bg-[#151A22]/80 rounded-lg border-t-4 border-red-500 p-6 shadow-md">
          <h3 className="text-xl font-bold mb-4 flex items-center text-white text-left">
            <span className="text-red-500 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            Warning
          </h3>
          <p className="font-bold mb-2 text-left text-light-blue">What It Means:</p>
          <p className="mb-4 text-left text-light-blue">Severe weather is imminent or occurring</p>
          <p className="font-bold mb-2 text-left text-light-blue">Action:</p>
          <p className="text-left text-light-blue">Take immediate protective action</p>
        </div>
        
        <div className="bg-[#151A22]/80 rounded-lg border-t-4 border-blue-400 p-6 shadow-md">
          <h3 className="text-xl font-bold mb-4 flex items-center text-white text-left">
            <span className="text-blue-500 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            Advisory
          </h3>
          <p className="font-bold mb-2 text-left text-light-blue">What It Means:</p>
          <p className="mb-4 text-left text-light-blue">Less dangerous hazardous conditions</p>
          <p className="font-bold mb-2 text-left text-light-blue">Action:</p>
          <p className="text-left text-light-blue">Use caution, possibly adjust travel plans</p>
        </div>
      </div>
      
      <div className="overflow-x-auto mt-8 border border-[#1a202c] rounded-lg bg-[#151A22]/80">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-[#131a2a]">
            <tr>
              <th className="p-4 text-left border-b border-[#1a202c] text-light-blue">Alert Type</th>
              <th className="p-4 text-left border-b border-[#1a202c] text-light-blue">What It Means</th>
              <th className="p-4 text-left border-b border-[#1a202c] text-light-blue">RV Response</th>
            </tr>
          </thead>
          <tbody className="text-light-blue">
            <tr className="border-b border-[#1a202c]">
              <td className="p-4 font-semibold text-[#5B9BD5]">Watch</td>
              <td className="p-4">Conditions are favorable for severe weather</td>
              <td className="p-4">Monitor closely, prepare for possible relocation</td>
            </tr>
            <tr className="border-b border-[#1a202c]">
              <td className="p-4 font-semibold text-[#5B9BD5]">Warning</td>
              <td className="p-4">Severe weather is imminent or occurring</td>
              <td className="p-4">Take immediate protective action</td>
            </tr>
            <tr>
              <td className="p-4 font-semibold text-[#5B9BD5]">Advisory</td>
              <td className="p-4">Less severe but potentially hazardous conditions</td>
              <td className="p-4">Use caution, possibly adjust travel plans</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AlertsSection;
