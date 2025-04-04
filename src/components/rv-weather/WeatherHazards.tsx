
import React from "react";
import { Wind, CloudLightning, CloudDrizzle, Thermometer, Snowflake } from "lucide-react";

const WeatherHazards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-[#080F1F] rounded-lg p-5 border border-[#5B9BD5]/20">
        <div className="flex items-center mb-3">
          <Wind className="h-5 w-5 text-[#5B9BD5] mr-2" />
          <h4 className="font-bold text-white">High Winds</h4>
        </div>
        <ul className="space-y-2">
          <li className="flex items-start">
            <div className="min-w-3 h-3 mt-1.5 rounded-full bg-[#5B9BD5] flex-shrink-0"></div>
            <span className="ml-2 text-sm text-[#E2E8FF]">Park with front facing into wind</span>
          </li>
          <li className="flex items-start">
            <div className="min-w-3 h-3 mt-1.5 rounded-full bg-[#5B9BD5] flex-shrink-0"></div>
            <span className="ml-2 text-sm text-[#E2E8FF]">Retract awnings and slides</span>
          </li>
          <li className="flex items-start">
            <div className="min-w-3 h-3 mt-1.5 rounded-full bg-[#5B9BD5] flex-shrink-0"></div>
            <span className="ml-2 text-sm text-[#E2E8FF]">Avoid travel if winds exceed 35mph</span>
          </li>
        </ul>
      </div>
      
      <div className="bg-[#080F1F] rounded-lg p-5 border border-[#5B9BD5]/20">
        <div className="flex items-center mb-3">
          <CloudLightning className="h-5 w-5 text-[#5B9BD5] mr-2" />
          <h4 className="font-bold text-white">Thunderstorms</h4>
        </div>
        <ul className="space-y-2">
          <li className="flex items-start">
            <div className="min-w-3 h-3 mt-1.5 rounded-full bg-[#5B9BD5] flex-shrink-0"></div>
            <span className="ml-2 text-sm text-[#E2E8FF]">Avoid parking under trees</span>
          </li>
          <li className="flex items-start">
            <div className="min-w-3 h-3 mt-1.5 rounded-full bg-[#5B9BD5] flex-shrink-0"></div>
            <span className="ml-2 text-sm text-[#E2E8FF]">Disconnect shore power</span>
          </li>
          <li className="flex items-start">
            <div className="min-w-3 h-3 mt-1.5 rounded-full bg-[#5B9BD5] flex-shrink-0"></div>
            <span className="ml-2 text-sm text-[#E2E8FF]">Stay inside RV (Faraday effect)</span>
          </li>
        </ul>
      </div>
      
      <div className="bg-[#080F1F] rounded-lg p-5 border border-[#5B9BD5]/20">
        <div className="flex items-center mb-3">
          <CloudDrizzle className="h-5 w-5 text-[#5B9BD5] mr-2" />
          <h4 className="font-bold text-white">Flash Floods</h4>
        </div>
        <ul className="space-y-2">
          <li className="flex items-start">
            <div className="min-w-3 h-3 mt-1.5 rounded-full bg-[#5B9BD5] flex-shrink-0"></div>
            <span className="ml-2 text-sm text-[#E2E8FF]">Never camp in dry washes</span>
          </li>
          <li className="flex items-start">
            <div className="min-w-3 h-3 mt-1.5 rounded-full bg-[#5B9BD5] flex-shrink-0"></div>
            <span className="ml-2 text-sm text-[#E2E8FF]">Have evacuation routes ready</span>
          </li>
          <li className="flex items-start">
            <div className="min-w-3 h-3 mt-1.5 rounded-full bg-[#5B9BD5] flex-shrink-0"></div>
            <span className="ml-2 text-sm text-[#E2E8FF]">Never drive through flooded roads</span>
          </li>
        </ul>
      </div>
      
      <div className="bg-[#080F1F] rounded-lg p-5 border border-[#5B9BD5]/20">
        <div className="flex items-center mb-3">
          <Thermometer className="h-5 w-5 text-[#5B9BD5] mr-2" />
          <h4 className="font-bold text-white">Extreme Heat</h4>
        </div>
        <ul className="space-y-2">
          <li className="flex items-start">
            <div className="min-w-3 h-3 mt-1.5 rounded-full bg-[#5B9BD5] flex-shrink-0"></div>
            <span className="ml-2 text-sm text-[#E2E8FF]">Park in shaded areas</span>
          </li>
          <li className="flex items-start">
            <div className="min-w-3 h-3 mt-1.5 rounded-full bg-[#5B9BD5] flex-shrink-0"></div>
            <span className="ml-2 text-sm text-[#E2E8FF]">Use window covers to block sun</span>
          </li>
          <li className="flex items-start">
            <div className="min-w-3 h-3 mt-1.5 rounded-full bg-[#5B9BD5] flex-shrink-0"></div>
            <span className="ml-2 text-sm text-[#E2E8FF]">Monitor pet safety in heat</span>
          </li>
        </ul>
      </div>
      
      <div className="bg-[#080F1F] rounded-lg p-5 border border-[#5B9BD5]/20">
        <div className="flex items-center mb-3">
          <Snowflake className="h-5 w-5 text-[#5B9BD5] mr-2" />
          <h4 className="font-bold text-white">Winter Weather</h4>
        </div>
        <ul className="space-y-2">
          <li className="flex items-start">
            <div className="min-w-3 h-3 mt-1.5 rounded-full bg-[#5B9BD5] flex-shrink-0"></div>
            <span className="ml-2 text-sm text-[#E2E8FF]">Insulate water lines</span>
          </li>
          <li className="flex items-start">
            <div className="min-w-3 h-3 mt-1.5 rounded-full bg-[#5B9BD5] flex-shrink-0"></div>
            <span className="ml-2 text-sm text-[#E2E8FF]">Keep fuel tanks at least half full</span>
          </li>
          <li className="flex items-start">
            <div className="min-w-3 h-3 mt-1.5 rounded-full bg-[#5B9BD5] flex-shrink-0"></div>
            <span className="ml-2 text-sm text-[#E2E8FF]">Carry tire chains when required</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WeatherHazards;
