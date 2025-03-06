
import mapboxgl from 'mapbox-gl';
import { StorageFacility } from '../../types';
import { createPopupHTML } from '../../popupUtils';

// Track coordinates that are too close together
export interface CoordinateMap {
  [key: string]: number;
}

/**
 * Creates and applies a coordinate offset for overlapping markers
 */
export const calculateMarkerOffset = (
  facility: StorageFacility,
  coordinatesMap: CoordinateMap,
  facilities: StorageFacility[],
  index: number
): [number, number] => {
  // Extract and normalize coordinates
  let lat = typeof facility.latitude === 'string' ? parseFloat(facility.latitude) : Number(facility.latitude);
  let lng = typeof facility.longitude === 'string' ? parseFloat(facility.longitude) : Number(facility.longitude);
  
  // Handle invalid coordinates
  if (isNaN(lat) || isNaN(lng)) {
    console.warn(`⚠️ Warning: Invalid numeric coordinates for ${facility.name}, using default coordinates`);
    lat = 39.8283; // Default to center of USA if coordinates are invalid
    lng = -98.5795;
  }
  
  // Round coordinates for grouping nearby points
  const roundedLat = Math.round(lat * 100000) / 100000;
  const roundedLng = Math.round(lng * 100000) / 100000;
  const coordKey = `${roundedLat},${roundedLng}`;
  
  // Only add offset if there are multiple markers at this location
  let offsetLat = lat;
  let offsetLng = lng;
  
  if (coordinatesMap[coordKey] > 1) {
    // Get the marker position in the stack
    const markersAtCoord = coordinatesMap[coordKey];
    const markerPosition = facilities.slice(0, index)
      .filter(f => {
        const fLat = Number(f.latitude);
        const fLng = Number(f.longitude);
        const fRoundedLat = Math.round(fLat * 100000) / 100000;
        const fRoundedLng = Math.round(fLng * 100000) / 100000;
        return `${fRoundedLat},${fRoundedLng}` === coordKey;
      }).length;
    
    // Apply spiral pattern offset
    const angle = (markerPosition * (2 * Math.PI)) / markersAtCoord;
    const radius = 0.0003 * (markerPosition + 1); // Small offset in degrees (~30 meters)
    
    offsetLat = lat + radius * Math.sin(angle);
    offsetLng = lng + radius * Math.cos(angle);
  }
  
  return [offsetLng, offsetLat];
};

/**
 * Builds a coordinate map to identify overlapping markers
 */
export const buildCoordinatesMap = (facilities: StorageFacility[]): CoordinateMap => {
  const coordinatesMap: CoordinateMap = {};
  
  facilities.forEach(facility => {
    if (facility.latitude !== null && facility.longitude !== null) {
      // Round to 5 decimal places for grouping nearby coordinates
      const roundedLat = Math.round(Number(facility.latitude) * 100000) / 100000;
      const roundedLng = Math.round(Number(facility.longitude) * 100000) / 100000;
      const coordKey = `${roundedLat},${roundedLng}`;
      
      // Count overlapping markers
      if (coordinatesMap[coordKey]) {
        coordinatesMap[coordKey]++;
      } else {
        coordinatesMap[coordKey] = 1;
      }
    }
  });
  
  return coordinatesMap;
};

/**
 * Creates a map marker for a facility
 */
export const createFacilityMarker = (
  facility: StorageFacility,
  coordinates: [number, number],
  isHighlighted: boolean,
  onMarkerClick: (facilityId: string) => void,
  map: mapboxgl.Map
): mapboxgl.Marker => {
  // Use more visible marker colors
  const markerColor = isHighlighted ? '#10B981' : '#F97316'; // Changed to orange for better visibility
  
  // Create popup
  const popup = new mapboxgl.Popup({
    offset: 25,
    maxWidth: '400px',
    className: 'storage-facility-popup'
  }).setHTML(createPopupHTML(facility));

  // Create marker with larger size for better visibility
  const marker = new mapboxgl.Marker({
    color: markerColor,
    scale: 1.2 // Slightly larger markers
  })
    .setLngLat(coordinates)
    .setPopup(popup)
    .addTo(map);

  // Add click event
  marker.getElement().addEventListener('click', () => {
    onMarkerClick(facility.id);
  });
  
  return marker;
};

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
  
  return !isNaN(lat) && !isNaN(lng);
};
