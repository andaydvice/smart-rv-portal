
import { forceMapMarkersVisible as forceVisibility } from './markers/forcing/markerForcing';
import { injectEmergencyMarkerStyles } from './markers/styleInjection';

/**
 * Emergency utility to force map markers to be visible
 * Used as a global function that can be called from anywhere
 */
export function forceMapMarkersVisible() {
  console.log('Forcing map markers to be visible (global)');
  
  // First inject emergency styles
  injectEmergencyMarkerStyles();
  
  // Then force visibility through DOM manipulation
  const result = forceVisibility();
  
  // Create a global helper function for debugging
  if (typeof window !== 'undefined') {
    (window as any).forceMarkersVisible = forceVisibility;
    (window as any).injectMarkerStyles = injectEmergencyMarkerStyles;
  }
  
  return result;
}
