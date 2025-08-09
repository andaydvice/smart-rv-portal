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
          alt="Smart RV parked at a summer campsite" 
          className="w-full h-52 object-cover rounded-lg mb-4"
          loading="eager"
          fetchPriority="high"
        />
        
        <ul className="space-y-2 text-light-blue">
          <li className="flex items-start">
            <span className="text-[#5B9BD5] mr-2">•</span>
            <span>Keep your Smart RV cool by parking in shade when possible</span>
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
          src="/lovable-uploads/dee06c09-15b9-404e-a583-836e4a06d9d1.png" 
          alt="Smart RVs parked at sunset with dramatic winter sky" 
          className="w-full h-52 object-cover rounded-lg mb-4"
          loading="eager"
          fetchPriority="high"
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

      <div className="bg-[#151A22] p-6 rounded-lg border border-[#1a202c]/40 shadow-lg">
        <div className="flex items-center mb-4">
          <div className="p-3 bg-orange-500/20 rounded-full mr-4">
            <Leaf className="h-6 w-6 text-orange-500" />
          </div>
          <h3 className="text-xl font-bold text-white">Fall Planning</h3>
        </div>
        
        <img 
          src="/lovable-uploads/3175b015-a5c7-4df7-b8ca-b8a130b05519.png" 
          alt="Smart RV parked among fall foliage" 
          className="w-full h-52 object-cover rounded-lg mb-4"
          loading="eager"
          fetchPriority="high"
        />
        
        <ul className="space-y-2 text-light-blue">
          <li className="flex items-start">
            <span className="text-[#5B9BD5] mr-2">•</span>
            <span>Prepare for early frost and temperature fluctuations</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#5B9BD5] mr-2">•</span>
            <span>Watch for slippery conditions from fallen leaves</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#5B9BD5] mr-2">•</span>
            <span>Check heating systems before colder weather arrives</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#5B9BD5] mr-2">•</span>
            <span>Monitor weather forecasts for changing conditions</span>
          </li>
        </ul>
      </div>
      
      <div className="bg-[#151A22] p-6 rounded-lg border border-[#1a202c]/40 shadow-lg">
        <div className="flex items-center mb-4">
          <div className="p-3 bg-green-400/20 rounded-full mr-4">
            <Cloud className="h-6 w-6 text-green-400" />
          </div>
          <h3 className="text-xl font-bold text-white">Spring Travel</h3>
        </div>
        
        <img 
          src="/lovable-uploads/989028bc-89ec-4ec4-841d-e38421cc7626.png" 
          alt="Smart RV in spring scenery with blooming flowers" 
          className="w-full h-52 object-cover rounded-lg mb-4"
          loading="eager"
          fetchPriority="high"
        />
        
        <ul className="space-y-2 text-light-blue">
          <li className="flex items-start">
            <span className="text-[#5B9BD5] mr-2">•</span>
            <span>Be prepared for sudden rain and flash flooding</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#5B9BD5] mr-2">•</span>
            <span>Check roof seals after winter expansion/contraction</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#5B9BD5] mr-2">•</span>
            <span>Monitor weather alerts for thunderstorms and tornadoes</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#5B9BD5] mr-2">•</span>
            <span>Ensure drainage systems are clear of winter debris</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SeasonalConsiderations;
