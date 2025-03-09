
import { StorageFacility } from '../../types';

/**
 * Validates facility coordinates
 */
export const validateFacilities = (facilities: StorageFacility[]): StorageFacility[] => {
  return facilities.filter(facility => {
    const lat = Number(facility.latitude);
    const lng = Number(facility.longitude);
    return !isNaN(lat) && !isNaN(lng) && 
           Math.abs(lat) <= 90 && Math.abs(lng) <= 180;
  });
};
