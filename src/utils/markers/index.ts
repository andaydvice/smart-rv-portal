
// Export marker forcing utilities
export { forceMapMarkersVisible, applyForcedStyles, testMarkersVisibility } from './forcing/markerForcing';
export { ensureMarkersOnMap } from './forcing/ensureMarkers';

// Export marker testing utilities
export {
  createMarkerDebugger,
  testMarkerVisibility,
  auditMarkerVisibility,
  monitorMarkerVisibility,
  createMarkerDebugOverlay
} from './testing';

// Export types
export interface MarkerVisibilityTestResult {
  totalMarkers: number;
  visibleMarkers: number;
  hiddenMarkers: number;
  issues: VisibilityIssueDetail[];
}

export interface VisibilityIssueDetail {
  elementId: string;
  elementType: string;
  issueType: 'visibility' | 'display' | 'opacity' | 'zIndex' | 'position' | 'events' | 'other';
  description: string;
  computedStyles: {
    visibility: string;
    display: string;
    opacity: string;
    zIndex: string;
    position: string;
    pointerEvents: string;
  };
  recommendation: string;
}

// Function to ensure markers exist on map - emergency marker creation
export const ensureMarkersExist = (map: mapboxgl.Map, facilities: any[]) => {
  console.log('EMERGENCY MARKER CREATION: Ensuring markers exist on map', facilities.length);
  return ensureMarkersOnMap(map, facilities);
};
