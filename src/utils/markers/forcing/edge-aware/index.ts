
/**
 * Edge-aware marker utilities for preventing popups from being cut off at map edges
 */

// Export all utilities from their focused files
export { preventMarkerEdgeCutoff } from './preventEdgeCutoff';
export { createEdgeAwareClickHandler } from './createClickHandler';
export { enableEdgeAwareMarkers } from './enableEdgeAwareMarkers';
export type { EdgePadding, MarkerPosition, EdgeAwareClickHandler } from './types';
