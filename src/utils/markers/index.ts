
// Export marker forcing utilities
export { forceMapMarkersVisible, applyForcedStyles, testMarkersVisibility } from './forcing/markerForcing';
// Export ensureMarkersOnMap directly from the ensureMarkers file
export { ensureMarkersOnMap } from './forcing/ensureMarkers';
// Export ensureMapVisible and removeViewDetailsButtons from markerForcing.ts
export { ensureMapVisible, removeViewDetailsButtons } from './forcing/markerForcing';

// Export marker testing utilities
export {
  createMarkerDebugger,
  createMarkerDebugOverlay,
  testMarkersVisibility as testMarkerVisibility
} from './testing';

// Export emergency solution
export { 
  createEmergencyMarkers,
  setupEmergencyMarkerListeners,
  injectEmergencyMarkerStyles
} from './emergency/directMarkerCreation';

// Export types from central types file
export type {
  MarkerVisibilityTestResult,
  VisibilityIssueDetail,
  StorageFacility
} from './types';

// Create a more aggressive ensureMarkersExist function
export const ensureMarkersExist = (map: mapboxgl.Map, facilities: any[]) => {
  console.log('AGGRESSIVE MARKER CREATION: Ensuring markers exist on map', facilities.length);
  
  // Create an interval that will keep checking and creating markers
  let attempts = 0;
  const maxAttempts = 5;
  
  // Import these functions at the top level to avoid dynamic require
  import('./forcing/ensureMarkers').then(forceModule => {
    const createMarkers = () => {
      attempts++;
      
      const markerCount = forceModule.ensureMarkersOnMap(map, facilities);
      
      console.log(`Marker creation attempt ${attempts}: Created ${markerCount} markers`);
      
      // If we still don't have enough markers, try again (up to max attempts)
      if (markerCount < facilities.length * 0.9 && attempts < maxAttempts) {
        return false; // Continue trying
      }
      return true; // Stop trying
    };
    
    // Try immediately
    if (!createMarkers()) {
      // Try again with increasing delays
      [200, 500, 1000, 2000].forEach((delay, index) => {
        setTimeout(() => {
          if (attempts <= index + 1) {
            createMarkers();
          }
        }, delay);
      });
    }
  });
  
  // Force markers to be visible regardless
  import('./forcing/markerForcing').then(markerForcing => {
    [100, 300, 600, 1000, 1500].forEach(delay => {
      setTimeout(() => {
        markerForcing.forceMapMarkersVisible();
      }, delay);
    });
  });
  
  return document.querySelectorAll('.mapboxgl-marker, .custom-marker').length;
};
