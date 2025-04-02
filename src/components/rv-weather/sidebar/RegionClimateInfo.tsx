
import React from "react";
import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";

const RegionClimateInfo = () => {
  return (
    <Card className="p-5 bg-[#131a2a]">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="h-5 w-5 text-connectivity-accent" />
        <h3 className="font-bold text-lg">Climate Considerations by Region</h3>
      </div>
      
      <div className="space-y-3">
        <div>
          <h4 className="font-bold text-sm">Desert Southwest</h4>
          <p className="text-xs">Challenges: Extreme heat (100°F+), rapid temperature changes, dusty conditions</p>
          <p className="text-xs">Best Seasons: October-April</p>
          <p className="text-xs">Tips: Carry extra water, use reflective covers, check air filters frequently</p>
        </div>
        
        <div>
          <h4 className="font-bold text-sm">Pacific Northwest</h4>
          <p className="text-xs">Challenges: Frequent rain, high humidity, cooler temperatures</p>
          <p className="text-xs">Best Seasons: July-September</p>
          <p className="text-xs">Tips: Good waterproofing, dehumidifiers, proper ventilation</p>
        </div>
        
        <div>
          <h4 className="font-bold text-sm">Mountain Regions</h4>
          <p className="text-xs">Challenges: Rapid weather changes, altitude effects, early/late snow</p>
          <p className="text-xs">Best Seasons: June-September</p>
          <p className="text-xs">Tips: Layer clothing, prepare for overnight freezes even in summer</p>
        </div>
        
        <div>
          <h4 className="font-bold text-sm">Gulf Coast/Florida</h4>
          <p className="text-xs">Challenges: Hurricane season, high humidity, sudden thunderstorms</p>
          <p className="text-xs">Best Seasons: November-May</p>
          <p className="text-xs">Tips: Monitor hurricane forecasts, have evacuation plan</p>
        </div>
        
        <div>
          <h4 className="font-bold text-sm">Great Plains</h4>
          <p className="text-xs">Challenges: Severe thunderstorms, tornadoes, strong winds</p>
          <p className="text-xs">Best Seasons: September-October, April-May</p>
          <p className="text-xs">Tips: Know tornado shelter locations, monitor weather alerts carefully</p>
        </div>
      </div>
    </Card>
  );
};

export default RegionClimateInfo;
