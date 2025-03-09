
// Export marker forcing utilities
export { forceMapMarkersVisible, applyForcedStyles, testMarkersVisibility } from './forcing/markerForcing';

// Export marker testing utilities
export {
  createMarkerDebugger,
  testMarkerVisibility,
  auditMarkerVisibility,
  monitorMarkerVisibility,
  createMarkerDebugOverlay
} from './testing';

// Export types
export type {
  MarkerVisibilityTestResult,
  VisibilityIssueDetail
} from '../components/storage/map/hooks/marker/types';

// Function to ensure markers exist on map - stub for now
export const ensureMarkersOnMap = (map: mapboxgl.Map, facilities: any[]) => {
  console.log('Ensuring markers exist on map', facilities.length);
  forceMapMarkersVisible();
};
