
import React from "react";
import { Card } from "@/components/ui/card";
import { Sun } from "lucide-react";

const WeatherResources = () => {
  return (
    <Card className="p-5 bg-[#131a2a]">
      <div className="flex items-center gap-2 mb-4">
        <Sun className="h-5 w-5 text-connectivity-accent" />
        <h3 className="font-bold text-lg text-left">Weather Resources for Smart RVers</h3>
      </div>
      
      <div className="space-y-3 text-left">
        <div>
          <h4 className="font-bold text-sm">Online Communities</h4>
          <ul className="list-disc list-inside text-xs space-y-1">
            <li><a href="https://www.rvforum.net/forums/rv-trips-travel-planning/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">RV Weather Forum</a></li>
            <li><a href="https://www.irv2.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">iRV2 Weather Discussions</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold text-sm">Educational Resources</h4>
          <ul className="list-disc list-inside text-xs space-y-1">
            <li><a href="https://www.weather.gov/safety/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">NOAA Weather Safety</a></li>
            <li><a href="https://www.ready.gov/severe-weather" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Ready.gov Severe Weather</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold text-sm">Smart RV Weather Courses</h4>
          <ul className="list-disc list-inside text-xs space-y-1">
            <li><a href="https://rvlifestyle.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">RV Weather Safety Webinars</a></li>
            <li><a href="https://escapees.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Escapees RV Club Weather Seminars</a></li>
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default WeatherResources;
