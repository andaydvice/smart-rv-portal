
import React from "react";

const WeatherApps = () => {
  return (
    <div className="grid md:grid-cols-2 gap-4 mt-4">
      <div>
        <h4 className="font-bold">Comprehensive Weather Apps</h4>
        <ul className="list-disc list-inside space-y-1 pl-4 text-sm">
          <li><a href="https://radarscope.app/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">RadarScope</a> - Professional-grade radar data</li>
          <li><a href="https://www.wunderground.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Weather Underground</a> - Detailed forecasts with PWS network</li>
          <li><a href="https://weather.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">The Weather Channel</a> - User-friendly with good severe weather alerts</li>
        </ul>
      </div>
      
      <div>
        <h4 className="font-bold">RV-Specific Weather Tools</h4>
        <ul className="list-disc list-inside space-y-1 pl-4 text-sm">
          <li><a href="https://rvweather.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">RV Weather</a> - Weather forecasts specifically for RV routes</li>
          <li><a href="https://www.windy.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Windy</a> - Essential for monitoring wind conditions</li>
          <li><a href="https://weatherradioapp.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Weather Radio</a> - NOAA weather radio alerts</li>
        </ul>
      </div>
    </div>
  );
};

export default WeatherApps;
