
import React from 'react';

interface MapLoadingStateProps {
  isInitializing: boolean;
  mapError: string | null;
  mapLoaded: boolean;
  facilitiesCount?: number;
  infiniteLoading?: boolean;
}

const MapLoadingState: React.FC<MapLoadingStateProps> = ({
  isInitializing,
  mapError,
  mapLoaded,
  facilitiesCount,
  infiniteLoading = false
}) => {
  if (!isInitializing || mapLoaded) return null;
  
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#080F1F] bg-opacity-80 backdrop-blur-sm">
      <div className="text-center space-y-3">
        <div className="w-12 h-12 border-t-2 border-r-2 border-[#5B9BD5] rounded-full animate-spin mx-auto"></div>
        <p className="text-white">Loading Map...</p>
        {facilitiesCount !== undefined && (
          <p className="text-gray-400 text-sm">{facilitiesCount} facilities to display</p>
        )}
      </div>
    </div>
  );
};

export default MapLoadingState;
