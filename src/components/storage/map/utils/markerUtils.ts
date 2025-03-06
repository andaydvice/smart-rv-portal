
// Re-export all marker utility functions from their respective files
import { 
  CoordinateMap,
  calculateMarkerOffset,
  buildCoordinatesMap
} from './markerCoordinates';

import { createFacilityMarker } from './markerCreation';

import { hasValidCoordinates } from './markerValidation';

export {
  // CoordinateMap interface
  CoordinateMap,
  
  // Coordinate handling
  calculateMarkerOffset,
  buildCoordinatesMap,
  
  // Marker creation
  createFacilityMarker,
  
  // Validation
  hasValidCoordinates
};
