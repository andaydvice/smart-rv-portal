
// Export marker forcing utilities
export { forceMapMarkersVisible, applyForcedStyles, testMarkersVisibility } from './forcing/markerForcing';
// Export ensureMarkersOnMap directly from the ensureMarkers file
export { ensureMarkersOnMap } from './forcing/ensureMarkers';
// Export ensureMapVisible and removeViewDetailsButtons from markerForcing.ts
export { ensureMapVisible, removeViewDetailsButtons } from './forcing/markerForcing';

// Export marker testing utilities
export {
  createMarkerDebugger,
  createMarkerDebugOverlay
} from './testing/visibilityTester';

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

// Import ensureMarkersOnMap for local use
import { ensureMarkersOnMap } from './forcing/ensureMarkers';

// Function to ensure markers exist on map - emergency marker creation
export const ensureMarkersExist = (map: mapboxgl.Map, facilities: any[]) => {
  console.log('EMERGENCY MARKER CREATION: Ensuring markers exist on map', facilities.length);
  // Use the imported ensureMarkersOnMap function
  return ensureMarkersOnMap(map, facilities);
};
