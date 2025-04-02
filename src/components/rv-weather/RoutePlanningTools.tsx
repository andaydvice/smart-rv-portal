
import React from "react";

const RoutePlanningTools = () => {
  return (
    <div className="space-y-4 mt-4">
      <div>
        <h4 className="font-bold">Long-Range Forecasts</h4>
        <ul className="list-disc list-inside space-y-1 pl-4 text-sm">
          <li><a href="https://www.cpc.ncep.noaa.gov/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Climate Prediction Center</a> - Offers 6-10 day, 8-14 day, and monthly/seasonal outlooks</li>
          <li><a href="https://www.accuweather.com/en/weather-forecasts/month" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">AccuWeather Long-Range</a> - Monthly forecasts for planning ahead</li>
        </ul>
      </div>
      
      <div>
        <h4 className="font-bold">Historical Weather Data</h4>
        <ul className="list-disc list-inside space-y-1 pl-4 text-sm">
          <li><a href="https://www.wunderground.com/history" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Weather Underground Historical Data</a></li>
          <li><a href="https://www.ncdc.noaa.gov/cdo-web/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">NOAA Climate Data</a></li>
        </ul>
      </div>
    </div>
  );
};

export default RoutePlanningTools;
