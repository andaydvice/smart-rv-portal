
import { StorageFacility } from '../../types';

/**
 * Validates facility coordinates
 * @returns true if coordinates are valid, false otherwise
 */
export const hasValidCoordinates = (facility: StorageFacility): boolean => {
  if (
    facility.latitude === null || 
    facility.longitude === null || 
    facility.latitude === undefined || 
    facility.longitude === undefined
  ) {
    return false;
  }
  
  // Convert to numbers and check if they're valid
  const lat = Number(facility.latitude);
  const lng = Number(facility.longitude);
  
  return !isNaN(lat) && !isNaN(lng) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180;
};
