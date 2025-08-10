
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
  
  // Set up a MutationObserver to react to DOM changes affecting markers
  const handleMutations = () => {
    forceExistingMarkersVisible();
    enhanceMarkerClickability();
  };

  const observer = new MutationObserver(() => {
    requestAnimationFrame(handleMutations);
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Fallback: slow interval for safety (avoid hot loop)
  const interval = setInterval(handleMutations, 2000);
  
  // Return cleanup function
  return () => {
    observer.disconnect();
    clearInterval(interval);
    document.body.removeAttribute('data-markers-loading');
  };
}
