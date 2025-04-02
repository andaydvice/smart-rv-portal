
import React from "react";
import { AlertTriangle } from "lucide-react";
import { TypographyH2 } from "@/components/ui/typography";
import WeatherAlertsTable from "../WeatherAlertsTable";

const AlertsSection = () => {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="h-6 w-6 text-connectivity-accent" />
        <TypographyH2>Understanding Weather Alerts</TypographyH2>
      </div>
      
      <WeatherAlertsTable />
    </section>
  );
};

export default AlertsSection;
