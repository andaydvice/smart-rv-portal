
import React from "react";
import { Quote } from "lucide-react";

const WeatherQuote = () => {
  return (
    <div className="p-6 rounded-lg border border-[#5B9BD5] bg-gradient-to-b from-connectivity-darkBg to-[#151A22]">
      <div className="flex items-center gap-2 mb-2">
        <Quote className="h-5 w-5 text-connectivity-accent" />
        <h4 className="text-sm font-medium">RV Weather Wisdom</h4>
      </div>
      <p className="text-sm italic text-light-blue">
        "Remember: Weather conditions can change rapidly. Always have a backup plan, know your RV's limitations, and prioritize safety over schedules."
      </p>
    </div>
  );
};

export default WeatherQuote;
