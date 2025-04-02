
import React from "react";
import IntroSection from "./IntroSection";
import PlanningSection from "./sections/PlanningSection";
import MonitoringSection from "./sections/MonitoringSection";
import AlertsSection from "./sections/AlertsSection";
import HazardsSection from "./sections/HazardsSection";
import MaintenanceSection from "./sections/MaintenanceSection";

const MainContent = () => {
  return (
    <div className="lg:col-span-2 space-y-8">
      <IntroSection />
      <PlanningSection />
      <MonitoringSection />
      <AlertsSection />
      <HazardsSection />
      <MaintenanceSection />
    </div>
  );
};

export default MainContent;
