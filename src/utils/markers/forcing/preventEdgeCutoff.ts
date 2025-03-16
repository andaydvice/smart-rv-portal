
/**
 * This file re-exports the edge-aware marker utilities from the edge-aware directory
 * It exists for backward compatibility with existing imports
 */

export { preventMarkerEdgeCutoff } from './edge-aware/preventEdgeCutoff';
export { createEdgeAwareClickHandler } from './edge-aware/createClickHandler';
export { enableEdgeAwareMarkers } from './edge-aware/enableEdgeAwareMarkers';

export type { 
  EdgePadding,
  MarkerPosition,
  EdgeAwareClickHandler
} from './edge-aware/types';
