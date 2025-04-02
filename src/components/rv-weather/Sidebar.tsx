
import React from "react";
import PreparednessChecklist from "./sidebar/PreparednessChecklist";
import RegionClimateInfo from "./sidebar/RegionClimateInfo";
import WeatherResources from "./sidebar/WeatherResources";
import WeatherQuote from "./sidebar/WeatherQuote";

const Sidebar = () => {
  return (
    <div className="lg:col-span-1 space-y-8">
      <PreparednessChecklist />
      <RegionClimateInfo />
      <WeatherResources />
      <WeatherQuote />
    </div>
  );
};

export default Sidebar;
