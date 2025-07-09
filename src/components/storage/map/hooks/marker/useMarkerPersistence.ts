
import { useEffect } from 'react';
import { UseMarkerPersistenceProps } from './types';

export const useMarkerPersistence = ({ map }: UseMarkerPersistenceProps) => {
  // Initialize the persistent markers tracking if needed
  useEffect(() => {
    if (typeof window !== 'undefined' && !window._persistentMarkers) {
      window._persistentMarkers = {};
    }
  }, []);

  // Ensure markers persist across map updates
  useEffect(() => {
    if (!map) return;

    // Function to enforce markers to stay on the map
    const enforceMarkers = () => {
      if (window._persistentMarkers) {
        // Count how many markers we readded
        let readdedCount = 0;
        
        // Check all tracked markers
        Object.entries(window._persistentMarkers).forEach(([facilityId, marker]) => {
          try {
            // Skip already attached markers
            if (marker.getElement().isConnected) return;
            
            // Re-add marker to map
            marker.addTo(map);
            readdedCount++;
            
            // Make marker visible and functional
            const el = marker.getElement();
            if (el) {
              el.style.visibility = 'visible';
              el.style.display = 'block';
              el.style.opacity = '1';
              el.style.pointerEvents = 'auto';
            }
          } catch (err) {
            console.warn(`Error ensuring persistence for marker ${facilityId}:`, err);
          }
        });
        
        // Log only if we actually did something
        if (readdedCount > 0) {
          console.log(`Re-added ${readdedCount} markers to map`);
        }
      }
    };
    
    // Run initially
    enforceMarkers();
    
    // Set up recurring checks
    const interval = setInterval(enforceMarkers, 2000);
    
    // Set up event listeners for map movements that might affect markers
    map.on('moveend', enforceMarkers);
    map.on('zoomend', enforceMarkers);
    map.on('rotate', enforceMarkers);
    map.on('dragend', enforceMarkers);
    
    return () => {
      clearInterval(interval);
      
      if (map) {
        map.off('moveend', enforceMarkers);
        map.off('zoomend', enforceMarkers);
        map.off('rotate', enforceMarkers);
        map.off('dragend', enforceMarkers);
      }
    };
  }, [map]);

  return {};
};
