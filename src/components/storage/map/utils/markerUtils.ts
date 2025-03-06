
// Re-export all marker utility functions from their respective files
import { 
  calculateMarkerOffset,
  buildCoordinatesMap,
  type CoordinateMap
} from './markerCoordinates';

import { createFacilityMarker } from './markerCreation';

import { hasValidCoordinates } from './markerValidation';

// Export all functions
export {
  // Coordinate handling
  calculateMarkerOffset,
  buildCoordinatesMap,
  
  // Marker creation
  createFacilityMarker,
  
  // Validation
  hasValidCoordinates
};

// Re-export types explicitly
export type { CoordinateMap };
