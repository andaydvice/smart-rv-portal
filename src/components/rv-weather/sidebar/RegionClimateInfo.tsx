
import React from "react";
import { Map } from "lucide-react";

const RegionClimateInfo = () => {
  return (
    <div className="p-6 rounded-lg bg-white border border-[#e2e8f0] shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Map className="h-5 w-5 text-[#3b82f6]" />
        <h3 className="font-bold text-lg text-[#1a202c] text-left">Regional Climate Highlights</h3>
      </div>
      
      <div className="space-y-4">
        <div className="rounded-lg overflow-hidden shadow-sm border border-[#e2e8f0]">
          <div className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 relative right-0">Hot & Dry</div>
          <div className="p-4">
            <h4 className="font-semibold text-[#1a202c] text-left">Southwest</h4>
            <p className="text-sm text-[#4a5568] text-left mt-2">Hot, dry summers with monsoon season (July-Sept). Mild winters in lower elevations, snow at higher altitudes.</p>
          </div>
        </div>
        
        <div className="rounded-lg overflow-hidden shadow-sm border border-[#e2e8f0]">
          <div className="bg-blue-500 text-white text-xs font-bold px-2 py-1 relative right-0">Wet & Mild</div>
          <div className="p-4">
            <h4 className="font-semibold text-[#1a202c] text-left">Pacific Northwest</h4>
            <p className="text-sm text-[#4a5568] text-left mt-2">Mild, wet winters and dry summers. Significant precipitation along the coast, less inland.</p>
          </div>
        </div>
        
        <div className="rounded-lg overflow-hidden shadow-sm border border-[#e2e8f0]">
          <div className="bg-green-500 text-white text-xs font-bold px-2 py-1 relative right-0">Four Seasons</div>
          <div className="p-4">
            <h4 className="font-semibold text-[#1a202c] text-left">Northeast</h4>
            <p className="text-sm text-[#4a5568] text-left mt-2">Four distinct seasons with cold, snowy winters and warm, humid summers. Fall foliage is spectacular.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegionClimateInfo;
