
import React from 'react';

// Define the proper MarkerStatistics type
export interface MarkerStatistics {
  total: number;
  created: number;
  visible: number;
  hidden: number;
  failed: number;
  processedNYFacilities: number;
  totalNYFacilities: number;
}

interface MarkerStatsProps {
  stats: MarkerStatistics;
}

const MarkerStats: React.FC<MarkerStatsProps> = ({ stats }) => {
  return (
    <div className="absolute top-4 right-4 z-50 bg-black/70 text-white p-3 rounded text-xs">
      <h4 className="font-bold mb-1">Marker Stats:</h4>
      <ul>
        <li>Total: {stats.total}</li>
        <li>Created: {stats.created}</li>
        <li>Visible: {stats.visible}</li>
        <li>Hidden: {stats.hidden}</li>
        <li>Failed: {stats.failed}</li>
        <li>NY Facilities: {stats.processedNYFacilities}/{stats.totalNYFacilities}</li>
      </ul>
    </div>
  );
};

export default MarkerStats;
