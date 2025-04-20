
/**
 * Emergency marker utilities
 */

// Export the main marker creation functions
export { 
  createEmergencyMarkers,
  setupEmergencyMarkerListeners,
  injectEmergencyStyles
} from './directMarkerCreation';

// Export types
export type { 
  EmergencyMarkerOptions,
  EmergencyPopupOptions,
  MarkerClickHandlerOptions,
  MarkerClickHandler
} from './types';

// Export utility functions for use in other components
export { closeAllPopupsExcept } from './popup';
export { removeExistingEmergencyMarkers } from './marker';
