
import React from 'react';

interface FacilityCountBadgeProps {
  count: number;
}

const FacilityCountBadge: React.FC<FacilityCountBadgeProps> = ({ count }) => {
  return (
    <div className="absolute top-4 right-4 z-10 bg-[#F97316] text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
      {count} facilities
    </div>
  );
};

export default FacilityCountBadge;
