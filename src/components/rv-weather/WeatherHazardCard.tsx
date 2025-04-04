
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
  const getBgColor = () => {
    if (title.includes("Wind")) return "bg-blue-500";
    if (title.includes("Thunder")) return "bg-purple-500";
    if (title.includes("Flood")) return "bg-blue-700";
    if (title.includes("Heat")) return "bg-red-500";
    if (title.includes("Winter")) return "bg-blue-400";
    return "bg-gray-500";
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-[#e2e8f0]">
      <div className={`${getBgColor()} p-4 text-white`}>
        <h3 className="text-xl font-bold text-left">{title}</h3>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <span className={`text-sm font-medium ${riskLevel.color}`}>{riskLevel.text}</span>
        </div>
        
        <div className="mt-3">
          <h4 className="font-semibold text-md text-[#1a202c] text-left">Safety Measures:</h4>
          <ul className="mt-2 space-y-2 text-sm text-[#4a5568] list-disc list-inside text-left">
            {safetyMeasures.map((measure, index) => (
              <li key={index}>{measure}</li>
            ))}
          </ul>
        </div>
        
        {avoidTravel && (
          <div className="mt-4">
            <h4 className="font-semibold text-md text-[#1a202c] text-left">When to Avoid Travel:</h4>
            <p className="mt-1 text-sm text-[#4a5568] text-left">{avoidTravel}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherHazardCard;
