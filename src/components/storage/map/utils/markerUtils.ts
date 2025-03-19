
import { StorageFacility } from '../../types';
import { calculateMarkerOffset, buildCoordinatesMap } from './markerCoordinates';
import { hasValidCoordinates } from './markerValidation';

/**
 * Checks if a facility ID is in the recently viewed list
 */
export const isRecentlyViewed = (facilityId: string, recentlyViewedFacilityIds: string[]): boolean => {
  return recentlyViewedFacilityIds.includes(facilityId);
};

/**
 * Determines marker color based on various conditions
 * Enhanced to ensure consistent color display for Google Maps icons
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
  
  // Default color - using a stronger orange for better visibility
  return '#F97316';
};

/**
 * Forces marker refresh on the Google Maps when filter changes
 */
export const forceMarkersRefresh = (
  map: google.maps.Map | null,
  facilities: StorageFacility[]
): void => {
  if (!map) return;
  
  console.log(`Forcing refresh for ${facilities.length} markers`);
  
  // Pan the map slightly to force a redraw
  const center = map.getCenter();
  if (center) {
    map.panBy(1, 0);
    
    // Then pan back to trigger a refresh
    setTimeout(() => {
      map.panBy(-1, 0);
    }, 50);
  }
};

// Re-export functions from other files
export { calculateMarkerOffset, buildCoordinatesMap, hasValidCoordinates };
