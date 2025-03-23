
import mapboxgl from 'mapbox-gl';
import { StorageFacility } from '../../types';

// Helper function to normalize state names consistently
const normalizeStateName = (stateAbbr: string): string => {
  return stateAbbr === 'AZ' ? 'Arizona' : 
         stateAbbr === 'CA' ? 'California' : 
         stateAbbr === 'CO' ? 'Colorado' :
         stateAbbr === 'TX' ? 'Texas' :
         stateAbbr === 'FL' ? 'Florida' :
         stateAbbr === 'NV' ? 'Nevada' :
         stateAbbr === 'GA' ? 'Georgia' :
         stateAbbr === 'IA' ? 'Iowa' :
         stateAbbr === 'MN' ? 'Minnesota' :
         stateAbbr === 'WI' ? 'Wisconsin' :
         stateAbbr === 'OR' ? 'Oregon' :
         stateAbbr === 'PA' ? 'Pennsylvania' :
         stateAbbr === 'NY' ? 'New York' :
         stateAbbr === 'OH' ? 'Ohio' :
         stateAbbr === 'IN' ? 'Indiana' :
         stateAbbr;
};

/**
 * Creates a facility marker with proper visibility and positioning
 */
export const createFacilityMarker = (
  facility: StorageFacility,
  map: mapboxgl.Map,
  isHighlighted: boolean,
  onMarkerClick: (facilityId: string) => void
): mapboxgl.Marker | null => {
  // Validate map and coordinates first
  if (!map || !facility.latitude || !facility.longitude) {
    console.warn(`Cannot create marker for facility ${facility.id} - missing map or coordinates`);
    return null;
  }
  
  try {
    // Check if map is loaded
    if (!map.loaded()) {
      console.warn(`Map not fully loaded for facility ${facility.id}`);
      return null;
    }
    
    // Validate coordinates
    const lat = Number(facility.latitude);
    const lng = Number(facility.longitude);
    
    if (isNaN(lat) || isNaN(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180) {
      console.warn(`Invalid coordinates for facility ${facility.id}: ${lat}, ${lng}`);
      return null;
    }
    
    // Debug log
    console.log(`Creating marker for facility ${facility.id} at ${lat}, ${lng}`);
    
    // Check if zoom level is close enough to show green markers
    const isZoomedIn = map.getZoom() > 10;
    
    // Choose color based on highlighted state and zoom level
    const markerColor = isHighlighted ? '#10B981' : (isZoomedIn ? '#10B981' : '#F97316');
    
    // Create marker element
    const el = document.createElement('div');
    el.className = 'custom-marker';
    el.id = `marker-${facility.id}`;
    
    // Set data attributes for debugging and state filtering
    el.setAttribute('data-facility-id', facility.id);
    el.setAttribute('data-state', facility.state);
    el.setAttribute('data-normalized-state', normalizeStateName(facility.state));
    el.setAttribute('data-highlighted', isHighlighted ? 'true' : 'false');
    el.setAttribute('data-zoomed', isZoomedIn ? 'true' : 'false');
    
    // Set proper styling
    el.style.cssText = `
      background-color: ${markerColor} !important;
      width: ${isHighlighted ? '28px' : '24px'};
      height: ${isHighlighted ? '28px' : '24px'};
      border-radius: 50%;
      border: 2px solid white;
      cursor: pointer;
      box-shadow: ${isHighlighted ? '0 0 20px rgba(16, 185, 129, 0.8)' : '0 0 10px rgba(0,0,0,0.3)'};
      z-index: ${isHighlighted ? '999' : '99'};
      transform: translate(-50%, -50%) ${isHighlighted ? 'scale(1.2)' : ''};
      visibility: visible !important;
      display: block !important;
      opacity: 1 !important;
      position: absolute !important;
    `;
    
    // Create properly positioned popup
    const popup = new mapboxgl.Popup({
      closeButton: true,
      closeOnClick: false,
      maxWidth: '300px',
      className: 'facility-popup',
      offset: 15,
      focusAfterOpen: false
    });
    
    // Set popup content without "View Details" button
    popup.setHTML(`
      <div class="facility-popup-content" data-facility-id="${facility.id}">
        <h3 class="text-lg font-semibold mb-1">${facility.name}</h3>
        <p class="text-sm mb-1">${facility.city}, ${normalizeStateName(facility.state)}</p>
        <p class="text-sm mb-2">${facility.address}</p>
        ${facility.price_range ? 
          `<p class="text-sm text-gray-300">Price: $${facility.price_range.min} - $${facility.price_range.max}</p>` : ''}
      </div>
    `);
    
    // Create marker
    const marker = new mapboxgl.Marker({
      element: el,
      anchor: 'center'
    })
    .setLngLat([lng, lat])
    .setPopup(popup);
    
    // Add to map
    marker.addTo(map);
    
    // Force marker to be visible
    setTimeout(() => {
      if (el) {
        el.style.visibility = 'visible';
        el.style.display = 'block';
        el.style.opacity = '1';
      }
    }, 100);
    
    // Add click handler
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      // Call the onClick callback
      onMarkerClick(facility.id);
    });
    
    // Add zoom change handler to update marker colors
    map.on('zoom', () => {
      const zoomedIn = map.getZoom() > 10;
      
      // Only update if zoom state changed
      if (zoomedIn && el.getAttribute('data-zoomed') !== 'true') {
        el.style.backgroundColor = isHighlighted ? '#10B981' : '#10B981';
        el.setAttribute('data-zoomed', 'true');
      } else if (!zoomedIn && el.getAttribute('data-zoomed') === 'true') {
        el.style.backgroundColor = isHighlighted ? '#10B981' : '#F97316';
        el.setAttribute('data-zoomed', 'false');
      }
    });
    
    return marker;
  } catch (error) {
    console.error(`Error creating marker for facility ${facility.id}:`, error);
    return null;
  }
};

/**
 * Efficiently creates markers for a set of facilities
 */
export const createMarkersForState = (
  facilities: StorageFacility[],
  map: mapboxgl.Map,
  highlightedFacility: string | null,
  onMarkerClick: (facilityId: string) => void,
  state: string | null = null
): mapboxgl.Marker[] => {
  // Validate inputs
  if (!map || !facilities || facilities.length === 0) {
    console.warn('Invalid inputs for createMarkersForState');
    return [];
  }
  
  try {
    // Normalize the state for comparison if provided
    const normalizedState = state ? normalizeStateName(state) : null;
    
    // Log marker creation event
    console.log(`Creating markers for state: ${normalizedState || 'all states'} (${facilities.length} facilities)`);
    
    // Clear existing markers for this state first
    document.querySelectorAll('.mapboxgl-marker, .custom-marker').forEach(marker => {
      const markerState = marker.getAttribute('data-normalized-state');
      const shouldRemove = !state || !markerState || normalizedState === markerState;
      
      if (shouldRemove && marker.parentNode) {
        marker.parentNode.removeChild(marker);
      }
    });
    
    // Filter facilities by normalized state if specified
    const stateFacilities = normalizedState 
      ? facilities.filter(f => {
          const facilityState = normalizeStateName(f.state);
          return facilityState === normalizedState;
        })
      : facilities;
    
    console.log(`Creating ${stateFacilities.length} markers for ${normalizedState || 'all states'}`);
    
    // Create markers
    const markers: mapboxgl.Marker[] = [];
    stateFacilities.forEach(facility => {
      const marker = createFacilityMarker(
        facility,
        map,
        facility.id === highlightedFacility,
        onMarkerClick
      );
      
      if (marker) {
        markers.push(marker);
      }
    });
    
    // Force all markers to be visible
    setTimeout(() => {
      document.querySelectorAll('.mapboxgl-marker, .custom-marker').forEach(marker => {
        if (marker instanceof HTMLElement) {
          marker.style.visibility = 'visible';
          marker.style.display = 'block';
          marker.style.opacity = '1';
        }
      });
    }, 200);
    
    return markers;
  } catch (error) {
    console.error('Error creating markers:', error);
    return [];
  }
};

/**
 * Removes all markers from the map
 */
export const clearAllMarkers = () => {
  document.querySelectorAll('.mapboxgl-marker, .custom-marker').forEach(marker => {
    if (marker.parentNode) {
      marker.parentNode.removeChild(marker);
    }
  });
};
