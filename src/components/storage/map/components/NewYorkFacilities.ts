
import { StorageFacility } from '../../types';

/**
 * Utility functions for handling New York facilities
 */
export const isNewYorkFacility = (facility: StorageFacility): boolean => {
  return (
    facility.state === 'New York' || 
    facility.state === 'NY' || 
    (typeof facility.state === 'string' && facility.state.toLowerCase().includes('new york'))
  );
};

/**
 * Logs detailed information about New York facilities
 */
export const logNewYorkFacilityDetails = (
  facility: StorageFacility, 
  processedCount: number, 
  coordinates: [number, number]
): void => {
  console.log(`NY #${processedCount} Coordinates detail:`, {
    facilityId: facility.id, 
    name: facility.name,
    rawLat: facility.latitude, 
    rawLng: facility.longitude,
    parsedLat: coordinates[1], 
    parsedLng: coordinates[0]
  });
  
  console.log(`✅ NY #${processedCount} marker created successfully at [${coordinates[0]}, ${coordinates[1]}]`);
};

/**
 * Count New York facilities in the data set
 */
export const countNewYorkFacilities = (facilities: StorageFacility[]): number => {
  return facilities.filter(isNewYorkFacility).length;
};
