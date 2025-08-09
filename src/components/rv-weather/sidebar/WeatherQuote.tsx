
import React from "react";
import { Quote } from "lucide-react";

const WeatherQuote = () => {
  return (
    <div className="p-6 rounded-lg border border-[#e2e8f0] bg-white shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <Quote className="h-5 w-5 text-[#3b82f6]" />
        <h4 className="text-sm font-medium text-[#1a202c] text-left">Smart RV Weather Wisdom</h4>
      </div>
      <p className="text-sm italic text-[#4a5568] text-left">
        "Remember: Weather conditions can change rapidly. Always have a backup plan, know your Smart RV's limitations, and prioritize safety over schedules."
      </p>
    </div>
  );
};

export default WeatherQuote;
