
import React from "react";
import { Cloud } from "lucide-react";
import { TypographyH2, TypographyH3 } from "@/components/ui/typography";
import WeatherApps from "../WeatherApps";

const MonitoringSection = () => {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <Cloud className="h-6 w-6 text-connectivity-accent" />
        <TypographyH2>Real-Time Weather Monitoring</TypographyH2>
      </div>
      
      <TypographyH3 className="mt-6">Essential Weather Apps</TypographyH3>
      <WeatherApps />
    </section>
  );
};

export default MonitoringSection;
