
import React from "react";
import WeatherHazardCard from "./WeatherHazardCard";

const WeatherHazards = () => {
  return (
    <div className="space-y-6 mt-4">
      <WeatherHazardCard
        title="High Winds"
        riskLevel={{ text: "Extreme for RVs", color: "text-red-500" }}
        safetyMeasures={[
          "Park your RV with the front facing into the wind when possible",
          "Retract all slides and awnings",
          "Lower TV antennas and satellite dishes",
          "Consider relocating to areas with natural windbreaks"
        ]}
        avoidTravel="Sustained winds over 20-25 mph or gusts over 30 mph"
      />
      
      <WeatherHazardCard
        title="Thunderstorms & Lightning"
        riskLevel={{ text: "High", color: "text-yellow-500" }}
        safetyMeasures={[
          "Avoid parking under trees",
          "Unplug shore power during electrical storms",
          "Stay inside your RV (Faraday cage effect offers protection)",
          "Have a weather radio with alerts"
        ]}
      />
      
      <WeatherHazardCard
        title="Flash Floods"
        riskLevel={{ text: "Extreme", color: "text-red-500" }}
        safetyMeasures={[
          "Never camp in dry washes or low-lying areas",
          "Know evacuation routes from your campsite",
          "\"Turn Around, Don't Drown\" - never drive through flooded roads",
          "Monitor weather upstream from your location"
        ]}
      />
      
      <WeatherHazardCard
        title="Extreme Heat"
        riskLevel={{ text: "Moderate to High", color: "text-yellow-500" }}
        safetyMeasures={[
          "Use reflective window coverings",
          "Park in shaded areas when possible",
          "Run air conditioning or use fans strategically",
          "Consider portable dehumidifiers in humid climates"
        ]}
      />
      
      <WeatherHazardCard
        title="Winter Conditions"
        riskLevel={{ text: "High", color: "text-yellow-500" }}
        safetyMeasures={[
          "Properly winterize your RV if traveling in freezing temperatures",
          "Use RV-specific antifreeze in plumbing systems",
          "Insulate water hoses and connections",
          "Carry tire chains when required",
          "Monitor propane levels for heating"
        ]}
      />
    </div>
  );
};

export default WeatherHazards;
