
// Re-export all marker utility functions from their respective files
import { 
  calculateMarkerOffset,
  buildCoordinatesMap
} from './markerCoordinates';

import { createFacilityMarker } from './markerCreation';

import { hasValidCoordinates } from './markerValidation';

// Import type with "type" keyword
import type { CoordinateMap } from './markerCoordinates';

export {
  // Coordinate handling
  calculateMarkerOffset,
  buildCoordinatesMap,
  
  // Marker creation
  createFacilityMarker,
  
  // Validation
  hasValidCoordinates
};

// Re-export the type properly
export type { CoordinateMap };
