
import React from "react";

const WeatherApps = () => {
  return (
    <div className="mt-8">
      <h2 className="text-3xl font-bold text-white font-playfair text-center mb-8">
        Essential Weather Apps
      </h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-[#080F1F]/80 p-6 rounded-lg border border-[#1a202c]">
          <h3 className="text-2xl font-bold text-ocean-blue mb-4 text-left">
            Comprehensive Weather Apps
          </h3>
          <ul className="space-y-4 text-left">
            <li className="text-light-blue">
              <a href="https://weather.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                AccuWeather
              </a> - 15-day forecast plus radar
            </li>
            <li className="text-light-blue">
              <a href="https://www.wunderground.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                Weather Underground
              </a> - Detailed forecasts with PWS network
            </li>
            <li className="text-light-blue">
              <a href="https://weather.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                The Weather Channel
              </a> - Live interactive radar
            </li>
          </ul>
        </div>
        
        <div className="bg-[#080F1F]/80 p-6 rounded-lg border border-[#1a202c]">
          <h3 className="text-2xl font-bold text-ocean-blue mb-4 text-left">
            RV-Specific Weather Tools
          </h3>
          <ul className="space-y-4 text-left">
            <li className="text-light-blue">
              <a href="https://rvweather.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                RV Weather
              </a> - Weather for routes specifically
            </li>
            <li className="text-light-blue">
              <a href="https://www.windy.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                Wind Alerts
              </a> - Warnings for wind/driving conditions
            </li>
            <li className="text-light-blue">
              <a href="https://weatherradioapp.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                Weather Radio
              </a> - NOAA weather radio alerts
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WeatherApps;
