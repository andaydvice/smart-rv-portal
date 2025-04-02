
import React from "react";
import { Card } from "@/components/ui/card";

const SeasonalMaintenanceChecklist = () => {
  return (
    <div className="grid md:grid-cols-2 gap-4 mt-4">
      <Card className="p-5 bg-[#5B9BD5]/10 border-[#5B9BD5]/50">
        <h4 className="font-bold mb-2">Spring</h4>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Check and reseal roof seams</li>
          <li>Inspect window and door seals</li>
          <li>Test air conditioning system</li>
        </ul>
      </Card>
      
      <Card className="p-5 bg-[#5B9BD5]/10 border-[#5B9BD5]/50">
        <h4 className="font-bold mb-2">Summer</h4>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Check tire pressure regularly (heat increases pressure)</li>
          <li>Clean air conditioner filters monthly</li>
          <li>Inspect awnings and extend/retract mechanisms</li>
        </ul>
      </Card>
      
      <Card className="p-5 bg-[#5B9BD5]/10 border-[#5B9BD5]/50">
        <h4 className="font-bold mb-2">Fall</h4>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Check furnace operation</li>
          <li>Inspect weather stripping</li>
          <li>Clean and check roof vents</li>
        </ul>
      </Card>
      
      <Card className="p-5 bg-[#5B9BD5]/10 border-[#5B9BD5]/50">
        <h4 className="font-bold mb-2">Winter</h4>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Apply RV antifreeze to plumbing if needed</li>
          <li>Check propane system and detectors</li>
          <li>Inspect roof for snow load capacity</li>
        </ul>
      </Card>
    </div>
  );
};

export default SeasonalMaintenanceChecklist;
