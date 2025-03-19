
import { StorageFacility } from '../../types';

/**
 * Checks if a facility ID is in the recently viewed list
 */
export const isRecentlyViewed = (facilityId: string, recentlyViewedFacilityIds: string[]): boolean => {
  return recentlyViewedFacilityIds.includes(facilityId);
};

/**
 * Determines marker color based on various conditions
 */
export const getMarkerColor = (
  facilityId: string, 
  isSelected: boolean, 
  recentlyViewedFacilityIds: string[],
  currentZoom: number
): string => {
  // If selected, always green
  if (isSelected) return '#10B981';
  // If recently viewed, always highlight color
  if (isRecentlyViewed(facilityId, recentlyViewedFacilityIds)) return '#10B981';
  // If current zoom is close-up (> 10), show green
  if (currentZoom > 10) return '#10B981';
  // Default color
  return '#F97316';
};
