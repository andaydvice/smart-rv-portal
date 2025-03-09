
import React from 'react';

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
    <div className="absolute top-2 right-2 bg-black/80 text-white p-2 rounded z-50 text-xs">
      <h4 className="font-bold mb-1">Marker Stats</h4>
      <ul>
        <li>Total: {stats.total}</li>
        <li>Created: {stats.created}</li>
        <li>Visible: {stats.visible}</li>
        <li>Hidden: {stats.hidden}</li>
        <li>Failed: {stats.failed}</li>
        {stats.totalNYFacilities > 0 && (
          <li>NY Facilities: {stats.processedNYFacilities}/{stats.totalNYFacilities}</li>
        )}
      </ul>
    </div>
  );
};

export default MarkerStats;
