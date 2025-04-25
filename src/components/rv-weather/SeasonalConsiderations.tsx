
import React from "react";
import { Sun, Cloud, CloudSnow, Leaf } from "lucide-react";

const SeasonalConsiderations = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-[#151A22] p-6 rounded-lg border border-[#1a202c]/40 shadow-lg">
        <div className="flex items-center mb-4">
          <div className="p-3 bg-yellow-400/20 rounded-full mr-4">
            <Sun className="h-6 w-6 text-yellow-400" />
          </div>
          <h3 className="text-xl font-bold text-white">Summer Preparation</h3>
        </div>
        
        <img 
          src="/lovable-uploads/ae930cf7-205f-41d3-9c9b-a4969e5c35e6.png" 
          alt="RV parked at a summer campsite" 
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        
        <ul className="space-y-2 text-light-blue">
          <li className="flex items-start">
            <span className="text-[#5B9BD5] mr-2">•</span>
            <span>Keep your RV cool by parking in shade when possible</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#5B9BD5] mr-2">•</span>
            <span>Use reflective window covers to reduce heat gain</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#5B9BD5] mr-2">•</span>
            <span>Check tire pressure frequently (heat increases pressure)</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#5B9BD5] mr-2">•</span>
            <span>Test air conditioning before summer trips begin</span>
          </li>
        </ul>
      </div>
      
      <div className="bg-[#151A22] p-6 rounded-lg border border-[#1a202c]/40 shadow-lg">
        <div className="flex items-center mb-4">
          <div className="p-3 bg-blue-400/20 rounded-full mr-4">
            <CloudSnow className="h-6 w-6 text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-white">Winter Considerations</h3>
        </div>
        
        <img 
          src="/lovable-uploads/9cb71164-7823-47a1-b788-5afc310ad5e5.png" 
          alt="RV in snowy winter conditions" 
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        
        <ul className="space-y-2 text-light-blue">
          <li className="flex items-start">
            <span className="text-[#5B9BD5] mr-2">•</span>
            <span>Insulate water lines and tanks to prevent freezing</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#5B9BD5] mr-2">•</span>
            <span>Use RV-specific antifreeze in plumbing systems</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#5B9BD5] mr-2">•</span>
            <span>Install thermal curtains for better insulation</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#5B9BD5] mr-2">•</span>
            <span>Keep propane tanks filled to at least 30%</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SeasonalConsiderations;
