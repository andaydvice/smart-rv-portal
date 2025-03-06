
// Export all marker-related hooks
export * from './useMarkerCreation';
export * from './useMarkerVisibility';
export * from './useMarkerHighlight';
export * from './useMarkerPersistence';
export * from './useMarkerInitialization';
export * from './useMarkerStats';
export * from './useProcessExistingMarkers';
export * from './useCreateNewMarker';
export * from './useMarkerClickHandlers';

// Export types from types.ts
export * from './types';

// Export useMarkerErrorHandling without re-exporting MarkerError which is already exported from types.ts
export { 
  useMarkerErrorHandling,
  type UseMarkerErrorHandlingReturn 
} from './useMarkerErrorHandling';
