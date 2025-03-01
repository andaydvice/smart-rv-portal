
import React from 'react';

export interface MarkerStatistics {
  markersCreated: number;
  skippedFacilities: number;
  processedNYFacilities: number;
  totalFacilities: number;
  totalNYFacilities: number;
}

/**
 * Component that optionally displays marker statistics in development mode
 */
const MarkerStats: React.FC<{ stats: MarkerStatistics }> = ({ stats }) => {
  // Only show in development mode
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }
  
  return (
    <div className="absolute bottom-2 left-2 z-50 bg-black/60 text-white text-xs p-2 rounded space-y-1">
      <div>Markers: {stats.markersCreated}/{stats.totalFacilities} ({stats.skippedFacilities} skipped)</div>
      <div>NY Facilities: {stats.processedNYFacilities}/{stats.totalNYFacilities}</div>
    </div>
  );
};

export default MarkerStats;
