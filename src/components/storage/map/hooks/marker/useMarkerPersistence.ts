
import { useEffect, useRef } from 'react';
import { UseMarkerPersistenceProps } from './types';
import { useMarkerVisibility } from './useMarkerVisibility';

export const useMarkerPersistence = ({ map }: UseMarkerPersistenceProps) => {
  const { forceMarkerVisibility } = useMarkerVisibility({ map });
  const lastRestoredTime = useRef<number>(0);

  // Restore markers after map style reload with rate limiting
  useEffect(() => {
    if (!map) return;
    
    const handleStyleData = () => {
      // Rate limit restoration to prevent excessive operations
      const now = Date.now();
      if (now - lastRestoredTime.current < 1000) {
        return; // Skip if called too frequently
      }
      
      lastRestoredTime.current = now;
      
      // When map style reloads, restore markers after a delay
      setTimeout(() => {
        // Re-add markers that aren't connected to DOM
        if (window._persistentMarkers) {
          let restoredCount = 0;
          Object.values(window._persistentMarkers).forEach((marker) => {
            if (marker && !marker.getElement().isConnected && map) {
              marker.addTo(map);
              restoredCount++;
            }
          });
          
          if (restoredCount > 0) {
            console.log(`Restored ${restoredCount} markers after style reload`);
          }
        }
        
        // Force visibility after restoring markers
        forceMarkerVisibility();
      }, 300);
    };
    
    map.on('styledata', handleStyleData);
    
    return () => {
      map.off('styledata', handleStyleData);
    };
  }, [map, forceMarkerVisibility]);

  // Use a less frequent interval for periodic visibility checks
  useEffect(() => {
    const visibilityInterval = setInterval(forceMarkerVisibility, 3000); // Less frequent checks
    return () => {
      clearInterval(visibilityInterval);
    };
  }, [forceMarkerVisibility]);

  return {};
};
