
import React from 'react';

export interface MarkerStatistics {
  markersCreated: number;
  skippedFacilities: number;
  processedNYFacilities: number;
  totalFacilities: number;
  totalNYFacilities: number;
  startTime?: number;
  endTime?: number;
}

/**
 * Component that optionally displays marker statistics in development mode
 */
const MarkerStats: React.FC<{ stats: MarkerStatistics }> = ({ stats }) => {
  // Only show in development mode
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }
  
  // Calculate rendering time if both times are available
  const renderTime = stats.startTime && stats.endTime 
    ? ((stats.endTime - stats.startTime) / 1000).toFixed(2) + 's'
    : 'N/A';
  
  return (
    <div className="absolute bottom-2 left-2 z-50 bg-black/60 text-white text-xs p-2 rounded space-y-1">
      <div>Markers: {stats.markersCreated}/{stats.totalFacilities} ({stats.skippedFacilities} skipped)</div>
      <div>NY Facilities: {stats.processedNYFacilities}/{stats.totalNYFacilities}</div>
      <div>Render Time: {renderTime}</div>
    </div>
  );
};

export default MarkerStats;
