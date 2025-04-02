
import React from "react";
import { TypographyH4 } from "@/components/ui/typography";
import { CheckSquare } from "lucide-react";

const PreparednessChecklist = () => {
  return (
    <div className="p-6 rounded-lg bg-gradient-to-b from-connectivity-darkBg to-[#131a2a] border border-[#1a202c]">
      <div className="flex items-center gap-2 mb-4">
        <CheckSquare className="h-5 w-5 text-connectivity-accent" />
        <TypographyH4 className="border-none">Weather Preparedness Checklist</TypographyH4>
      </div>
      
      <div className="space-y-4">
        <div>
          <h5 className="text-sm font-semibold text-[#5B9BD5] mb-1">Essential Weather Gear</h5>
          <div className="space-y-1 text-light-blue">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="rounded border-[#1a202c]" />
              <span>NOAA Weather Radio</span>
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="rounded border-[#1a202c]" />
              <span>Wind meter/anemometer</span>
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="rounded border-[#1a202c]" />
              <span>Reflective window coverings</span>
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="rounded border-[#1a202c]" />
              <span>Surge protector for electrical hookups</span>
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="rounded border-[#1a202c]" />
              <span>Additional tie-downs and stabilizers</span>
            </label>
          </div>
        </div>
        
        <div>
          <h5 className="text-sm font-semibold text-[#5B9BD5] mb-1">Emergency Supplies</h5>
          <div className="space-y-1 text-light-blue">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="rounded border-[#1a202c]" />
              <span>3-day water supply (1 gal/person/day)</span>
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="rounded border-[#1a202c]" />
              <span>Non-perishable food</span>
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="rounded border-[#1a202c]" />
              <span>Flashlights and extra batteries</span>
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="rounded border-[#1a202c]" />
              <span>First aid kit</span>
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="rounded border-[#1a202c]" />
              <span>Battery backup for cell phones</span>
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="rounded border-[#1a202c]" />
              <span>Paper maps with evacuation routes</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreparednessChecklist;
