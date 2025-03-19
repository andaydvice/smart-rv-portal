
import React from 'react';
import { StorageFacility } from '../../types';

interface HighlightIndicatorProps {
  selectedFacility: StorageFacility | null;
  currentZoom: number;
  recentlyViewedFacilityIds: string[];
}

const HighlightIndicator: React.FC<HighlightIndicatorProps> = ({
  selectedFacility,
  currentZoom,
  recentlyViewedFacilityIds
}) => {
  if (!selectedFacility) return null;
  
  const isRecentlyViewed = recentlyViewedFacilityIds.includes(selectedFacility.id);
  
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full z-10">
      <div className="flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${
          currentZoom > 10 ? 'bg-green-500' : isRecentlyViewed ? 'bg-green-500' : 'bg-orange-500'
        }`}></div>
        <span className="text-white text-sm">{selectedFacility.name}</span>
      </div>
    </div>
  );
};

export default HighlightIndicator;
