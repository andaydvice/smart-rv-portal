
import React from 'react';

interface MapDebugOverlayProps {
  facilitiesCount: number;
  selectedState: string | null;
}

/**
 * Displays debug information about map state
 */
const MapDebugOverlay: React.FC<MapDebugOverlayProps> = ({
  facilitiesCount,
  selectedState
}) => {
  // Only show in development mode
  if (import.meta.env.MODE !== 'development') {
    return null;
  }
  
  return (
    <div className="absolute top-2 left-2 z-50 bg-black/60 text-white text-xs p-2 rounded">
      {facilitiesCount} facilities
      {selectedState && ` | ${selectedState}`}
    </div>
  );
};

export default MapDebugOverlay;
