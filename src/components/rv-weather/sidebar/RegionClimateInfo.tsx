
import React from "react";
import { Map } from "lucide-react";

const RegionClimateInfo = () => {
  return (
    <div className="p-6 rounded-lg bg-gradient-to-b from-connectivity-darkBg to-[#131a2a] border border-[#1a202c]">
      <div className="flex items-center gap-2 mb-4">
        <Map className="h-5 w-5 text-connectivity-accent" />
        <h3 className="font-bold text-lg text-white text-left">Regional Climate Highlights</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-sm text-[#5B9BD5] text-left">Southwest</h4>
          <p className="text-sm text-light-blue text-left">Hot, dry summers with monsoon season (July-Sept). Mild winters in lower elevations, snow at higher altitudes.</p>
        </div>
        
        <div>
          <h4 className="font-semibold text-sm text-[#5B9BD5] text-left">Pacific Northwest</h4>
          <p className="text-sm text-light-blue text-left">Mild, wet winters and dry summers. Significant precipitation along the coast, less inland.</p>
        </div>
        
        <div>
          <h4 className="font-semibold text-sm text-[#5B9BD5] text-left">Northeast</h4>
          <p className="text-sm text-light-blue text-left">Four distinct seasons with cold, snowy winters and warm, humid summers. Fall foliage is spectacular.</p>
        </div>
      </div>
    </div>
  );
};

export default RegionClimateInfo;
