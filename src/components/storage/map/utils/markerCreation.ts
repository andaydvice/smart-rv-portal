
import mapboxgl from 'mapbox-gl';
import { StorageFacility } from '../../types';
import { createPopupHTML } from '../../popupUtils';

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
  el.style.width = '24px'; // Increased from 20px
  el.style.height = '24px'; // Increased from 20px
  el.style.borderRadius = '50%';
  el.style.border = '3px solid white'; // Increased width from 2px
  el.style.boxShadow = '0 0 10px rgba(0,0,0,0.8)'; // Increased shadow
  el.style.cursor = 'pointer';
  el.setAttribute('data-facility-id', facility.id);
  
  // Create a persistent popup that won't close on map clicks
  const popup = new mapboxgl.Popup({
    offset: 25,
    maxWidth: '400px',
    className: 'storage-facility-popup',
    closeButton: true,
    closeOnClick: false, // Critical: prevent popup from closing when clicking map
    focusAfterOpen: false,
    anchor: 'bottom'
  });
  
  // Set the popup content
  popup.setHTML(createPopupHTML(facility));
  
  // Set the popup DOM element to stay on top
  popup.getElement()?.style.setProperty('z-index', '10000', 'important');
  
  // Create marker with custom element
  const marker = new mapboxgl.Marker({
    element: el,
    anchor: 'center',
    clickTolerance: 15 // Increased from 10 for easier clicking
  })
    .setLngLat(coordinates)
    .setPopup(popup)
    .addTo(map);

  // Add click event with immediate propagation stopping
  el.addEventListener('click', (e) => {
    e.stopImmediatePropagation(); // Most aggressive stop
    e.stopPropagation();
    e.preventDefault();
    
    // Record marker clicked for debugging
    console.log(`Marker clicked for: ${facility.name} (ID: ${facility.id})`);
    
    // Trigger the facility selection
    onMarkerClick(facility.id);
    
    // Ensure popup is open
    if (!marker.getPopup().isOpen()) {
      marker.togglePopup();
    }
  });
  
  // Add event listeners to popup element to prevent click bubbling
  const popupEl = marker.getPopup().getElement();
  if (popupEl) {
    // Make sure all clicks inside popup are captured and not bubbled
    popupEl.addEventListener('click', (e) => {
      // Only stop propagation if it's not the close button
      if (!(e.target as HTMLElement)?.classList.contains('mapboxgl-popup-close-button')) {
        e.stopPropagation();
      }
      console.log('Popup clicked, stopped propagation');
    }, true);
    
    // Set needed styles directly
    popupEl.style.pointerEvents = 'auto';
    popupEl.style.zIndex = '10000';
  }
  
  // Debug popup events
  popup.on('open', () => {
    console.log(`Popup opened for ${facility.name}`);
    
    // Add click handlers to map container to prevent closing popup
    const mapContainer = map.getContainer();
    const handleMapClick = (e: MouseEvent) => {
      // Check if click is outside popup
      if (!(e.target as HTMLElement)?.closest('.mapboxgl-popup')) {
        console.log('Map clicked, but not closing popup');
        e.stopPropagation();
      }
    };
    
    // Add and store listener
    mapContainer.addEventListener('click', handleMapClick, true);
    
    // Remove listener when popup closes
    popup.once('close', () => {
      mapContainer.removeEventListener('click', handleMapClick, true);
      console.log(`Popup closed for ${facility.name}`);
    });
  });
  
  return marker;
};
