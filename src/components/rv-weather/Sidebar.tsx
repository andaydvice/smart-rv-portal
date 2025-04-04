
import React from "react";
import { CheckSquare, CalendarDays, Map, CloudRain, AlertTriangle, Book, ExternalLink } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="lg:col-span-1 space-y-6">
      {/* Weather Apps Section */}
      <div className="bg-[#151A22] rounded-lg shadow-lg p-6 border border-[#1a202c]/30">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="h-5 w-5 text-[#5B9BD5]" />
          <h3 className="font-bold text-lg text-white">Essential Weather Apps</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center">
            <span className="bg-[#5B9BD5]/20 p-1.5 rounded-full mr-3">
              <CloudRain className="h-4 w-4 text-[#5B9BD5]" />
            </span>
            <div>
              <span className="font-semibold text-sm text-white">AccuWeather</span>
              <p className="text-xs text-[#E2E8FF]">15-day forecast plus radar</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <span className="bg-[#5B9BD5]/20 p-1.5 rounded-full mr-3">
              <CloudRain className="h-4 w-4 text-[#5B9BD5]" />
            </span>
            <div>
              <span className="font-semibold text-sm text-white">Weather Underground</span>
              <p className="text-xs text-[#E2E8FF]">Hyperlocal forecasts</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <span className="bg-[#5B9BD5]/20 p-1.5 rounded-full mr-3">
              <CloudRain className="h-4 w-4 text-[#5B9BD5]" />
            </span>
            <div>
              <span className="font-semibold text-sm text-white">RV Weather</span>
              <p className="text-xs text-[#E2E8FF]">Made for RV travelers</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Checklist Section */}
      <div className="bg-[#151A22] rounded-lg shadow-lg p-6 border border-[#1a202c]/30">
        <div className="flex items-center gap-2 mb-4">
          <CheckSquare className="h-5 w-5 text-[#5B9BD5]" />
          <h3 className="font-bold text-lg text-white">Weather Preparedness</h3>
        </div>
        
        <ul className="space-y-3 text-sm">
          <li className="flex items-start">
            <div className="min-w-4 h-4 mt-0.5 rounded border border-[#5B9BD5] flex-shrink-0"></div>
            <span className="ml-2 text-[#E2E8FF]">Download weather apps before traveling</span>
          </li>
          <li className="flex items-start">
            <div className="min-w-4 h-4 mt-0.5 rounded border border-[#5B9BD5] flex-shrink-0"></div>
            <span className="ml-2 text-[#E2E8FF]">Create emergency contact list</span>
          </li>
          <li className="flex items-start">
            <div className="min-w-4 h-4 mt-0.5 rounded border border-[#5B9BD5] flex-shrink-0"></div>
            <span className="ml-2 text-[#E2E8FF]">Pack emergency weather supplies</span>
          </li>
          <li className="flex items-start">
            <div className="min-w-4 h-4 mt-0.5 rounded border border-[#5B9BD5] flex-shrink-0"></div>
            <span className="ml-2 text-[#E2E8FF]">Know your RV's wind resistance limits</span>
          </li>
          <li className="flex items-start">
            <div className="min-w-4 h-4 mt-0.5 rounded border border-[#5B9BD5] flex-shrink-0"></div>
            <span className="ml-2 text-[#E2E8FF]">Review evacuation routes for each stay</span>
          </li>
        </ul>
      </div>
      
      {/* Seasonal Tips Section */}
      <div className="bg-[#080F1F] text-white rounded-lg shadow-lg p-6 border border-[#1a202c]/30">
        <div className="flex items-center gap-2 mb-4">
          <CalendarDays className="h-5 w-5 text-[#5B9BD5]" />
          <h3 className="font-bold text-lg text-white">Seasonal Weather Tips</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <h5 className="text-sm font-semibold text-[#5B9BD5] mb-1">Spring</h5>
            <p className="text-xs text-[#E2E8FF]">Watch for flash floods in desert areas. Thunderstorms can develop quickly during afternoons.</p>
          </div>
          
          <div>
            <h5 className="text-sm font-semibold text-[#5B9BD5] mb-1">Summer</h5>
            <p className="text-xs text-[#E2E8FF]">Keep RV cool by parking in shade when possible. Use awnings and window covers to reduce solar gain.</p>
          </div>
          
          <div>
            <h5 className="text-sm font-semibold text-[#5B9BD5] mb-1">Fall</h5>
            <p className="text-xs text-[#E2E8FF]">Check weather forecasts frequently as conditions can change rapidly during this transitional season.</p>
          </div>
          
          <div>
            <h5 className="text-sm font-semibold text-[#5B9BD5] mb-1">Winter</h5>
            <p className="text-xs text-[#E2E8FF]">Insulate water pipes and tanks. Keep propane tanks at least 30% full to maintain pressure.</p>
          </div>
        </div>
      </div>
      
      {/* Resources Section */}
      <div className="bg-[#080F1F] text-white rounded-lg shadow-lg p-6 border border-[#1a202c]/30">
        <div className="flex items-center gap-2 mb-4">
          <Book className="h-5 w-5 text-[#5B9BD5]" />
          <h3 className="font-bold text-lg text-white">Weather Resources</h3>
        </div>
        
        <div className="space-y-2">
          <a href="https://www.weather.gov/safety/" target="_blank" rel="noopener noreferrer" className="flex items-center text-[#5B9BD5] hover:underline">
            <ExternalLink className="h-3 w-3 mr-1.5" />
            <span className="text-xs">NOAA Weather Safety</span>
          </a>
          <a href="https://www.ready.gov/severe-weather" target="_blank" rel="noopener noreferrer" className="flex items-center text-[#5B9BD5] hover:underline">
            <ExternalLink className="h-3 w-3 mr-1.5" />
            <span className="text-xs">Ready.gov Severe Weather</span>
          </a>
          <a href="https://rvlifestyle.com/" target="_blank" rel="noopener noreferrer" className="flex items-center text-[#5B9BD5] hover:underline">
            <ExternalLink className="h-3 w-3 mr-1.5" />
            <span className="text-xs">RV Weather Safety Webinars</span>
          </a>
          <a href="https://escapees.com/" target="_blank" rel="noopener noreferrer" className="flex items-center text-[#5B9BD5] hover:underline">
            <ExternalLink className="h-3 w-3 mr-1.5" />
            <span className="text-xs">Escapees RV Club Weather Seminars</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
