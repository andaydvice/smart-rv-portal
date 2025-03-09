
// Re-export from the new structure for backward compatibility
import { injectEmergencyStyles as injectStyles } from './emergency-styles/styleInjection';
import { patchMapboxMarkerPrototype as patchPrototype } from './emergency-styles/markerPatching';
import { applyAllEmergencyFixes } from './emergency-styles/combined';

// Export the individual functions with the same names for backward compatibility
export const injectEmergencyStyles = injectStyles;
export const patchMapboxMarkerPrototype = patchPrototype;

// Export the combined utility
export const applyAllMarkerFixes = applyAllEmergencyFixes;

// For immediate execution if needed
export default applyAllEmergencyFixes;
