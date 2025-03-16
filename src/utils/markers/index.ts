
// Export the specific utilities from their source files
// Using named re-exports to avoid ambiguity

// Core utilities
export { forceMapMarkersVisible, applyForcedStyles } from './forceVisibility';

// Marker forcing utilities
export { 
  testMarkersVisibility,
  ensureMapVisible, 
  removeViewDetailsButtons 
} from './forcing/markerForcing';

// Edge cutoff prevention utilities
export { 
  preventMarkerEdgeCutoff,
  createEdgeAwareClickHandler,
  enableEdgeAwareMarkers
} from './forcing/preventEdgeCutoff';

// Popup utilities
export { hideAllPopups } from './forcing/uiManipulation';

// Emergency marker utilities
export { 
  createEmergencyMarkers,
  setupEmergencyMarkerListeners,
  injectEmergencyMarkerStyles
} from './emergency/directMarkerCreation';

// Style injection utilities
export { injectEmergencyMarkerStyles as injectEmergencyStyles } from './styleInjection';

// Testing and debugging utilities
export {
  createMarkerDebugger,
  createMarkerDebugOverlay,
  testMarkerVisibility
} from './testing/index';

// Marker visibility enhancement
export { ensureMarkersExist } from './forcing/ensureMarkers';

// Types
export type { 
  MarkerVisibilityTestResult, 
  VisibilityIssueDetail,
  StorageFacility
} from './types';
