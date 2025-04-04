
import React from "react";

const SeasonalConsiderations = () => {
  return (
    <div className="space-y-4">
      <div className="p-4 bg-[#080F1F] rounded-lg border border-[#5B9BD5]/20">
        <h5 className="font-semibold text-[#5B9BD5] mb-2">Spring Travel (March-May)</h5>
        <ul className="list-disc pl-4 space-y-1 text-sm text-[#E2E8FF]">
          <li>Variable weather, warming temperatures</li>
          <li>Watch for thunderstorms and flooding</li>
          <li>Best for Southern states, desert Southwest</li>
        </ul>
      </div>
      
      <div className="p-4 bg-[#080F1F] rounded-lg border border-[#5B9BD5]/20">
        <h5 className="font-semibold text-[#5B9BD5] mb-2">Summer Travel (June-August)</h5>
        <ul className="list-disc pl-4 space-y-1 text-sm text-[#E2E8FF]">
          <li>Hot weather, ideal for northern regions</li>
          <li>Extreme heat, consider elevations</li>
          <li>Best for Mountain states, Pacific Northwest</li>
        </ul>
      </div>
      
      <div className="p-4 bg-[#080F1F] rounded-lg border border-[#5B9BD5]/20">
        <h5 className="font-semibold text-[#5B9BD5] mb-2">Fall Travel (September-November)</h5>
        <ul className="list-disc pl-4 space-y-1 text-sm text-[#E2E8FF]">
          <li>Spectacular foliage, cooler temperatures</li>
          <li>Variable weather patterns, shorter days</li>
          <li>Best for New England, Appalachian Mountains</li>
        </ul>
      </div>
      
      <div className="p-4 bg-[#080F1F] rounded-lg border border-[#5B9BD5]/20">
        <h5 className="font-semibold text-[#5B9BD5] mb-2">Winter Travel (December-February)</h5>
        <ul className="list-disc pl-4 space-y-1 text-sm text-[#E2E8FF]">
          <li>Solitude, unique winter landscapes</li>
          <li>Limited campground availability</li>
          <li>Best for Southwest deserts, Florida, Texas</li>
        </ul>
      </div>
    </div>
  );
};

export default SeasonalConsiderations;
