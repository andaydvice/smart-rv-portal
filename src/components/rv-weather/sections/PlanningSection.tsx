
import React from "react";
import { Calendar } from "lucide-react";
import { TypographyH2, TypographyH3 } from "@/components/ui/typography";
import SeasonalConsiderations from "../SeasonalConsiderations";
import RoutePlanningTools from "../RoutePlanningTools";

const PlanningSection = () => {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="h-6 w-6 text-connectivity-accent" />
        <TypographyH2>Planning Your Trip Around Weather</TypographyH2>
      </div>
      
      <TypographyH3 className="mt-6">Seasonal Considerations</TypographyH3>
      <SeasonalConsiderations />
      
      <TypographyH3 className="mt-6">Route Planning Tools</TypographyH3>
      <RoutePlanningTools />
    </section>
  );
};

export default PlanningSection;
