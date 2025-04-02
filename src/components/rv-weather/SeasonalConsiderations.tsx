
import React from "react";
import { Card } from "@/components/ui/card";

const SeasonalConsiderations = () => {
  return (
    <div className="grid md:grid-cols-2 gap-4 mt-4">
      <Card className="p-5 bg-[#5B9BD5]/10 border-[#5B9BD5]/50">
        <h4 className="font-bold mb-2">Spring Travel (March-May)</h4>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Advantages: Smaller crowds, blooming landscapes, moderate temperatures</li>
          <li>Challenges: Unpredictable rain, potential flooding in some regions</li>
          <li>Best Regions: Southern states, desert Southwest, coastal areas</li>
        </ul>
      </Card>
      
      <Card className="p-5 bg-[#5B9BD5]/10 border-[#5B9BD5]/50">
        <h4 className="font-bold mb-2">Summer Travel (June-August)</h4>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Advantages: Longer daylight hours, access to northern regions and high elevations</li>
          <li>Challenges: Extreme heat, crowded destinations, higher prices</li>
          <li>Best Regions: Mountain states, Pacific Northwest, Northern states, Canada</li>
        </ul>
      </Card>
      
      <Card className="p-5 bg-[#5B9BD5]/10 border-[#5B9BD5]/50">
        <h4 className="font-bold mb-2">Fall Travel (September-November)</h4>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Advantages: Spectacular foliage, cooler temperatures, fewer crowds</li>
          <li>Challenges: Variable weather patterns, shorter days</li>
          <li>Best Regions: New England, Appalachian Mountains, Rocky Mountains</li>
        </ul>
      </Card>
      
      <Card className="p-5 bg-[#5B9BD5]/10 border-[#5B9BD5]/50">
        <h4 className="font-bold mb-2">Winter Travel (December-February)</h4>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Advantages: Solitude, unique winter landscapes, lower campground fees</li>
          <li>Challenges: Cold temperatures, limited campground availability, winterization needs</li>
          <li>Best Regions: Southwest deserts, Florida, Texas Gulf Coast</li>
        </ul>
      </Card>
    </div>
  );
};

export default SeasonalConsiderations;
