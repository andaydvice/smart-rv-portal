
/**
 * This file re-exports the edge-aware marker utilities from the edge-aware directory
 * It exists for backward compatibility with existing imports
 */

export { 
  preventMarkerEdgeCutoff,
  createEdgeAwareClickHandler,
  enableEdgeAwareMarkers
} from './edge-aware';

export type { 
  EdgePadding,
  MarkerPosition,
  EdgeAwareClickHandler
} from './edge-aware/types';
