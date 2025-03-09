
// Export all marker-related hooks
export * from './useMarkerCreation';
export * from './useMarkerVisibility';
export * from './useMarkerHighlight';
export * from './useMarkerPersistence';
export * from './useMarkerInitialization';
export { useMarkerStats } from './useMarkerStats';
export * from './useProcessExistingMarkers';
export * from './useCreateNewMarker';
export * from './useMarkerClickHandlers';

// Export types from types.ts
export * from './types';

// Export services
export { 
  useMarkerErrorHandling,
  type UseMarkerErrorHandlingReturn 
} from './useMarkerErrorHandling';
