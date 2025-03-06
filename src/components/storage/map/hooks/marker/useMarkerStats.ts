
import { useState } from 'react';
import { MarkerStatistics } from './types';

export const useMarkerStats = () => {
  const [stats, setStats] = useState<MarkerStatistics>({
    markersCreated: 0,
    skippedFacilities: 0,
    processedNYFacilities: 0,
    totalFacilities: 0,
    totalNYFacilities: 0
  });

  const updateStats = (newStats: Partial<MarkerStatistics>) => {
    setStats(prev => ({
      ...prev,
      ...newStats
    }));
  };

  return {
    stats,
    updateStats
  };
};
