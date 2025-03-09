
import { useEffect, useState, useCallback } from 'react';
import { StorageFacility } from '../../types';
import { 
  injectEmergencyMarkerStyles,
  createEmergencyMarkers,
  setupEmergencyMarkerListeners
} from '@/utils/markers';

/**
 * Hook to handle marker creation and management
 */
export const useMarkerManagement = (
  map: mapboxgl.Map | null, 
  mapLoaded: boolean, 
  validFacilities: StorageFacility[], 
  onMarkerClick: (facilityId: string) => void
) => {
  // State for tracking markers
  const [stats, setStats] = useState({
    markersCreated: 0,
    skippedFacilities: 0,
    processedNYFacilities: 0,
    totalNYFacilities: 0
  });
  
  // State for tracking errors
  const [errors, setErrors] = useState<Array<{
    facilityId: string,
    error?: Error,
    type: string,
    timestamp: number
  }>>([]);

  // Create markers function
  const createMarkers = useCallback(() => {
    if (!map || !mapLoaded || validFacilities.length === 0) return 0;
    
    try {
      // Create emergency markers
      const markerCount = createEmergencyMarkers(map, validFacilities);
      
      // Update stats
      setStats(prev => ({
        ...prev,
        markersCreated: markerCount,
        skippedFacilities: validFacilities.length - markerCount
      }));
      
      return markerCount;
    } catch (error) {
      console.error("Error creating markers:", error);
      setErrors(prev => [...prev, {
        facilityId: 'batch-creation',
        error: error instanceof Error ? error : new Error(String(error)),
        type: 'CREATION_ERROR',
        timestamp: Date.now()
      }]);
      return 0;
    }
  }, [map, mapLoaded, validFacilities]);

  // Force marker visibility function
  const forceMarkerVisibility = useCallback(() => {
    document.querySelectorAll('.mapboxgl-marker, .custom-marker').forEach(marker => {
      if (marker instanceof HTMLElement) {
        marker.style.visibility = 'visible';
        marker.style.display = 'block';
        marker.style.opacity = '1';
      }
    });
  }, []);

  // Mark error as recovered
  const markErrorAsRecovered = useCallback((facilityId: string) => {
    setErrors(prev => prev.filter(err => err.facilityId !== facilityId));
  }, []);
  
  // Emergency marker creation approach
  useEffect(() => {
    if (!map || !mapLoaded || validFacilities.length === 0) return;
    
    // Inject emergency styles
    injectEmergencyMarkerStyles();
    
    // Set map container to be explicitly visible
    const container = map.getContainer();
    if (container) {
      container.style.visibility = 'visible';
      container.style.opacity = '1';
      container.style.display = 'block';
    }
    
    console.log('Creating markers for facilities...');
    
    // Create emergency markers and set up listeners
    const markerCount = createEmergencyMarkers(map, validFacilities);
    console.log(`Created ${markerCount} emergency markers`);
    
    // Update stats
    setStats(prev => ({
      ...prev,
      markersCreated: markerCount,
      skippedFacilities: validFacilities.length - markerCount
    }));
    
    // Set up event listeners
    const cleanup = setupEmergencyMarkerListeners(onMarkerClick);
    
    // Set up a MutationObserver to watch for popup close buttons
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          // Look for newly added popups
          mutation.addedNodes.forEach(node => {
            if (node instanceof HTMLElement && node.classList.contains('mapboxgl-popup')) {
              // Find close button
              const closeButton = node.querySelector('.mapboxgl-popup-close-button');
              if (closeButton instanceof HTMLElement) {
                // Replace with new button to clear old event listeners
                const newButton = closeButton.cloneNode(true);
                closeButton.parentNode?.replaceChild(newButton, closeButton);
                
                // Add clean event listener to the close button
                newButton.addEventListener('click', (e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  
                  // Remove the popup
                  node.remove();
                  
                  // Make sure map is visible
                  setTimeout(() => {
                    if (map) {
                      // Ensure map canvas is visible
                      const canvas = map.getCanvas();
                      if (canvas) {
                        canvas.style.visibility = 'visible';
                        canvas.style.display = 'block';
                      }
                      
                      // Force all markers to be visible
                      forceMarkerVisibility();
                    }
                  }, 50);
                });
              }
            }
          });
        }
      });
    });
    
    // Start observing the document for popup additions
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    return () => {
      cleanup();
      observer.disconnect();
      // Remove emergency markers
      document.querySelectorAll('.emergency-marker').forEach(marker => {
        if (marker.parentNode) marker.parentNode.removeChild(marker);
      });
    };
  }, [map, mapLoaded, validFacilities, onMarkerClick, forceMarkerVisibility]);

  // Return all needed functions and state
  return {
    stats,
    createMarkers,
    forceMarkerVisibility,
    errors,
    markErrorAsRecovered
  };
};
