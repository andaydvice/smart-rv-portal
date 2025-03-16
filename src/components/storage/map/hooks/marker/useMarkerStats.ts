
import { useState, useCallback } from 'react';

/**
 * Hook for tracking marker statistics
 */
export const useMarkerStats = () => {
  // State for tracking markers
  const [stats, setStats] = useState({
    markersCreated: 0,
    skippedFacilities: 0,
    processedNYFacilities: 0,
    totalNYFacilities: 0
  });

  // Update stats
  const updateStats = useCallback((
    markersCreated: number,
    skippedFacilities: number,
    processedNYFacilities = 0,
    totalNYFacilities = 0
  ) => {
    setStats({
      markersCreated,
      skippedFacilities,
      processedNYFacilities,
      totalNYFacilities
    });
  }, []);

  return {
    stats,
    updateStats
  };
};
