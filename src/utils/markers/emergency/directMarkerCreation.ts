
// This file now just re-exports from the modular components
// This maintains backward compatibility while using the new structure
export { 
  createEmergencyMarkers,
  setupEmergencyMarkerListeners,
  injectEmergencyMarkerStyles,
  closeAllEmergencyPopups
} from './index';
