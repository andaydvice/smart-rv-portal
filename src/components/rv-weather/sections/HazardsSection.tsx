
import React from "react";
import { Wind } from "lucide-react";
import { TypographyH2 } from "@/components/ui/typography";
import WeatherHazards from "../WeatherHazards";

const HazardsSection = () => {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <Wind className="h-6 w-6 text-connectivity-accent" />
        <TypographyH2>Weather Hazards for RVers</TypographyH2>
      </div>
      
      <WeatherHazards />
    </section>
  );
};

export default HazardsSection;
