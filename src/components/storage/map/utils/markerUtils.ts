
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
    const radius = 0.0005 * (markerPosition + 1); // Increased offset for better visibility
    
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
  // Use more visible marker colors with higher contrast
  const markerColor = isHighlighted ? '#10B981' : '#F97316'; // Green for highlighted, Orange for normal
  
  // Create a custom HTML marker for better visibility
  const el = document.createElement('div');
  el.className = 'custom-marker';
  el.style.backgroundColor = markerColor;
  el.style.width = '20px';
  el.style.height = '20px';
  el.style.borderRadius = '50%';
  el.style.border = '2px solid white';
  el.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
  el.style.cursor = 'pointer';
  
  // Create popup with offset and prevent close on click
  const popup = new mapboxgl.Popup({
    offset: 25,
    maxWidth: '400px',
    className: 'storage-facility-popup',
    closeButton: true,
    closeOnClick: false, // Prevent closing when clicking the map
    focusAfterOpen: false // Prevent grabbing focus which can cause issues
  }).setHTML(createPopupHTML(facility));

  // Create marker with custom element for better visibility
  const marker = new mapboxgl.Marker({
    element: el,
    anchor: 'center',
    clickTolerance: 10 // Increase click tolerance
  })
    .setLngLat(coordinates)
    .setPopup(popup)
    .addTo(map);

  // Add click event to the marker element to prevent default map click behavior
  marker.getElement().addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent event bubbling
    e.preventDefault();
    
    // Trigger the facility selection
    onMarkerClick(facility.id);
    
    // Make sure popup shows
    if (!marker.getPopup().isOpen()) {
      marker.togglePopup();
    }
    
    // Log for debugging
    console.log(`Clicked marker for facility: ${facility.name} (ID: ${facility.id})`);
  });
  
  // Add popup event listeners to debug any issues
  popup.on('open', () => {
    console.log(`Popup opened for ${facility.name}`);
  });
  
  popup.on('close', () => {
    console.log(`Popup closed for ${facility.name}`);
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
  
  return !isNaN(lat) && !isNaN(lng) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180;
};
