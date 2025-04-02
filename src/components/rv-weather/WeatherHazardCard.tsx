
import React from "react";
import { Card } from "@/components/ui/card";

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
  avoidTravel 
}) => {
  return (
    <Card className="p-5 bg-[#5B9BD5]/10 border-[#5B9BD5]/50">
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="font-bold text-sm mb-2">Risk Level: <span className={riskLevel.color}>{riskLevel.text}</span></p>
      <div>
        <h4 className="font-bold text-sm">Safety Measures:</h4>
        <ul className="list-disc list-inside space-y-1 text-sm">
          {safetyMeasures.map((measure, index) => (
            <li key={index}>{measure}</li>
          ))}
        </ul>
      </div>
      {avoidTravel && <p className="text-sm mt-2"><span className="font-bold">When to Avoid Travel:</span> {avoidTravel}</p>}
    </Card>
  );
};

export default WeatherHazardCard;
