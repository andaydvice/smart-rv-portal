
import React from "react";
import { Card } from "@/components/ui/card";
import { Flag } from "lucide-react";

const PreparednessChecklist = () => {
  return (
    <Card className="p-5 bg-[#131a2a]">
      <div className="flex items-center gap-2 mb-4">
        <Flag className="h-5 w-5 text-connectivity-accent" />
        <h3 className="font-bold text-lg">Weather Preparedness Checklist</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-bold mb-2">Essential Weather Gear</h4>
          <ul className="space-y-1">
            <li className="flex items-center gap-2">
              <input type="checkbox" id="radio" className="w-4 h-4" />
              <label htmlFor="radio" className="text-sm">NOAA Weather Radio</label>
            </li>
            <li className="flex items-center gap-2">
              <input type="checkbox" id="windmeter" className="w-4 h-4" />
              <label htmlFor="windmeter" className="text-sm">Wind meter/anemometer</label>
            </li>
            <li className="flex items-center gap-2">
              <input type="checkbox" id="reflective" className="w-4 h-4" />
              <label htmlFor="reflective" className="text-sm">Reflective window coverings</label>
            </li>
            <li className="flex items-center gap-2">
              <input type="checkbox" id="surge" className="w-4 h-4" />
              <label htmlFor="surge" className="text-sm">Surge protector for hookups</label>
            </li>
            <li className="flex items-center gap-2">
              <input type="checkbox" id="tiedowns" className="w-4 h-4" />
              <label htmlFor="tiedowns" className="text-sm">Additional tie-downs and stabilizers</label>
            </li>
            <li className="flex items-center gap-2">
              <input type="checkbox" id="sealants" className="w-4 h-4" />
              <label htmlFor="sealants" className="text-sm">Weather-appropriate sealants</label>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold mb-2">Emergency Supplies</h4>
          <ul className="space-y-1">
            <li className="flex items-center gap-2">
              <input type="checkbox" id="water" className="w-4 h-4" />
              <label htmlFor="water" className="text-sm">3-day water supply</label>
            </li>
            <li className="flex items-center gap-2">
              <input type="checkbox" id="food" className="w-4 h-4" />
              <label htmlFor="food" className="text-sm">Non-perishable food</label>
            </li>
            <li className="flex items-center gap-2">
              <input type="checkbox" id="flashlight" className="w-4 h-4" />
              <label htmlFor="flashlight" className="text-sm">Flashlights and batteries</label>
            </li>
            <li className="flex items-center gap-2">
              <input type="checkbox" id="firstaid" className="w-4 h-4" />
              <label htmlFor="firstaid" className="text-sm">First aid kit</label>
            </li>
            <li className="flex items-center gap-2">
              <input type="checkbox" id="battery" className="w-4 h-4" />
              <label htmlFor="battery" className="text-sm">Battery backup for cell phones</label>
            </li>
            <li className="flex items-center gap-2">
              <input type="checkbox" id="maps" className="w-4 h-4" />
              <label htmlFor="maps" className="text-sm">Paper maps with evacuation routes</label>
            </li>
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default PreparednessChecklist;
