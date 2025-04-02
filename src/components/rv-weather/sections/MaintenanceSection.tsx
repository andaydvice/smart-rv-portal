
import React from "react";
import { Thermometer } from "lucide-react";
import { TypographyH2, TypographyH3 } from "@/components/ui/typography";
import SeasonalMaintenanceChecklist from "../SeasonalMaintenanceChecklist";
import WeatherImpactTable from "../WeatherImpactTable";

const MaintenanceSection = () => {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <Thermometer className="h-6 w-6 text-connectivity-accent" />
        <TypographyH2>Weather-Related RV Maintenance</TypographyH2>
      </div>
      
      <TypographyH3 className="mt-6">Seasonal Checklist</TypographyH3>
      <SeasonalMaintenanceChecklist />
      
      <TypographyH3 className="mt-6">Weather Impact on RV Systems</TypographyH3>
      <WeatherImpactTable />
    </section>
  );
};

export default MaintenanceSection;
