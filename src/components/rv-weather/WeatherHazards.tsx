
import React from "react";
import WeatherHazardCard from "./WeatherHazardCard";

const WeatherHazards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <WeatherHazardCard 
        title="High Winds"
        riskLevel={{ text: "High Risk", color: "text-red-500" }}
        safetyMeasures={[
          "Park with the front facing into the wind when possible",
          "Retract awnings and slide-outs",
          "Secure or remove and stow away loose exterior items",
          "Consider delaying travel if winds exceed 30-35 mph"
        ]}
        avoidTravel="Sustained winds over 20-25 mph or gusts over 40 mph"
      />
      
      <WeatherHazardCard
        title="Thunderstorms & Lightning"
        riskLevel={{ text: "Medium Risk", color: "text-yellow-500" }}
        safetyMeasures={[
          "Avoid parking under trees",
          "Disconnect shore power during electrical storms",
          "Stay inside your RV during storm (Faraday cage effect)",
          "Monitor weather alerts and move if necessary"
        ]}
      />
      
      <WeatherHazardCard
        title="Flash Floods"
        riskLevel={{ text: "High Risk", color: "text-red-500" }}
        safetyMeasures={[
          "Never camp in dry washes or low-lying areas",
          "Have evacuation routes ready/plan escape",
          "'Turn Around Don't Drown' - never drive through flooded roads",
          "Monitor weather upstream from your location"
        ]}
      />
      
      <WeatherHazardCard
        title="Extreme Heat"
        riskLevel={{ text: "Medium Risk", color: "text-yellow-500" }}
        safetyMeasures={[
          "Park in shaded areas when possible",
          "Use window covers to block direct sunlight",
          "Run air conditioning strategically",
          "Stay hydrated and watch for signs of heat-related illness"
        ]}
      />
      
      <WeatherHazardCard
        title="Winter Conditions"
        riskLevel={{ text: "Medium Risk", color: "text-yellow-500" }}
        safetyMeasures={[
          "Insulate water lines if RV is not 4-season rated",
          "Use engine/compartment heaters in freezing temps",
          "Keep fuel tanks at least half full",
          "Carry tire chains when required",
          "Monitor propane levels for heating"
        ]}
      />
    </div>
  );
};

export default WeatherHazards;
