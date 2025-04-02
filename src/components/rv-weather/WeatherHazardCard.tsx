
import React from "react";

interface WeatherHazardCardProps {
  title: string;
  riskLevel: {
    text: string;
    color: string;
  };
  safetyMeasures: string[];
  avoidTravel?: string;
}

const WeatherHazardCard: React.FC<WeatherHazardCardProps> = ({
  title,
  riskLevel,
  safetyMeasures,
  avoidTravel,
}) => {
  return (
    <div className="p-4 rounded-lg border border-[#1a202c] bg-[#080F1F]/70">
      <div className="flex justify-between items-start">
        <h4 className="font-bold text-xl">{title}</h4>
        <span className={`text-sm font-medium ${riskLevel.color}`}>{riskLevel.text}</span>
      </div>
      
      <div className="mt-3">
        <h5 className="font-medium text-sm text-[#5B9BD5]">Safety Measures:</h5>
        <ul className="mt-1 space-y-1 text-sm text-light-blue list-disc list-inside">
          {safetyMeasures.map((measure, index) => (
            <li key={index}>{measure}</li>
          ))}
        </ul>
      </div>
      
      {avoidTravel && (
        <div className="mt-3">
          <h5 className="font-medium text-sm text-[#5B9BD5]">When to Avoid Travel:</h5>
          <p className="mt-1 text-sm text-light-blue">{avoidTravel}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherHazardCard;
