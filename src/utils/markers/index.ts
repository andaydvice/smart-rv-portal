
// Export marker forcing utilities
export { forceMapMarkersVisible, applyForcedStyles, testMarkersVisibility } from './forcing/markerForcing';
// Export ensureMarkersOnMap directly from the ensureMarkers file
export { ensureMarkersOnMap } from './forcing/ensureMarkers';

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

// Function to ensure markers exist on map - emergency marker creation
export const ensureMarkersExist = (map: mapboxgl.Map, facilities: any[]) => {
  console.log('EMERGENCY MARKER CREATION: Ensuring markers exist on map', facilities.length);
  return ensureMarkersOnMap(map, facilities);
};
