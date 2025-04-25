
import React from "react";

const WeatherApps = () => {
  return (
    <div className="grid md:grid-cols-2 gap-4 mt-4">
      <div>
        <h4 className="font-bold text-white mb-2">Comprehensive Weather Apps</h4>
        <ul className="list-disc list-outside space-y-1 pl-5 text-sm text-light-blue">
          <li><a href="https://weather.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">AccuWeather</a> - 15-day forecast plus radar</li>
          <li><a href="https://www.wunderground.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">Weather Underground</a> - Detailed forecasts with PWS network</li>
          <li><a href="https://weather.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">The Weather Channel</a> - Live interactive radar</li>
        </ul>
      </div>
      
      <div>
        <h4 className="font-bold text-white mb-2">RV-Specific Weather Tools</h4>
        <ul className="list-disc list-outside space-y-1 pl-5 text-sm text-light-blue">
          <li><a href="https://rvweather.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">RV Weather</a> - Weather for routes specifically</li>
          <li><a href="https://www.windy.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">Wind Alerts</a> - Warnings for wind/driving conditions</li>
          <li><a href="https://weatherradioapp.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">Weather Radio</a> - NOAA weather radio alerts</li>
        </ul>
      </div>
    </div>
  );
};

export default WeatherApps;
