
import React from "react";
import PreparednessChecklist from "./sidebar/PreparednessChecklist";
import RegionClimateInfo from "./sidebar/RegionClimateInfo";
import WeatherResources from "./sidebar/WeatherResources";
import WeatherQuote from "./sidebar/WeatherQuote";
import SeasonalWeatherTips from "./sidebar/SeasonalWeatherTips";

const Sidebar = () => {
  return (
    <div className="lg:col-span-1 space-y-8">
      <PreparednessChecklist />
      <SeasonalWeatherTips />
      <RegionClimateInfo />
      <WeatherResources />
      <WeatherQuote />
    </div>
  );
};

export default Sidebar;
