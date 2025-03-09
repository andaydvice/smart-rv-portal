
import { injectEmergencyStyles } from './styleInjection';
import { forceExistingMarkersVisible, enhanceMarkerClickability, enhanceHeaderMarkers } from './domManipulation';
import { patchMapboxMarkerPrototype, attemptMapboxPatchWithRetry } from './markerPatching';

/**
 * Apply all emergency fixes for marker visibility
 */
export function applyAllEmergencyFixes() {
  console.log("Applying all emergency marker fixes");
  
  // Add marker loading data attribute to body
  document.body.setAttribute('data-markers-loading', 'true');
  
  // Apply all fixes in sequence
  injectEmergencyStyles();
  attemptMapboxPatchWithRetry();
  
  // Force existing markers visible
  forceExistingMarkersVisible();
  
  // Add click handlers
  enhanceMarkerClickability();
  
  // Enhance header markers
  enhanceHeaderMarkers();
  
  // Set up an interval to continuously check and fix markers
  const interval = setInterval(() => {
    forceExistingMarkersVisible();
    enhanceMarkerClickability();
  }, 200);
  
  // Return cleanup function
  return () => {
    clearInterval(interval);
    document.body.removeAttribute('data-markers-loading');
  };
}
