
import { useState } from 'react';

export interface MarkerStatistics {
  markersCreated: number;
  skippedFacilities: number;
  processedNYFacilities: number;
  totalFacilities: number;
  totalNYFacilities: number;
  startTime?: number;
  endTime?: number;
}

export const useMarkerStats = () => {
  const [stats, setStats] = useState<MarkerStatistics>({
    markersCreated: 0,
    skippedFacilities: 0,
    processedNYFacilities: 0,
    totalFacilities: 0,
    totalNYFacilities: 0,
    startTime: Date.now(),
    endTime: Date.now()
  });

  const updateStats = (newStats: Partial<MarkerStatistics>) => {
    setStats(prev => ({
      ...prev,
      ...newStats,
      endTime: Date.now()
    }));
  };

  return {
    stats,
    updateStats
  };
};
