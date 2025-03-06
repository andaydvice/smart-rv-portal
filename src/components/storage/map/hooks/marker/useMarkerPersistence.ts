
import { useEffect } from 'react';
import { UseMarkerPersistenceProps } from './types';
import { useMarkerVisibility } from './useMarkerVisibility';

export const useMarkerPersistence = ({ map }: UseMarkerPersistenceProps) => {
  const { forceMarkerVisibility } = useMarkerVisibility({ map });

  // Restore markers after map style reload
  useEffect(() => {
    if (!map) return;
    
    const handleStyleData = () => {
      // When map style reloads, restore markers
      setTimeout(() => {
        // Re-add all markers to map
        if (window._persistentMarkers) {
          Object.values(window._persistentMarkers).forEach((marker) => {
            if (marker && !marker.getElement().isConnected && map) {
              marker.addTo(map);
            }
          });
        }
        
        // Force visibility on all markers
        forceMarkerVisibility();
      }, 100);
    };
    
    map.on('styledata', handleStyleData);
    
    return () => {
      map.off('styledata', handleStyleData);
    };
  }, [map, forceMarkerVisibility]);

  // Ensure markers remain visible with a periodic check
  useEffect(() => {
    const visibilityInterval = setInterval(forceMarkerVisibility, 1000);
    return () => {
      clearInterval(visibilityInterval);
    };
  }, [forceMarkerVisibility]);

  return {};
};
